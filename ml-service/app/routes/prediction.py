import hmac
import io
import os
import threading
import uuid
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, File, Header
from PIL import Image, ImageOps, UnidentifiedImageError

from app.schemas.prediction import PredictionResponse
from app.services.prediction import predict_image, model
from app.services.gradcam import generate_gradcam


router = APIRouter()

UPLOAD_DIR     = Path("uploads")
RESULT_DIR     = Path("results")
MODEL_VERSION  = "resnet50-cbam-v2"
MAX_IMAGE_BYTES = 10 * 1024 * 1024

UPLOAD_DIR.mkdir(exist_ok=True)
RESULT_DIR.mkdir(exist_ok=True)

# Model Keras dipakai bersama oleh semua request: satu inferensi pada satu waktu.
_inference_lock = threading.Lock()

def verify_internal_key(x_internal_key: Optional[str] = Header(default=None)):
    """
    Hanya backend Rust yang dapat memanggil /predict.
    Kunci dibaca melalui ML_INTERNAL_KEY. 
    Apabila variabel tersebut tidak diset (mode pengembangan), maka pemeriksaan akan dilewati.
    """
    expected = os.getenv("ML_INTERNAL_KEY")

    if not expected:
        return
    
    if not x_internal_key or not hmac.compare_digest(x_internal_key, expected):
        raise HTTPException(status_code=401, detail="Kunci internal tidak valid.")

@router.post(
    "/predict",
    response_model=PredictionResponse,
    dependencies=[Depends(verify_internal_key)],
)
# `def` biasa (bukan `async def`) 
# FastAPI menjalankannya di thread pool. 
# Sehingga inferensi TensorFlow yang berat tidak memblokir seluruh server (termasuk penyajian gambar dari /uploads dan /results).
def predict(image: UploadFile = File(...)):

    # =========================
    # VALIDASI FILE
    # =========================

    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="File yang diupload harus berupa gambar seperti JPG, PNG, dll."
        )
    
    data = image.file.read(MAX_IMAGE_BYTES + 1)
    if len(data) > MAX_IMAGE_BYTES:
        raise HTTPException(status_code=413, detail="Ukuran gambar maksimal 10MB.")

    # =========================
    # NORMALIZATION & SAVE IMAGE
    # =========================
    # - Nama file dibuat sendiri (UUID); nama dari klien TIDAK dipakai.
    # - Orientasi EXIF diterapkan sekali di sini, lalu disimpan ulang tanpa EXIF.
    # - Sehingga prediksi, Grad-CAM, dan gambar yang ditampilkan memakai orientasi yang sama persis.

    try:
        pil_image = Image.open(io.BytesIO(data))
        pil_image = ImageOps.exif_transpose(pil_image).convert("RGB")
    except (UnidentifiedImageError, OSError, ValueError, Image.DecompressionBombError):
        raise HTTPException(
            status_code=400,
            detail="File tidak dapat dibaca sebagai gambar."
        )

    file_id           = uuid.uuid4().hex
    file_name         = f"{file_id}.jpg"
    gradcam_filename  = f"gradcam-{file_name}"

    file_path         = UPLOAD_DIR / file_name
    gradcam_path      = RESULT_DIR / gradcam_filename

    pil_image.save(file_path, format="JPEG", quality=95)

    # =========================
    # PREDICTION + GRAD-CAM
    # =========================

    try:
        with _inference_lock:
            result = predict_image(str(file_path))

            generate_gradcam(
                model=model,
                image_path=str(file_path),
                predicted_index=result["predicted_index"],
                output_path=str(gradcam_path)
            )
    except Exception:
        file_path.unlink(missing_ok=True)
        gradcam_path.unlink(missing_ok=True)
        raise HTTPException(status_code=500, detail="Gagal melakukan proses gambar.")

    # =========================
    # RESPONSE
    # =========================

    return {
        "class_name": result["class_name"],
        "confidence": result["confidence"],
        "probabilities": result["probabilities"],
        "image_path": f"/uploads/{file_name}",
        "gradcam_path": f"/results/{gradcam_filename}",
        "model_version": MODEL_VERSION
    }