import os
import subprocess

from flask import Flask, render_template, request, jsonify, send_from_directory

SERVER_DIR = "../server"
STATIC_DIR = "../static"

app = Flask(__name__, static_folder=os.path.join(STATIC_DIR, "dist"), template_folder=STATIC_DIR)

CMD = """arbitrary_image_stylization_with_weights \
  --checkpoint={server_dir}/model/model.ckpt \
  --output_dir={static_dir}/dist/output \
  --style_images_paths={server_dir}/images/style_images/*.jpg \
  --content_images_paths={server_dir}/images/content_images/*.jpg \
  --image_size=256 \
  --content_square_crop=False \
  --style_image_size=256 \
  --style_square_crop=False \
  --interpolation_weights=[0.0,0.2,0.4,0.6,0.8,1.0] \
  --logtostderr""".format(server_dir=SERVER_DIR, static_dir=STATIC_DIR)

def run_script():
    subprocess.call(CMD, shell=True)

@app.route('/output/<path:filename>')
def output(filename):
  
  return send_from_directory(os.path.join(app.static_folder, 'output/'), filename)

@app.route("/", methods=['GET', 'POST'])
def main():
    app.logger.debug(app.static_folder)
    # TODO form validaton
      # * must be jpeg
      # * must be secure url
      # * at least one style and content image
      # * handle filetypes other than jpg
    if request.method == 'POST':
      style_images = request.files.getlist('styleBin')
      for i, im in enumerate(style_images):
        im.save(os.path.join(os.getcwd(), "../server/images", "style_images", im.filename ))

      content_images = request.files.getlist('contentBin')
      for i, im in enumerate(content_images):
        im.save(os.path.join(os.getcwd(), "../server/images", "content_images", im.filename ))

      run_script()

      # output_urls = os.listdir()
     
      return jsonify(canitacceptboolean=True)
    else:
      return render_template("index.html")

if __name__ == "__main__":
  app.run(debug=True)

