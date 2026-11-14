use axum::{
    extract::{Path, State},
    Json,
};
use sqlx::PgPool;

use crate::core::error::{
    AppError,
    AppResult,
};
use crate::middleware::auth::AuthUser;
use crate::models::detection::DetectionHistory;
use crate::repositories::detection as history_repo;
use crate::services::ml_service::public_url;

// Path gambar di database -> URL lengkap menuju ML Service
fn with_public_urls(mut history: DetectionHistory, base: &str) -> DetectionHistory {
    history.image_path = format!("{base}{}", history.image_path);
    history.gradcam_path = history.gradcam_path.map(|path| format!("{base}{path}"));

    history
}

// GET /api/detection-history
pub async fn get_detection_history(
    State(pool): State<PgPool>,
    AuthUser(user_id): AuthUser,
) -> AppResult<Json<Vec<DetectionHistory>>> {
    let base = public_url();
    
    let histories = history_repo::list_by_user(
        &pool,
        user_id,
    )
        .await?
        .into_iter()
        .map(|history| with_public_urls(history, &base))
        .collect();

    Ok(Json(histories))
}

// GET /api/detection-history/detail/{id}
pub async fn get_detection_detail(
    State(pool): State<PgPool>,
    AuthUser(user_id): AuthUser,
    Path(id): Path<i64>,
) -> AppResult<Json<DetectionHistory>> {
    let history = history_repo::find_by_id_for_user(
        &pool,
        id,
        user_id,
    )
        .await?
        .ok_or_else(|| AppError::NotFound("Data deteksi tidak ditemukan.".to_string()))?;

    Ok(Json(with_public_urls(history, &public_url())))
}