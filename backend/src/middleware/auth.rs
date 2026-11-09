use axum::{
    extract::{FromRequestParts, Request},
    http::request::Parts,
    middleware::Next,
    response::Response,
};
use chrono::Utc;
use jsonwebtoken::{
    decode,
    encode,
    Algorithm,
    DecodingKey,
    EncodingKey,
    Header,
    Validation,
};
use std::env;

use crate::core::error::AppError;
use crate::models::auth::Claims;

pub fn create_jwt(user_id:i64) -> Result<String, String> {
    let secret = env::var("JWT_SECRET")
        .map_err(|_| "JWT_SECRET tidak ditemukan di environment.".to_string())?;
    
    let expiration = env::var("JWT_EXPIRATION")
        .map_err(|_| "JWT_EXPIRATION tidak ditemukan di environment.".to_string())?
        .parse::<usize>()
        .map_err(|_| "JWT_EXPIRATION harus berupa angka.".to_string())?;

    let now = Utc::now().timestamp() as usize;

    let claims = Claims {
        sub: user_id.to_string(),
        iat: now,
        exp: now + expiration,
    };

    let header = Header::new(Algorithm::HS256);

    encode(
        &header,
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
    .map_err(|err| format!("Gagal membuat JWT: {}", err))
}

pub fn verify_jwt(token: &str) -> Result<Claims, String> {
    let secret = env::var("JWT_SECRET")
        .map_err(|_| "JWT_SECRET tidak ditemukan di environment.".to_string())?;
    
    let validation = Validation::new(Algorithm::HS256);

    let token_data = decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &validation,
    )
    .map_err(|err| format!("Token JWT tidak valid: {}", err))?;

    Ok(token_data.claims)
}

pub fn get_user_id_from_claims(claims: &Claims) -> Result<i64, String> {
    claims
        .sub
        .parse::<i64>()
        .map_err(|_| "User ID pada JWT tidak valid.".to_string())
}

pub async fn auth_middleware(
    mut request: Request,
    next: Next,
) -> Result<Response, AppError> {
    let auth_header = request 
        .headers()
        .get("Authorization")
        .and_then(|value| value.to_str().ok())
        .ok_or(AppError::Unauthorized("Token autentikasi tidak ditemukan.".to_string()))?;
    
    let token = auth_header
        .strip_prefix("Bearer ")
        .ok_or(AppError::Unauthorized("Format token autentikasi tidak valid.".to_string()))?;
    
    let claims = verify_jwt(token)
        .map_err(|_| AppError::Unauthorized("Sesi tidak valid atau sudah berakhir. Silahkan login kembali.".to_string()))?;
    
    request.extensions_mut().insert(claims);

    Ok(next.run(request).await)
}

// Extractor: ID user yang sedang login, diambil melalui JWT yang sudah diverifikasi oleh `auth_middleware`.
// Pemakaian di handler: pub async fn get_user_me(AuthUser(user_id): AuthUser, ...) { ... }
// Menggantikan blok `get_user_id_from_claims(&claims).map_err(...)` yang sebelumnya diulang di setiap handler.
#[derive(Debug, Clone, Copy)]
pub struct AuthUser(pub i64);

impl<S> FromRequestParts<S> for AuthUser
where 
    S: Send + Sync,
{
    type Rejection = AppError;

    async fn from_request_parts(
        parts: &mut Parts,
        _state: &S,
    ) -> Result<Self, Self::Rejection> {
        let claims = parts 
            .extensions
            .get::<Claims>()
            .ok_or_else(|| {
                AppError::Unauthorized("Autentikasi diperlukan.".to_string())
            })?;
        
        let user_id = get_user_id_from_claims(claims).map_err(|_| {
            AppError::Unauthorized("Token autentikasi tidak valid.".to_string())
        })?;

        Ok(AuthUser(user_id))
    }   
}