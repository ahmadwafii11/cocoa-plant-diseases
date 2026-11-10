import numpy as np
import tensorflow as tf
from PIL import Image

IMAGE_SIZE = (224, 224)

def preprocess_image(image_path: str):
    """"
    Preprocessing gambar yang disesuaikan dengan preprocessing gambar 
    pada tahap training
    """

    # load image
    image = Image.open(image_path)

    # conver RGB
    image = image.convert("RGB")

    # Resize
    image = image.resize(IMAGE_SIZE)

    # convert to float32
    image_array = np.array(image).astype(np.float32)

    # resnet50 ImageNet preprocessing
    image_array = tf.keras.applications.resnet50.preprocess_input(image_array)

    # add batch dimension
    image_array = np.expand_dims(image_array, axis=0)

    return image_array