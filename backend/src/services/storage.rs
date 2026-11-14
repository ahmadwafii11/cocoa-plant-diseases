use std::path::{
    Path,
    PathBuf,
};
use axum::extract::Multipart;
use tokio::fs;
use uuid::Uuid;

use crate::core::error::{
    AppError,
    AppResult,
};

#[derive(Debug, Clone, Copy)]
pub enum ImageKind {Jpeg, Png, Webp,}

impl ImageKind {
    pub fn extension(self) -> &'static str {
        match self {
            ImageKind::Jpeg => "jpg",
            ImageKind::Png => "png",
            ImageKind::Webp => "webp",
        }
    }

    pub fn content_type(self) -> &'static str {
        match self {
            ImageKind::Jpeg => "image/jpeg",
            ImageKind::Png => "image/png",
            ImageKind::Webp => "image/webp",
        }
    }

    // Mengenali tipe gambar dari BYTE AWAL file (magic bytes).
    // Ekstensi nama file dan header Content-Type dikirim klien dan mudah dipalsukan, jadi tidak dapat dipercaya
    pub fn detect(bytes: &[u8]) -> Option<Self> {
        if bytes.starts_with(&[0xFF, 0xD8, 0xFF]) {
            Some(ImageKind::Jpeg)
        } else if bytes.starts_with(&[0x89, b'P', b'N', b'G', 0x0D, 0x0A, 0x1A, 0x0A]) {
            Some(ImageKind::Png)
        } else if bytes.len() >= 12 && &bytes[0..4] == b"RIFF" && &bytes[8..12] == b"WEBP" {
            Some(ImageKind::Webp)
        } else {
            None
        }
    }
}

// Memastikan isi file benar-benar gambar JPEG/PNG/WebP.
pub fn validate_image(bytes: &[u8]) -> AppResult<ImageKind> {
    if bytes.is_empty() {
        return Err(AppError::BadRequest(
            "File gambar tidak boleh kosong.".to_string(),
        ));
    }

    ImageKind::detect(bytes).ok_or_else(|| {
        AppError::UnsupportedMediaType("Format gambar harus JPG, PNG, atau WebP.".to_string())
    })
}

// Gambar hasil upload yang sudah lolos pemeriksaan ukuran dan isi.
pub struct  UploadedImage {
    pub bytes: Vec<u8>,
    pub kind: ImageKind,

    // Nama file asli dari klien yang sudah dibersihkan (aman untuk disimpan / ditampilkan).
    pub original_filename: String,
}

// Membersihkan nama file dari klien (membuang folder, karakter aneh serta membatasi panjangnya).
// Hasil tidak pernah kosong.
pub fn sanitize_filename(name: &str) -> String {
    let base = name.rsplit(['/', '\\'])
        .next()
        .unwrap_or("");

    let cleaned: String = base
        .chars()
        .map(|c| {
            if c.is_ascii_alphanumeric() || matches!(c, '.' | '-' | '_') {
                c
            } else {
                '_'
            }
        })
        .collect();

    let cleaned: String = cleaned
        .trim_matches('.')
        .chars()
        .take(100)
        .collect();

    if cleaned.is_empty() {
        "image".to_string()
    } else {
        cleaned
    }
}

// Membaca satu file gambar dari field multipart bernama `field_name`.
// Dibaca per potongan: file melebihni `max_size` ditolak segera (413) tanpa dimuat penuh ke memori.
// Field lain akan diabaikan.
pub async  fn read_image_upload(
    multipart: &mut Multipart,
    field_name: &str,
    max_size: usize,
) -> AppResult<UploadedImage> {
    let mut found: Option<UploadedImage> = None;

    while let Some(mut field) = multipart.next_field()
        .await? {
            if field.name() != Some(field_name) {
                continue;
            }

            let original_filename = sanitize_filename(field.file_name().unwrap_or(""));
            let mut bytes: Vec<u8> = Vec::new();

            while let Some(chunk) = field.chunk().await? {
                if bytes.len() + chunk.len() > max_size {
                    return Err(AppError::PayloadTooLarge(format!(
                        "Ukuran gambar maksimal {} MB.",
                        max_size / (1024 * 1024)
                    )));
                }

                bytes.extend_from_slice(&chunk);
            }

            // Tipe diperiksa dari isi file, bukan dari nama / Content-Type kiriman dari klien
            let kind = validate_image(&bytes)?;

            found = Some(UploadedImage { bytes , kind, original_filename });
        }

        found.ok_or_else(|| AppError::BadRequest("File image wajib dikirim.".to_string()))
}

pub struct StoredImage {
    /// Path publik yang disimpan di database, mis. "/uploads/profile/abc.jpg".
    pub public_path: String,
    /// Lokasi file di disk.
    pub file_path: PathBuf,
}

// Menyimpan gambar dengan nama acak (UUID).
// `dir` = folder di disk, `public_prefix` = awalan URL publik.
pub async fn save_image(
    dir: &str,
    public_prefix: &str,
    bytes: &[u8],
    kind: ImageKind,
) -> AppResult<StoredImage> {
    fs::create_dir_all(dir)
        .await
        .map_err(|e| AppError::Internal(format!("Gagal membuat folder {dir}: {e}")))?;

    let filename = format!("{}.{}", Uuid::new_v4(), kind.extension());
    let file_path = Path::new(dir).join(&filename);

    fs::write(&file_path, bytes)
        .await
        .map_err(|e| AppError::Internal(format!("Gagal menyimpan file {filename}: {e}")))?;

    Ok(StoredImage {
        public_path: format!("{public_prefix}/{filename}"),
        file_path,
    })
}

/// Menghapus file berdasarkan lokasi di disk. Galat diabaikan (best effort).
pub async fn remove_file(path: &Path) {
    let _ = fs::remove_file(path).await;
}

/// Menghapus file berdasarkan path publik dari database.
/// Path yang tidak berawalan `public_prefix` atau mengandung "/" atau ".."
/// diabaikan, sehingga tidak mungkin menghapus file di luar folder `dir`.
pub async fn remove_public_image(dir: &str, public_prefix: &str, public_path: &str) {
    let prefix = format!("{public_prefix}/");

    let Some(filename) = public_path.strip_prefix(prefix.as_str()) else {
        return;
    };

    if filename.is_empty()
        || filename.contains('/')
        || filename.contains('\\')
        || filename.contains("..")
    {
        return;
    }

    let _ = fs::remove_file(Path::new(dir).join(filename)).await;
}