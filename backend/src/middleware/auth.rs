use axum::{
    extract::Request,
    http::StatusCode,
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
) -> Result<Response, StatusCode> {
    let auth_header = request 
        .headers()
        .get("Authorization")
        .and_then(|value| value.to_str().ok())
        .ok_or(StatusCode::UNAUTHORIZED)?;
    
    let token = auth_header
        .strip_prefix("Bearer ")
        .ok_or(StatusCode::UNAUTHORIZED)?;
    
    let claims = verify_jwt(token)
        .map_err(|_| StatusCode::UNAUTHORIZED)?;
    
    request.extensions_mut().insert(claims);

    Ok(next.run(request).await)
}