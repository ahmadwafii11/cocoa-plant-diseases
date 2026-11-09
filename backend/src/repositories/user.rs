use sqlx::PgPool;

use crate::models::user::User;

// Kolom yang dikembalikan ke API. Kolom `password` sengaja tidak dikembalikan.
macro_rules! user_columns {
    () => {
        "id, username, full_name, email, profile_image, created_at, updated_at"
    };
}

pub async fn find_by_id(pool: &PgPool, id: i64) -> Result<Option<User>, sqlx::Error> {
    sqlx::query_as::<_, User> (concat!(
        "SELECT ",
        user_columns!(),
        " FROM users WHERE id = $1"
    ))
    .bind(id)
    .fetch_optional(pool)
    .await
}

pub async fn update_profile(
    pool: &PgPool,
    id: i64,
    username: &str,
    full_name: &str,
    email: &str,
) -> Result <Option<User>, sqlx::Error> {
    sqlx::query_as::<_, User>(concat!(
        "UPDATE users ",
        "SET username = $1, full_name = $2, email = $3, updated_at = NOW() ",
        "WHERE id = $4 ",
        "RETURNING ",
        user_columns!()
    ))
    .bind(username)
    .bind(full_name)
    .bind(email)
    .bind(id)
    .fetch_optional(pool)
    .await
}

// Mengambil hash password (hanya untuk verifikasi, bukan dikirim ke client)
pub async fn find_password_hash(
    pool: &PgPool,
    id: i64,
) -> Result<Option<String>, sqlx::Error> {
    sqlx::query_scalar::<_, String>("SELECT password FROM users WHERE id = $1")
    .bind(id)
    .fetch_optional(pool)
    .await
}

// Mengembalikan true apabila terdapat baris yang diperbarui
pub async fn update_password(
    pool: &PgPool,
    id: i64,
    password_hash: &str,
) -> Result<bool, sqlx::Error> {
    let result = sqlx::query(
        "UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2",
    )
    .bind(password_hash)
    .bind(id)
    .execute(pool)
    .await?;

    Ok(result.rows_affected() > 0)
}

// Path foto profile saat ini (None bila user tidak ada ATAU belum memiliki foto)
pub async fn find_profile_image(
    pool: &PgPool,
    id: i64,
) -> Result<Option<String>, sqlx::Error> {
    let row = sqlx::query_scalar::<_, Option<String>>(
        "SELECT profile_image FROM users WHERE id = $1",
    )
    .bind(id)
    .fetch_optional(pool)
    .await?;

    Ok(row.flatten())
}

pub async fn set_profile_image(
    pool: &PgPool,
    id: i64,
    public_path: &str,
) -> Result<Option<User>, sqlx::Error> {
    sqlx::query_as::<_, User>(concat!(
        "UPDATE users ",
        "SET profile_image = $1, updated_at = NOW() ",
        "WHERE id = $2 ",
        "RETURNING ",
        user_columns!()
    ))
    .bind(public_path)
    .bind(id)
    .fetch_optional(pool)
    .await
}