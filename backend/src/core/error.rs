use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;

// Galat aplikasi. Semua dibalas sebagai JSON: { "message": "..."}
#[derive(Debug)]
pub enum AppError {
    BadRequest(String),
    Unauthorized(String),
    NotFound(String),
    Conflict(String),
    PayloadTooLarge(String),
    UnsupportedMediaType(String),
    ServiceUnavailable(String),

    // Detail Hanya tercatat di log server. Klien menerima pesan umum supaya isi galat database/file tidak bocor ke luar.
    Internal(String),
}

pub type AppResult<T> = Result<T, AppError>;

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, message) = match self {
            AppError::BadRequest(message) => (StatusCode::BAD_REQUEST, message),
            AppError::Unauthorized(message) => (StatusCode::UNAUTHORIZED, message),
            AppError::NotFound(message) => (StatusCode::NOT_FOUND, message),
            AppError::Conflict(message) => (StatusCode::CONFLICT, message),
            AppError::PayloadTooLarge(message) => (StatusCode::PAYLOAD_TOO_LARGE, message),
            AppError::UnsupportedMediaType(message) => (StatusCode::UNSUPPORTED_MEDIA_TYPE, message),
            AppError::ServiceUnavailable(message) => (StatusCode::SERVICE_UNAVAILABLE, message),
            AppError::Internal(detail) => {
                eprintln!("[ERROR] {detail}");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "Terjadil kesalahan pada server. Silahkan coba lagi.".to_string(),
                )
            }
        };

        (status, Json(json!({ "message" : message }))).into_response()
    }
}

// Memungkinkan `?` langsung pada hasil query sqlx. Pelanggaran UNIQUE (username/email telah digunakan) menjadi 409, bukan 500.
impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        if let sqlx::Error::Database(db_err) = &err  {
            if db_err.is_unique_violation() {
                return AppError::Conflict("Username atau email telah digunakan.".to_string());
            }
        }

        AppError::Internal(format!("Kesalahan database: {err}"))
    }
}

// Memungkinkan `?` pada pembacaan multipart. Melebihi batas body -> 413.
impl From<axum::extract::multipart::MultipartError> for AppError {
    fn from(err: axum::extract::multipart::MultipartError) -> Self {
        if err.status() == StatusCode::PAYLOAD_TOO_LARGE {
            AppError::PayloadTooLarge("Ukuran file terlalu besar.".to_string())
        } else {
            AppError::BadRequest(format!("Gagal membaca data upload: {}", err.body_text()))
        }
    }
}

// Memungkinkan `payload.validate()?` : pesan validasi pertama dikirim menuju klien.
impl From<validator::ValidationErrors> for AppError {
    fn from(errors: validator::ValidationErrors) -> Self {
        let message = errors
            .field_errors()
            .values()
            .flat_map(|field_errors| field_errors.iter())
            .find_map(|error| error.message.as_ref().map(|m| m.to_string()))
            .unwrap_or_else(|| "Data yang dikirim tidak valid.".to_string());

        AppError::BadRequest(message)
    }
}