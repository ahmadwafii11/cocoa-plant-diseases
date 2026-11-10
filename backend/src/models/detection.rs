use chrono::{DateTime, Utc};
use serde::{
    Serialize,
    Deserialize,
};
use serde_json::Value;
use sqlx::FromRow;

#[derive(Debug, Deserialize, Clone)]
pub struct MLResponse {
    pub class_name: String,
    pub confidence: f64,
    pub probabilities: std::collections::HashMap<String, f64>,
    pub image_path: String,
    pub gradcam_path: String,
    pub model_version: String,
}

#[derive(Debug, Serialize, FromRow)]
pub struct DetectionHistory {
    pub id                  : i64,
    pub user_id             : i64,
    pub diseases_id         : i64,
    pub diseases_name       : String,
    pub image_path          : String,
    pub gradcam_path        : Option<String>,
    pub class_name          : Option<String>,
    pub confidence          : f64,
    pub probabilities       : Option<Value>,
    pub original_filename   : Option<String>,
    pub model_version       : Option<String>,
    pub detected_at         : DateTime<Utc>,
}