use argon2::{
    password_hash::{
        rand_core::OsRng,
        PasswordHash,
        PasswordHasher,
        PasswordVerifier,
        SaltString,
    },
    Argon2,
};

use crate::core::error::{AppError, AppResult};

/// Membuat hash password dengan salt acak baru.
/// (Salt membuat dua user dengan password sama tetap menghasilkan hash berbeda dan mencegah serangan rainbow table.)
pub async fn hash_password(password: String) -> AppResult<String> {
    tokio::task::spawn_blocking(move || {
        let salt = SaltString::generate(&mut OsRng);

        Argon2::default()
            .hash_password(password.as_bytes(), &salt)
            .map(|hash| hash.to_string())
            .map_err(|e| AppError::Internal(format!("Gagal melakukan hash password: {e}")))
    })
    .await
    .map_err(|e| AppError::Internal(format!("Task hash password gagal: {e}")))?
}

/// true bila `password` cocok dengan `stored_hash`.
pub async fn verify_password(password: String, stored_hash: String) -> AppResult<bool> {
    tokio::task::spawn_blocking(move || {
        let parsed_hash = PasswordHash::new(&stored_hash)
            .map_err(|e| AppError::Internal(format!("Password hash di database tidak valid: {e}")))?;

        Ok::<bool, AppError>(
            Argon2::default()
                .verify_password(password.as_bytes(), &parsed_hash)
                .is_ok(),
        )
    })
    .await
    .map_err(|e| AppError::Internal(format!("Task verifikasi password gagal: {e}")))?
}