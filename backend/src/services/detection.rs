use sqlx::PgPool;

use crate::core::error::{
    AppError,
    AppResult,
};
use crate::models::detection::MLResponse;
use crate::services::ml_service::predict_image;

pub async fn process_detection(
    pool: &PgPool,
    user_id: i64,
    image_data: Vec<u8>,
    original_filename: String,
    unique_filename: String,
    content_type: String,
) -> AppResult<(i64, MLResponse)> {

    // mengirim gambar ke ML Service
    let prediction = predict_image(
        image_data,
        unique_filename,
        content_type
    )
    .await?;

    // mencari diseases_id berdasarkan class_name
    let diseases_id: i64 = sqlx::query_scalar(
        r#"
        SELECT id
        FROM diseases
        WHERE diseases_name = $1
        "#
    )
    .bind(&prediction.class_name)
    .fetch_optional(pool)
    .await?
    .ok_or_else(|| {
        AppError::Internal(format!(
            "Penyakit '{}' tidak ditemukan di dalam database (periksa seed tabel diseases vs CLASS_NAMES di ML Service",
            prediction.class_name
        ))
    })?;

    let probabilities = serde_json::to_value(&prediction.probabilities)
        .map_err(|e| {
            AppError::Internal(format!("Gagal merubah probabilities menjadi JSON: {e}"))
        })?;

    // menyimpan hasil deteksi ke database
    let detection_id: i64 = sqlx::query_scalar(
        r#"
        INSERT INTO detection_history
        (
            user_id,
            diseases_id,
            image_path,
            gradcam_path,
            class_name,
            probabilities,
            confidence,
            original_filename,
            model_version
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
        "#
    )
    .bind(user_id)
    .bind(diseases_id)
    .bind(&prediction.image_path)
    .bind(&prediction.gradcam_path)
    .bind(&prediction.class_name)
    .bind(probabilities)
    .bind(prediction.confidence)
    .bind(&original_filename)
    .bind(&prediction.model_version)
    .fetch_one(pool)
    .await?;

    // Mengembalikan hasil prediksi
    Ok((detection_id, prediction))
}