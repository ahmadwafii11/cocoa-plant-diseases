use axum::{
    extract::{Multipart, State},
    Json,
};
use sqlx::PgPool;
use uuid::Uuid;

use crate::core::error::{
    AppError,
    AppResult,
};
use crate::models::detection::DetectionResponse;
use crate::middleware::auth::AuthUser;
use crate::services::detection::process_detection;
use crate::services::ml_service::public_url;
use crate::services::storage::{
    self,
    ImageKind,
};

const MAX_IMAGE_SIZE: usize = 10 * 1024 * 1024;

pub async fn detect(
    State(pool): State<PgPool>,
    AuthUser(user_id): AuthUser,
    mut multipart: Multipart,
) -> AppResult<Json<DetectionResponse>> {
    
    // Identitas user selalu dari JWT;
    // field lain seoerti user_id dll. akan diabaikan.
    let upload = storage::read_image_upload(&mut multipart, "image", MAX_IMAGE_SIZE).await?;

    // Model dilatih dengan menggunakan JPEG;
    // Tipe diperiksa dari isi file, bukan nama/Content-Type
    if !matches!(upload.kind, ImageKind::Jpeg) {
        return Err(AppError::UnsupportedMediaType(
            "Format gambar harus JPG atau JPEG.".to_string()
        ));
    }

    // Nama yang dikirim ke ML Service secara acak (UUID).
    // Nama asli hanya akan disimpan sebagai informasi
    let unique_filename = format!("{}.{}", Uuid::new_v4(), upload.kind.extension());
    let original_filename = upload.original_filename;

    let (detection_id, result) = process_detection(
        &pool, 
        user_id, 
        upload.bytes, 
        original_filename.clone(), 
        unique_filename, 
        upload.kind.content_type().to_string(),
    )
    .await?;

    let base = public_url();

    Ok(Json(DetectionResponse { 
        id: detection_id, 
        class_name: result.class_name, 
        confidence: result.confidence, 
        probabilities: result.probabilities, 
        image_url: format!("{base}{}", result.image_path), 
        gradcam_url: format!("{base}{}", result.gradcam_path), 
        original_filename, 
        model_version: result.model_version, 
    }))
}