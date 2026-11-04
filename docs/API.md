# Kontrak API CocoaScan

Acuan bersama frontend (React) dan backend (Rust/Axum). Tipe TypeScript-nya ada di `frontend/src/types/`.

- **Base URL (dev):** `http://127.0.0.1:3000/api` (server Rust mendengarkan di port 3000)
- **Format:** JSON, nama field `snake_case`, waktu dalam ISO 8601 (UTC).
- **Autentikasi:** header `Authorization: Bearer <token>` (JWT). Endpoint bertanda 🔒 membutuhkannya.
- **File statis:** gambar diakses lewat `http://127.0.0.1:3000/uploads/...` (di luar `/api`).

## Format galat

Semua galat memakai status HTTP yang sesuai dan body:

```json
{ "message": "Email sudah terdaftar." }
```

| Status | Arti |
|---|---|
| 400 | Data tidak valid (field kosong, format salah, password kurang dari 6 karakter) |
| 401 | Belum login, token tidak sah/kedaluwarsa, atau email/password salah |
| 404 | Data tidak ditemukan (atau bukan milik pengguna) |
| 409 | Konflik, mis. username atau email sudah dipakai |
| 413 | File terlalu besar |
| 415 | Format file tidak didukung |
| 502/503 | Layanan model AI tidak tersedia |
| 500 | Kesalahan server |

Pesan `message` ditulis dalam bahasa Indonesia karena langsung ditampilkan ke pengguna.

---

## Autentikasi

### `POST /auth/register`

Request:
```json
{
  "username": "ahmadwafii11",
  "full_name": "Ahmad Wafi Fathurrahman",
  "email": "wafi@examplegmail.com",
  "password": "rahasia123"
}
```

Aturan validasi:
- `username`: 3–50 karakter, unik
- `full_name`: 1–100 karakter
- `email`: format email valid, maksimal 150 karakter, unik
- `password`: minimal 6 karakter

Response `201`:
```json
{
  "user": {
    "id": 1,
    "username": "wafi",
    "full_name": "Ahmad Wafi Fathurrahman",
    "email": "wafi@examplegmail.com",
    "profile_image": null,
    "created_at": "2026-10-30T09:30:00Z",
    "updated_at": "2026-10-30T09:30:00Z"
  }
}
```
Galat: `400` (validasi), `409` (username/email sudah dipakai).

### `POST /auth/login`

Request:
```json
{ "email": "wafi@examplegmail.com", "password": "rahasia123" }
```

Response `200`:
```json
{
  "token": "eyJhbGciOi...",
  "token_type": "Bearer",
  "expires_in": 86400,
  "user": { "id": 1, "username": "wafi", "...": "..." }
}
```
Galat: `400` (field kosong), `401` (email atau password salah; pesan sengaja tidak membedakan keduanya).

---

## Pengguna

### 🔒 `GET /users/me`
Response `200`: objek `User` (seperti di atas).

---

## Penyakit

### `GET /diseases`
Publik (tanpa token). Response `200`: array `Disease`.

```json
[
  {
    "id": 1,
    "diseases_name": "Busuk Buah",
    "description": "...",
    "symptoms": "...",
    "treatment": "...",
    "prevention": "...",
    "image": "/images/busuk-buah.jpg"
  }
]
```

### `GET /diseases/{id}`
Publik. Response `200`: satu objek `Disease`. Galat: `404`.

---

## Deteksi

### 🔒 `POST /detections`

Request: `multipart/form-data` dengan satu field `image` (file).
- Format: JPEG, PNG, atau WebP
- Ukuran maksimal: 5 MB

Response `201`: objek `Detection`.

```json
{
  "id": 12,
  "user_id": 1,
  "diseases_id": 1,
  "image_url": "/uploads/detections/3f2a....jpg",
  "gradcam_url": "/uploads/gradcam/3f2a....png",
  "confidence": 0.9132,
  "detected_at": "2026-10-30T09:40:00Z",
  "class_name": "Busuk Buah",
  "probabilities": {
    "Busuk Buah": 0.9132,
    "Helopeltis": 0.0411,
    "Penggerek Buah Kakao": 0.0302,
    "Kakao Sehat": 0.0155
  },
  "original_filename": "buah1.jpg",
  "model_version": "resnet50-cbam-v1",
  "disease": { "id": 1, "diseases_name": "Busuk Buah", "...": "..." }
}
```
Galat: `400` (field `image` tidak ada), `413`, `415`, `503` (model AI tidak tersedia).

### 🔒 `GET /detections?page=1&limit=10`

Riwayat milik pengguna yang sedang login, terbaru lebih dulu. `limit` maksimal 50.

Response `200`:
```json
{
  "data": [ { "...": "objek Detection" } ],
  "page": 1,
  "limit": 10,
  "total": 37
}
```

### 🔒 `GET /detections/{id}`
Response `200`: satu `Detection`. Galat: `404` (termasuk bila milik pengguna lain).

### 🔒 `DELETE /detections/{id}`
Response `204` tanpa body. Galat: `404`.

---

## Kontrak internal Rust ↔ FastAPI

FastAPI tidak dapat diakses dari browser, hanya dari Rust.

### `POST http://ml-service:8000/predict`

Request: `multipart/form-data`, field `image` (file).

Response `200`:
```json
{
  "class_name": "Busuk Buah",
  "confidence": 0.9132,
  "probabilities": {
    "Busuk Buah": 0.9132,
    "Helopeltis": 0.0411,
    "Penggerek Buah Kakao": 0.0302,
    "Kakao Sehat": 0.0155
  },
  "gradcam_png_base64": "iVBORw0KGgo...",
  "model_version": "resnet50-cbam-v1"
}
```

Syarat: nilai `class_name` harus persis sama dengan `diseases.diseases_name` di database. Rust memakainya untuk mencari `diseases_id`.
