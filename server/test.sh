arbitrary_image_stylization_with_weights \
  --checkpoint=$(pwd)/model/model.ckpt \
  --output_dir=$(pwd)/output \
  --style_images_paths=images/style_images/*.jpg \
  --content_images_paths=images/content_images/*.jpg \
  --image_size=256 \
  --content_square_crop=False \
  --style_image_size=256 \
  --style_square_crop=False \
  --logtostderr