import numpy as np
import tensorflow as tf

from app.services.preprocessing import preprocess_image
from app.services.cbam import ConvolutionalBlockAttentionModule

# configuration
MODEL_PATH = "models/best_resnet50_cbam_tahap_2.keras"

CLASS_NAMES = [
    "Busuk Buah",
    "Helopeltis",
    "Kakao Sehat",
    "Penggerek Buah Kakao",
]

# load model
model = tf.keras.models.load_model(
    MODEL_PATH,
    custom_objects={
        "ConvolutionalBlockAttentionModule":
            ConvolutionalBlockAttentionModule
    },
    compile=False
)
print("Model ResNet50-CBAM berhasil dimuat!")


# prediction
def predict_image(image_path: str):
    """
    Melakukan prediksi gambar menggunakan model ResNet50-CBAM.
    """

    # pre-processing image
    processed_image = preprocess_image(image_path)

    # predictions
    predictions = model.predict(
        processed_image,
        verbose=0
    )

    probabilities = predictions[0]

    # mengambil indek dengan probabilitas tertinggi
    predicted_index = int(np.argmax(probabilities))

    predicted_class = CLASS_NAMES[predicted_index]
    confidence = float(probabilities[predicted_index])

    return{
        "class_name"            : predicted_class,
        "confidence"            : confidence,
        "predicted_index": predicted_index,
        "probabilities"         : {
            CLASS_NAMES[i]: float(probabilities[i])
            for i in range(len(CLASS_NAMES))
        }
    }