use std::path::{
    Path,
    PathBuf,
};
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