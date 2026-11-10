import tensorflow as tf
from tensorflow.keras import layers
from tensorflow.keras.layers import(
    Input,
    Conv2D,
    Dense,
    GlobalAveragePooling2D,
    GlobalMaxPooling2D,
    Reshape,
    Multiply,
    Add,
    Activation
)

@tf.keras.utils.register_keras_serializable()
class ConvolutionalBlockAttentionModule(layers.Layer):
    def __init__(
        self,
        reduction_ratio=16,
        spatial_kernel_size=7,
        **kwargs
    ):
        super().__init__(**kwargs)

        self.reduction_ratio = reduction_ratio
        self.spatial_kernel_size = spatial_kernel_size

    # method build
    def build(self, input_shape):
        channel = input_shape[-1]
        hidden_channel = max(channel // self.reduction_ratio, 1)

        # shared MLP
        self.shared_dense_1 = Dense(hidden_channel, activation="relu", use_bias=True)

        self.shared_dense_2 = Dense(channel, use_bias=True)

        # Spatial Attention
        self.spatial_conv = Conv2D(
            filters=1,
            kernel_size=self.spatial_kernel_size,
            padding="same",
            activation="sigmoid",
            use_bias=False
        )

        super().build(input_shape)

    # method channel attention
    def channel_attention(self, x):
        # Average Pooling
        avg_pool = GlobalAveragePooling2D()(x)
        avg_pool = Reshape((1, 1, x.shape[-1]))(avg_pool)

        # Max Pooling
        max_pool = GlobalMaxPooling2D()(x)
        max_pool = Reshape((1, 1, x.shape[-1]))(max_pool)

        # Shared MLP - Average
        avg_out = self.shared_dense_1(avg_pool)
        avg_out = self.shared_dense_2(avg_out)

        # Shared MLP - Max
        max_out = self.shared_dense_1(max_pool)
        max_out = self.shared_dense_2(max_out)

        # Combine
        attention = Add()([avg_out, max_out])
        attention = Activation("sigmoid")(attention)

        # Apply Channel Attention
        x = Multiply()([x, attention])

        return x

    # method spatial attention
    def spatial_attention(self, x):
        # Average pooling across channel
        avg_pool = tf.reduce_mean(x, axis=-1, keepdims=True)

        # Max pooling across channel
        max_pool = tf.reduce_max(x, axis=-1, keepdims=True)

        # Concatenate
        concat = tf.concat([avg_pool, max_pool], axis=-1)

        # Spatial Attention
        attention = self.spatial_conv(concat)

        # Apply Spatial Attention
        x = Multiply()([x, attention])

        return x

    # method call channel attention and spatial attention
    def call(self, inputs):
        # Channel Attention
        x = self.channel_attention(inputs)

        # Spatial Attention
        x = self.spatial_attention(x)

        return x

    # method get config
    def get_config(self):
        config = super().get_config()
        config.update({
            "reduction_ratio": self.reduction_ratio,
            "spatial_kernel_size": self.spatial_kernel_size
        })

        return config