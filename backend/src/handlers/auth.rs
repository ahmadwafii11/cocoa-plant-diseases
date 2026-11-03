use axum::{
    extract::State,
    http::StatusCode,
    Json,
};
use sqlx::PgPool;
use argon2::{
    Argon2,
    PasswordHash,
    PasswordHasher,
    PasswordVerifier,
    password_hash::SaltString,
};
use rand_core::OsRng;
use validator::Validate;

use crate::middleware::auth::create_jwt;
use crate::models::auth::{
    RegisterRequest,
    RegisterResponse,
    LoginRequest,
    LoginResponse
};


fn validate_register_request(payload: &RegisterRequest) -> Result<(), String> {
    if payload.username.trim().is_empty() {
        return Err("Username wajib diisi.".to_string());
    }

    if payload.full_name.trim().is_empty() {
        return Err("Nama lengkap wajib diisi.".to_string());
    }

    if payload.email.trim().is_empty() {
        return Err("Email wajib diisi.".to_string());
    }

    if payload.password.is_empty() {
        return Err("Password wajib diisi.".to_string());
    }

    payload.validate().map_err(|errors| {
        if errors.field_errors().contains_key("username") {
            return "Username harus 1 - 50 karakter.".to_string();
        }

        if errors.field_errors().contains_key("full_name") {
            return "Nama lengkap harus 1 - 100 karakter.".to_string();
        }

        if errors.field_errors().contains_key("email") {
            return "Format email tidak valid atau email terlalu panjang.".to_string();
        }

        if errors.field_errors().contains_key("password") {
            return "Password harus 8 - 128 karakter.".to_string();
        }

        "Data registrasi tidak valid.".to_string()
    })?;
    
    Ok(())
}

pub async fn register(
    State(pool): State<PgPool>,
    Json(payload): Json<RegisterRequest>,
) -> Result<
    (StatusCode, Json<RegisterResponse>),
    (StatusCode, Json<RegisterResponse>),
> {
    validate_register_request(&payload)
        .map_err(|message| {
            (
                StatusCode::BAD_REQUEST,
                Json(RegisterResponse { message }),
            )
        })?;

    // Membuat salt secara random
    let salt = SaltString::generate(&mut OsRng);

    // Hash password
    let password_hash = Argon2::default()
        .hash_password(
            payload.password.as_bytes(),
            &salt,
        )
        .map_err(|err| {
            println!("Password hashing error: {:?}", err);

            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(RegisterResponse {
                    message: "Gagal melakukan hashing password".to_string(),
                }),
            )
        })?
        .to_string();

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
        if let sqlx::Error::Database(db_err) = &err {
            if let Some(constraint) = db_err.constraint() {
                match constraint {
                    "users_email_key" => {
                        return ( 
                            StatusCode::CONFLICT,
                            Json(RegisterResponse {
                                message: "Email telah digunakan.".to_string(),
                            }),
                        );
                    }

                    "users_username_key" => {
                        return (
                            StatusCode::CONFLICT,
                            Json(RegisterResponse {
                                message: "Username telah digunakan.".to_string(),
                            }),
                        );
                    }

                    _=> {}
                }
            }
        }

        eprintln!("Database error saat register: {:?}", err);

        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(RegisterResponse {
                message: "Terjadi kesalahan pada server.".to_string(),
            }),
        )
    })?;

    Ok((
        StatusCode::CREATED,
        Json(RegisterResponse {
            message: "Akun berhasil dibuat".to_string(),
        }),
    ))
}

pub async fn login(
    State(pool): State<PgPool>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, (StatusCode, Json<serde_json::Value>)> {

    let user = sqlx::query!(
        r#"
        SELECT
            id,
            username,
            full_name,
            email,
            password
        FROM users
        WHERE email = $1
        "#,
        payload.email
    )
    .fetch_optional(&pool)
    .await
    .map_err(|_| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(serde_json::json!({
                "message": "Terjadi kesalahan pada server"
            })),
        )
    })?;

    let user = match user {
        Some(user) => user,
        None => {
            return Err((
                StatusCode::UNAUTHORIZED,
                Json(serde_json::json!({
                    "message": "Email atau password salah"
                })),
            ));
        }
    };

    let parsed_hash = PasswordHash::new(&user.password)
        .map_err(|_| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(serde_json::json!({
                    "message": "Password hash tidak valid"
                })),
            )
        })?;

    let password_valid = Argon2::default()
        .verify_password(
            payload.password.as_bytes(),
            &parsed_hash,
        )
        .is_ok();

    if !password_valid {
        return Err((
            StatusCode::UNAUTHORIZED,
            Json(serde_json::json!({
                "message": "Email atau password salah"
            })),
        ));
    }

    let token = create_jwt(user.id)
        .map_err(|err| {
            eprintln!("JWT error: {}", err);

            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(serde_json::json!({
                    "message": "Gagal membuat token autentikasi"
                })),
            )
        })?;

    Ok(Json(LoginResponse {
        message: "Login berhasil".to_string(),
        token,
        user_id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
    }))
}