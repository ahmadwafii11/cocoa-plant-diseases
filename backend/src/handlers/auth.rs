use axum::{
    extract::State,
    http::StatusCode,
    Json,
};
use sqlx::PgPool;
use validator::Validate;

use crate::core::error::{
    AppError,
    AppResult,
};
use crate::middleware::auth::create_jwt;
use crate::models::auth::{
    RegisterRequest,
    RegisterResponse,
    LoginRequest,
    LoginResponse
};
use crate::services::password;

fn validate_register_request(payload: &RegisterRequest) -> AppResult<()> {
    if payload.username.trim().is_empty() {
        return Err(AppError::BadRequest("Username wajib diisi.".to_string()));
    }

    if payload.full_name.trim().is_empty() {
        return Err(AppError::BadRequest("Nama lengkap wajib diisi.".to_string()));
    }

    if payload.email.trim().is_empty() {
        return Err(AppError::BadRequest("Email wajib diisi.".to_string()));
    }

    if payload.password.is_empty() {
        return Err(AppError::BadRequest("Password wajib diisi.".to_string()));
    }

    payload.validate().map_err(|errors| {
        let fields = errors.field_errors();

        let message = if fields.contains_key("username") {
            "Username harus 1 - 50 karakter."
        } else if fields.contains_key("full_name"){
            "Nama lengkap harus 1 -100 karakter."
        } else if fields.contains_key("email") {
            "Format email tidak valid atau email terlalu panjang."
        } else if fields.contains_key("password") {
            "Password harus 8 - 128 karakter."
        } else {
            "Data registrasi tidak valid."
        }; 

        AppError::BadRequest(message.to_string())
    })
}

// POST /api/auth/register
pub async fn register(
    State(pool): State<PgPool>,
    Json(mut payload): Json<RegisterRequest>,
) -> AppResult<(StatusCode, Json<RegisterResponse>)> {

    // Merapikan spasi di awal / akhir (password sengaja tidak di-trim)
    payload.username = payload.username.trim().to_string();
    payload.full_name = payload.full_name.trim().to_string();
    payload.email = payload.email.trim().to_string();

    validate_register_request(&payload)?;

    let password_hash = password::hash_password(payload.password.clone()).await?;

    // Simpan user ke PostgreSQL
    sqlx::query(
        r#"
        INSERT INTO users (
            username,
            full_name,
            email,
            password
        )
        VALUES ($1, $2, $3, $4)
        "#,
    )
    .bind(&payload.username)
    .bind(&payload.full_name)
    .bind(&payload.email)
    .bind(&password_hash)
    .execute(&pool)
    .await
    .map_err(|err| {
        // Pesan konflik spesifik sesuai constraint
        if let sqlx::Error::Database(db_error) = &err {
            match db_error.constraint() {
                Some("users_email_key") => {
                    return AppError::Conflict("Email telah digunakan.".to_string());
                }
                Some("users_username_key") => {
                    return AppError::Conflict("Username telah digunakan.".to_string());
                }
                _=> {}
            }
        }

        AppError::from(err) 
    })?;

    Ok((
        StatusCode::CREATED,
        Json(RegisterResponse {
            message: "Akun berhasil dibuat".to_string(),
        }),
    ))
}

// POST /api/auth/login
pub async fn login(
    State(pool): State<PgPool>,
    Json(payload): Json<LoginRequest>,
) -> AppResult<Json<LoginResponse>> {
    let invalid = || AppError::Unauthorized("Email atau password salah".to_string());

    let email = payload.email.trim().to_string();

    let user = sqlx::query!(
        r#"
        SELECT id, username, full_name, email, password
        FROM users
        WHERE email = $1
        "#,
        email
    )
    .fetch_optional(&pool)
    .await?
    .ok_or_else(invalid)?;

    let is_valid = password::verify_password(payload.password, user.password).await?;

    if !is_valid {
        return Err(invalid());
    }

    let token = create_jwt(user.id)
        .map_err(|err| AppError::Internal(format!("Gagal membuat JWT: {err}")))?;

    Ok(Json(LoginResponse {
        message: "Login berhasil".to_string(),
        token,
        user_id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
    }))
}