from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
import shutil

from app.services.prediction import predict_image, model
from app.services.gradcam import generate_gradcam
from app.schemas.prediction import PredictionResponse


router = APIRouter()

UPLOAD_DIR     = Path("uploads")
RESULT_DIR     = Path("results")
MODEL_VERSION  = "resnet50-cbam-v2"

UPLOAD_DIR.mkdir(exist_ok=True)
RESULT_DIR.mkdir(exist_ok=True)


@router.post(
    "/predict",
    response_model=PredictionResponse
)
async def predict(image: UploadFile = File(...)):

    # =========================
    # VALIDASI FILE
    # =========================

    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="File yang diupload harus berupa gambar seperti JPG, PNG, dll."
        )

    # =========================
    # SAVE IMAGE
    # =========================

    file_path = UPLOAD_DIR / image.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            image.file,
            buffer
        )

    # =========================
    # PREDICTION
    # =========================

    result = predict_image(
        str(file_path)
    )

    predicted_index = result["predicted_index"]

    # =========================
    # GRAD-CAM
    # =========================

    gradcam_filename = f"gradcam-{image.filename}"

    gradcam_path = RESULT_DIR / gradcam_filename

    generate_gradcam(
        model=model,
        image_path=str(file_path),
        predicted_index=predicted_index,
        output_path=str(gradcam_path)
    )

    # =========================
    # RESPONSE
    # =========================

    return {
        "class_name": result["class_name"],
        "confidence": result["confidence"],
        "probabilities": result["probabilities"],
        "image_path": f"/uploads/{image.filename}",
        "gradcam_path": f"/results/{gradcam_filename}",
        "model_version": MODEL_VERSION
    }