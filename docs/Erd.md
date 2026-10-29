# Entity Relationship Diagram

Diagram relasi tabel berdasarkan file migrasi `001_create_users.sql`, `002_create_disease.sql`, dan `003_create_detection_history.sql`.

```mermaid
erDiagram
    users ||--o{ detection_history : "melakukan"
    diseases ||--o{ detection_history : "didiagnosis sebagai"

    users {
        BIGSERIAL id PK
        VARCHAR_50 username UK "NOT NULL"
        VARCHAR_100 full_name "NOT NULL"
        VARCHAR_150 email UK "NOT NULL"
        VARCHAR_255 password "NOT NULL"
        TEXT profile_image
        TIMESTAMPTZ created_at "NOT NULL, DEFAULT CURRENT_TIMESTAMP"
        TIMESTAMPTZ updated_at "NOT NULL, DEFAULT CURRENT_TIMESTAMP"
    }

    diseases {
        BIGSERIAL id PK
        VARCHAR_100 diseases_name UK "NOT NULL"
        TEXT description "NOT NULL"
        TEXT symptoms "NOT NULL"
        TEXT treatment
        TEXT prevention
        TEXT image
    }

    detection_history {
        BIGSERIAL id PK
        BIGINT user_id FK "NOT NULL"
        BIGINT diseases_id FK "NOT NULL"
        TEXT image_path "NOT NULL"
        TEXT gradcam_path
        DOUBLE_PRECISION confidence "NOT NULL"
        TIMESTAMPTZ detected_at "NOT NULL, DEFAULT CURRENT_TIMESTAMP"
        TEXT class_name
        JSONB probabilities
        TEXT original_filename
        TEXT model_version
    }
```

## Keterangan Relasi

| Relasi | Kardinalitas | Foreign Key | Aturan Hapus |
|---|---|---|---|
| `users` → `detection_history` | One-to-Many (1 : N) | `detection_history.user_id` → `users.id` | `ON DELETE CASCADE` |
| `diseases` → `detection_history` | One-to-Many (1 : N) | `detection_history.diseases_id` → `diseases.id` | `ON DELETE RESTRICT` |

- Satu **user** dapat memiliki banyak riwayat deteksi. Jika user dihapus, seluruh riwayat deteksinya ikut terhapus (`CASCADE`).
- Satu **penyakit** dapat muncul pada banyak riwayat deteksi. Penyakit tidak dapat dihapus selama masih direferensikan oleh riwayat deteksi (`RESTRICT`).
- `detection_history` adalah tabel penghubung antara `users` dan `diseases`.
