use axum::{
    Json, extract::{Multipart, State, multipart::MultipartError}, http::StatusCode,
};
use sqlx::PgPool;
use validator::Validate;

use crate::core::error::{
    AppError,
    AppResult,
};
use crate::middleware::auth::AuthUser;
use crate::models::user::{
    ChangePasswordRequest,
    ChangePasswordResponse,
    UpdateUserRequest,
    User,
};
use crate::repositories::user as user_repo;
use crate::services::{
    password,
    storage,
};

const MAX_PROFILE_IMAGE_SIZE: usize = 5 * 1024 * 1024;
const PROFILE_IMAGE_DIR: &str = "/uploads/profile";
const PROFILE_IMAGE_URL_PREFIX: &str = "/uploads/profile";

fn  user_not_found() -> AppError {
    AppError::NotFound("User tidak ditemukan.".to_string())
}

// Mengubah galat multipart menjadi AppError (413 apabila melebihi batas body).
fn multipart_error(err:MultipartError) -> AppError {
    if err.status() == StatusCode::PAYLOAD_TOO_LARGE {
        AppError::PayloadTooLarge("Ukuran file terlalu besar.".to_string())
    } else {
        AppError::BadRequest(format!("Gagal membaca data upload: {}", err.body_text()))
    }
}

// GET /api/users/me
pub async fn get_user_me(
    State(pool): State<PgPool>,
    AuthUser(user_id): AuthUser,
) -> AppResult<Json<User>> {
    let user = user_repo::find_by_id(&pool, user_id)
        .await?
        .ok_or_else(user_not_found)?;

    Ok(Json(user))
}

// PUT /api/users/me
pub async fn update_user_me(
    State(pool): State<PgPool>,
    AuthUser(user_id): AuthUser,
    Json(mut payload): Json<UpdateUserRequest>,
) -> AppResult<Json<User>> {
    // Rapikan spasi di awal/akhir sebelum divalidasi dan disimpan
    payload.username = payload.username.trim().to_string();
    payload.full_name = payload.full_name.trim().to_string();
    payload.email = payload.email.trim().to_string();

    payload.validate()?;

    // Username/email yang sudah dipakai user lain -> 409 (lihat From<sqlx::Error>)
    let user = user_repo::update_profile(
        &pool,
        user_id,
        &payload.username,
        &payload.full_name,
        &payload.email,
    )
    .await?
    .ok_or_else(user_not_found)?;

    Ok(Json(user))
}

// PUT /api/users/me/password
pub async fn change_password(
    State(pool): State<PgPool>,
    AuthUser(user_id): AuthUser,
    Json(payload): Json<ChangePasswordRequest>,
) -> AppResult<Json<ChangePasswordResponse>> {
    payload.validate()?;

    if payload.current_password == payload.new_password {
        return Err(AppError::BadRequest(
            "Password baru harus berbeda dari password lama.".to_string(),
        ));
    }

    let stored_hash = user_repo::find_password_hash(&pool, user_id)
        .await?
        .ok_or_else(user_not_found)?;

    let is_valid = password::verify_password(payload.current_password, stored_hash).await?;

    if !is_valid {
        // PENTING: jangan 401. Frontend menganggap 401 sebagai "token tidak sah"
        // dan otomatis logout. Password lama salah bukan masalah token.
        return Err(AppError::BadRequest(
            "Password lama tidak sesuai.".to_string(),
        ));
    }

    let new_hash = password::hash_password(payload.new_password).await?;

    if !user_repo::update_password(&pool, user_id, &new_hash).await? {
        return Err(user_not_found());
    }

    Ok(Json(ChangePasswordResponse {
        message: "Password berhasil diperbarui.".to_string(),
    }))
}

// PUT /api/users/me/profile-image   (multipart/form-data, field "image")
pub async fn upload_profile_image(
    State(pool): State<PgPool>,
    AuthUser(user_id): AuthUser,
    mut multipart: Multipart,
) -> AppResult<Json<User>> {
    let mut upload: Option<(Vec<u8>, storage::ImageKind)> = None;

    while let Some(mut field) = multipart.next_field().await.map_err(multipart_error)? {
        // Field selain "image" diabaikan
        if field.name() != Some("image") {
            continue;
        }

        // Dibaca per potongan agar file yang terlalu besar langsung ditolak,
        // tidak dimuat penuh ke memori dulu.
        let mut data: Vec<u8> = Vec::new();

        while let Some(chunk) = field.chunk().await.map_err(multipart_error)? {
            if data.len() + chunk.len() > MAX_PROFILE_IMAGE_SIZE {
                return Err(AppError::PayloadTooLarge(
                    "Ukuran foto profil maksimal 5 MB.".to_string(),
                ));
            }

            data.extend_from_slice(&chunk);
        }

        // Tipe gambar dicek dari isi file, bukan dari nama/Content-Type
        let kind = storage::validate_image(&data)?;

        upload = Some((data, kind));
    }

    let Some((data, kind)) = upload else {
        return Err(AppError::BadRequest("File image wajib dikirim.".to_string()));
    };

    let old_image = user_repo::find_profile_image(&pool, user_id).await?;

    let stored = storage::save_image(
        PROFILE_IMAGE_DIR,
        PROFILE_IMAGE_URL_PREFIX,
        &data,
        kind,
    )
    .await?;

    let user = match user_repo::set_profile_image(&pool, user_id, &stored.public_path).await {
        Ok(Some(user)) => user,
        Ok(None) => {
            storage::remove_file(&stored.file_path).await;
            return Err(user_not_found());
        }
        Err(err) => {
            // Database gagal: buang file baru agar tidak jadi file yatim
            storage::remove_file(&stored.file_path).await;
            return Err(err.into());
        }
    };

    // Database sudah berhasil: sekarang aman menghapus foto lama
    if let Some(old_path) = old_image {
        storage::remove_public_image(PROFILE_IMAGE_DIR, PROFILE_IMAGE_URL_PREFIX, &old_path).await;
    }

    Ok(Json(user))
}
