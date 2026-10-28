CREATE TABLE detection_history (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,
    diseases_id BIGINT NOT NULL,

    image_path TEXT NOT NULL,
    gradcam_path TEXT,

    confidence DOUBLE PRECISION NOT NULL,

    detected_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_detection_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_detection_disease
        FOREIGN KEY (diseases_id)
        REFERENCES diseases(id)
        ON DELETE RESTRICT
);

ALTER TABLE detection_history
ADD COLUMN class_name TEXT,
ADD COLUMN probabilities JSONB,
ADD COLUMN original_filename TEXT,
ADD COLUMN model_version TEXT;