import os
import re
import subprocess

from flask import Flask, render_template, request, jsonify, send_from_directory

SERVER_DIR = "../server"
STATIC_DIR = "../static/dist"

CONTENT_URL_PATTERN = r'content_image_(\d+).jpg'
STYLE_URL_PATTERN = r'style_image_(\d+).jpg'
PASTICHE_URL_PATTERN = r'content_image_(\d+)_stylized_style_image_(\d+)_(\d+).jpg'

app = Flask(__name__, static_folder=STATIC_DIR, template_folder=STATIC_DIR)

CMD = """arbitrary_image_stylization_with_weights \
  --checkpoint={server_dir}/model/model.ckpt \
  --output_dir={static_dir}/output \
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

def cleanup_dir(d):
  files = os.listdir(d)
  for f in files:
    os.remove(os.path.join(d, f))

def cleanup_server():
  for d in ['images/style_images', 'images/content_images']:
    cleanup_dir(os.path.join(SERVER_DIR, d))

def cleanup_static():
  cleanup_dir(os.path.join(STATIC_DIR, 'output'))

def get_image_metadata():
  output_urls = os.listdir(os.path.join(STATIC_DIR, "output"))

  metadata = []
  for url in output_urls:
    if 'content_image' in url and 'style_image' in url:
      csource, ssource, iw = re.match(PASTICHE_URL_PATTERN, url).groups()
      metadata.append({
        "src": os.path.join('output', url),
        "type": 'pastiche',
        "style_source": ssource,
        "content_source": csource,
        "interpolation_weight": iw
      })
    elif 'content_image' in url:
      csource = re.match(CONTENT_URL_PATTERN, url).groups()[0]
      metadata.append({
        "src": os.path.join('output', url),
        "type": 'content',
        "content_source": csource
      })
    elif 'style_image' in url:
      ssource = re.match(STYLE_URL_PATTERN, url).groups()[0]
      metadata.append({
        "src": os.path.join('output', url),
        "type": 'style',
        "style_source": ssource
      })
    else:
      raise Exception("Unexpected result type: {}".format(url))

  return metadata

@app.route('/output/<path:filename>')
def output(filename):
  
  return send_from_directory(os.path.join(app.static_folder, 'output/'), filename)

@app.route('/bundle.js')
def serve_js():
  return send_from_directory(app.static_folder, 'bundle.js')

@app.route("/", methods=['GET', 'POST'])
def main():
    # TODO form validaton
      # * must be jpeg
      # * must be secure url
      # * at least one style and content image
      # * handle filetypes other than jpg

    if request.method == 'POST':
      cleanup_static()

      style_images = request.files.getlist('styleBin')
      for i, im in enumerate(style_images):
        im.save(str(os.path.join(SERVER_DIR, "images/style_images", im.filename )))

      content_images = request.files.getlist('contentBin')
      for i, im in enumerate(content_images):
        im.save(os.path.join(SERVER_DIR, "images/content_images", im.filename ))

      run_script()

      image_metadata = get_image_metadata()
      
      cleanup_server()

      return jsonify(image_metadata)
    else:
      return render_template("index.html")

if __name__ == "__main__":
  app.run(debug=True)

