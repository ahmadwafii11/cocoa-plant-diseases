use serde::{Deserialize, Serialize};
use sqlx::FromRow;

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

#[derive(Debug, Deserialize)]
pub struct UpdateUserRequest {
    pub username           : String,
    pub full_name          : String,
    pub email              : String,
}

#[derive(Debug, Serialize)]
pub struct ChangePasswordResponse {
    pub message            : String,
}

#[derive(Debug, Deserialize)]
pub struct ChangePasswordRequest {
    pub current_password   : String,
    pub new_password       : String,
}