from pydantic import BaseModel
from typing import Dict

class PredictionResponse(BaseModel):
    class_name      : str 
    confidence      : float
    probabilities   : Dict[str, float]
    image_path      : str
    gradcam_path    : str
    model_version   : str 