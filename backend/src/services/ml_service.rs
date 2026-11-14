use std::{
    env,
    sync::OnceLock,
    time::Duration,
};
use reqwest::multipart;

use crate::core::error::{
    AppError,
    AppResult,
};
use crate::models::detection::MLResponse;

const DEFAULT_ML_SERVICE_URL: &str = "http://127.0.0.1:8000";
const CONNECT_TIMEOUT: Duration = Duration::from_secs(5);

// Inferensi + Grad_CAM di CPU bisa memakan waktu beberapa detik
const REQUEST_TIMEOUT: Duration = Duration::from_secs(60);

fn base_url() -> String {
    env::var("ML_SERVICE_URL")
        .unwrap_or_else(|_| DEFAULT_ML_SERVICE_URL.to_string())
        .trim_end_matches('/')
        .to_string()
}

// Awalan URL untuk gambar yang dibuka browser (hasil + Grad-CAM)
pub fn public_url() -> String {
    env::var("ML_SERVICE_PUBLIC_URL")
        .map(|url| url.trim_end_matches('/').to_string())
        .unwrap_or_else(|_| base_url())
}

// Satu client dipakan bersama (menggunakan ulang koneksi), dengan timeout.
fn client() -> &'static reqwest::Client {
    static CLIENT: OnceLock<reqwest::Client> = OnceLock::new();

    CLIENT.get_or_init(|| {
        reqwest::Client::builder()
            .connect_timeout(CONNECT_TIMEOUT)  
            .timeout(REQUEST_TIMEOUT)
            .build()
            .expect("Gagal membuat HTTP client untuk ML Service")
    })
}

fn unavailable() -> AppError {
    AppError::ServiceUnavailable(
        "Layanan deteksi sedang tidak tersedia. Silahkan coba lagi nanti.".to_string(),
    )
}

pub async fn predict_image(
    image_data: Vec<u8>,
    filename: String,
    content_type: String,
) -> AppResult<MLResponse> {

    // Membuat multipart file
    let part = multipart::Part::bytes(image_data)
        .file_name(filename)
        .mime_str(&content_type)
        .map_err(|e| AppError::Internal(format!("Gagal membuat multipart image: {e}")))?;

    // Membuat multipart form
    let form = multipart::Form::new()
        .part("image", part);
    
    let mut request = client()
        .post(format!("{}/api/predict", base_url()))
        .multipart(form);

    if let Ok(key) = env::var("ML_INTERNAL_KEY") {
        request = request.header("X-Internal-Key", key);
    }
    
    let response = request
        .send()
        .await
        .map_err(|e| {
            eprintln!("[ERROR] Gagal terhubung ke ML Service: {e}");

            if e.is_connect() || e.is_timeout() {
                unavailable()
            } else {
                AppError::Internal(format!("Gagal memanggil ML Service: {e}"))
            }
        })?;
    
    let status = response.status();

    if !status.is_success() {
        let body = response
            .text()
            .await
            .unwrap_or_else(|_| "Tidak ada response body".to_string());

        return Err(match status.as_u16() {
            // Gambar ditolaj ML Service (bukan gambar valid / terlalu besar)
            400 | 413 | 415 | 422 => AppError::BadRequest(
                "Gambar tidak dapat diproses. Gunakan foto JPG yang valid.".to_string(),
            ),
            502 | 503 | 504 => unavailable(),
            _=> AppError::Internal(format!("ML Service mengembalikan status {status}: {body}")),
        });
    }

    response
        .json::<MLResponse>()
        .await
        .map_err(|e| AppError::Internal(format!("Gagal membaca response ML Service: {e}")))
}