import tensorflow as tf
import numpy as np
import cv2

def generate_gradcam(
    model,
    image_path,
    predicted_index,
    output_path,
    target_layer_name="cbam_conv5"
):
    """
    Membuat visualisasi Grad-CAM berdasarkan kelas hasil prediksi.
    """

    # =========================
    # LOAD IMAGE
    # =========================
    image = cv2.imread(image_path)

    if image is None:
        raise ValueError(
            f"Gambar tidak dapat dibaca: {image_path}"
        )

    original_image = image.copy()

    # BGR -> RGB
    image_rgb = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2RGB
    )

    # Resize sesuai input model
    image_resized = cv2.resize(
        image_rgb,
        (224, 224)
    )

    # Convert ke float32
    image_array = image_resized.astype(
        np.float32
    )

    # ResNet50 ImageNet preprocessing
    image_array = tf.keras.applications.resnet50.preprocess_input(image_array)

    # Tambahkan batch dimension
    input_image = np.expand_dims(
        image_array,
        axis=0
    )

    # =========================
    # GRAD-CAM MODEL
    # =========================
    target_layer = model.get_layer(target_layer_name)

    grad_model = tf.keras.models.Model(
        inputs=model.inputs,
        outputs=[
            target_layer.output,
            model.outputs[0]
        ]
    )

    # =========================
    # FORWARD + GRADIENT
    # =========================
    with tf.GradientTape() as tape:

        conv_outputs, predictions = grad_model(
            input_image
        )

        class_channel = predictions[
            :,
            predicted_index
        ]

    # =========================
    # GRADIENT
    # =========================
    grads = tape.gradient(
        class_channel,
        conv_outputs
    )

    # Global Average Pooling terhadap gradient
    pooled_grads = tf.reduce_mean(
        grads,
        axis=(0, 1, 2)
    )

    # Hilangkan batch dimension
    conv_outputs = conv_outputs[0]

    # Weighted combination
    heatmap = conv_outputs @ pooled_grads[
        ..., tf.newaxis
    ]

    heatmap = tf.squeeze(heatmap)

    # Hanya nilai positif
    heatmap = tf.maximum(
        heatmap,
        0
    )

    # Normalisasi heatmap
    max_value = tf.reduce_max(
        heatmap
    )

    if max_value > 0:
        heatmap /= max_value

    heatmap = heatmap.numpy()

    # =========================
    # RESIZE HEATMAP
    # =========================
    heatmap = cv2.resize(
        heatmap,
        (
            original_image.shape[1],
            original_image.shape[0]
        )
    )

    heatmap = np.uint8(
        255 * heatmap
    )

    # =========================
    # CREATE COLOR HEATMAP
    # =========================
    heatmap_color = cv2.applyColorMap(
        heatmap,
        cv2.COLORMAP_JET
    )

    # =========================
    # OVERLAY
    # =========================
    superimposed = cv2.addWeighted(
        original_image,
        0.6,
        heatmap_color,
        0.4,
        0
    )

    # =========================
    # SAVE
    # =========================
    cv2.imwrite(
        output_path,
        superimposed
    )

    return output_path