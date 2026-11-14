use sqlx::PgPool;

use crate::models::detection::DetectionHistory;

macro_rules! history_select {
    () => {
        concat!(
            "SELECT dh.id, dh.user_id, dh.diseases_id, d.diseases_name, ",
            "dh.image_path, dh.gradcam_path, dh.class_name, dh.confidence, ",
            "dh.probabilities, dh.original_filename, dh.model_version, dh.detected_at ",
            "FROM detection_history dh ",
            "JOIN diseases d ON dh.diseases_id = d.id "
        )
    };
}

pub async fn list_by_user(
    pool: &PgPool,
    user_id: i64,
) -> Result<Vec<DetectionHistory>, sqlx::Error> {
    sqlx::query_as::<_, DetectionHistory>(concat!(
        history_select!(), 
        "WHERE dh.user_id = $1 ORDER BY dh.detected_at DESC"
    ))
    .bind(user_id)
    .fetch_all(pool)
    .await
}

// Hanya mengembalikan data milik `user_id` (user lain -> None -> 404).
pub async fn find_by_id_for_user(
    pool: &PgPool,
    id: i64,
    user_id: i64,
) -> Result<Option<DetectionHistory>, sqlx::Error> {
    sqlx::query_as::<_, DetectionHistory>(concat!(
        history_select!(),
        "WHERE dh.id = $1 AND dh.user_id = $2"
    ))
    .bind(id)
    .bind(user_id)
    .fetch_optional(pool)
    .await
}