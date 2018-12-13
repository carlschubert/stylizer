import io
import os  
import re
import subprocess

from flask import (
  Flask, render_template, request, jsonify, 
  make_response, send_from_directory
)

SERVER_DIR = "../server"
STATIC_DIR = "../static/dist"

# TODO: make this a dictionary and remove some of the path construction later in file
IMAGE_DIRECTORIES = [
  os.path.join(SERVER_DIR, 'images/style_images'),
  os.path.join(SERVER_DIR, 'images/content_images'),
  os.path.join(STATIC_DIR, 'output')
]

PASTICHE_URL_PATTERN = r'content_image_(\d+)_stylized_style_image_(\d+)_\d+.jpg'

app = Flask(__name__, static_folder=STATIC_DIR, template_folder=STATIC_DIR)
app.secret_key = str(os.urandom(24))[2:-1]

def make_nst_bash_script(session_id):
  return """arbitrary_image_stylization_with_weights \
  --checkpoint={server_dir}/model/model.ckpt \
  --output_dir={static_dir}/output/{session_id} \
  --style_images_paths={server_dir}/images/style_images/{session_id}/*.jpg \
  --content_images_paths={server_dir}/images/content_images/{session_id}/*.jpg \
  --image_size=256 \
  --content_square_crop=False \
  --style_image_size=256 \
  --style_square_crop=False \
  --interpolation_weights=[0.0,0.2,0.4,0.6,0.8,1.0] \
  --logtostderr""".format(
      server_dir=SERVER_DIR, static_dir=STATIC_DIR,
      session_id=session_id)

 
def run_script(session_id):
    cmd = make_nst_bash_script(session_id)
    subprocess.call(cmd, shell=True)

def cleanup_dir(d):
  files = os.listdir(d)
  for f in files:
    os.remove(os.path.join(d, f))

def cleanup_server(session_id):
  for d in ['images/style_images', 'images/content_images']:
    cleanup_dir(os.path.join(SERVER_DIR, d, session_id))

def cleanup_static(session_id):
  cleanup_dir(os.path.join(STATIC_DIR, 'output', session_id))

def setup_session_directories(session_id):
  for d in IMAGE_DIRECTORIES:
    if os.path.exists(os.path.join(d, session_id)):
      return
    os.mkdir(os.path.join(d, session_id))

def get_image_metadata(session_id):
  output_urls = os.listdir(os.path.join(STATIC_DIR, "output", session_id))
  print(output_urls)

  styles = []
  contents = []
  iws = {}
  for url in sorted(output_urls):
    if 'content_image' in url and 'style_image' in url:
      csource, ssource = re.match(PASTICHE_URL_PATTERN, url).groups()
      
      iws.setdefault(int(csource)-1, {}).setdefault(int(ssource)-1, []).append(
        os.path.join('output', session_id, url)
      )
    elif 'content_image' in url:
      contents.append(os.path.join('output', session_id, url))
      
    elif 'style_image' in url:
      styles.append(os.path.join('output', session_id, url))
    else:
      raise Exception("Unexpected result type: {}".format(url))

  metadata = {
    'styles':styles,
    'contents': contents,
    'interp_weights': iws
  }
  return metadata

@app.route('/output/<path:image_path>')
def output(image_path):
  image_path = os.path.join(STATIC_DIR, 'output', image_path)

  with open(image_path, 'rb') as handle:
    image_binary = handle.read()
  
  response = make_response(image_binary)
  response.headers.set('Content-Type', 'image/jpeg')
  
  return response

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
      session_id =  request.form['sessionId']

      setup_session_directories(session_id)
      
      cleanup_static(session_id)

      style_images = request.files.getlist('styleBin')
      for i, im in enumerate(style_images):
        im.save(os.path.join(
          SERVER_DIR, "images/style_images", 
          session_id, im.filename
        ))

      content_images = request.files.getlist('contentBin')
      for i, im in enumerate(content_images):
        im.save(os.path.join(
          SERVER_DIR, "images/content_images", 
          session_id, im.filename
        ))

      run_script(session_id)

      image_metadata = get_image_metadata(session_id)
      
      cleanup_server(session_id)

      return jsonify(image_metadata)
    else:
      return render_template("index.html")

if __name__ == "__main__":
  app.run(debug=True)

