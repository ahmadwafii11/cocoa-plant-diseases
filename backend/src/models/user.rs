use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use validator::Validate;

#[derive(Debug, Serialize, FromRow)]
pub struct User {
    pub id                 : i64,
    pub username           : String,
    pub full_name          : String,
    pub email              : String,
    pub profile_image      : Option<String>,
    pub created_at         : chrono::DateTime<chrono::Utc>,
    pub updated_at         : chrono::DateTime<chrono::Utc>,
}

// Aturan validasi sesuai dengan registrasi (lihat API.md).
#[derive(Debug, Deserialize, Validate)]
pub struct UpdateUserRequest {
    #[validate(length(min = 3, max = 50, message = "Username harus terdiri dari 3 sampai 50 karakter."))]
    pub username           : String,

    #[validate(length(min = 3, max = 100, message = "Nmaa lengkap wajib diisi (maksimal 100 karakter)."))]
    pub full_name          : String,

    #[validate(
        email(message = "Format email tidak valid,"),
        length(max = 150, message = "Email maksimal 150 karakter.")
    )]
    pub email              : String,
}

#[derive(Debug, Serialize)]
pub struct ChangePasswordResponse {
    pub message            : String,
}

#[derive(Debug, Deserialize, Validate)]
pub struct ChangePasswordRequest {
    pub current_password   : String,

    // Batas atas 128 untuk mencegah password raksasa yang akan membebani proses hashing Argon2.
    #[validate(length(min = 6, max = 128, message = "Password baru harus terdiri dari 6 sampai 128 karakter."))]
    pub new_password       : String,
}