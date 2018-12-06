from flask import Flask, render_template, request, jsonify

import subprocess

app = Flask(__name__, static_folder="../static/dist", template_folder="../static/dist")

CMD = """arbitrary_image_stylization_with_weights \
  --checkpoint=$(pwd)/model/model.ckpt \
  --output_dir=$(pwd)/output \
  --style_images_paths=images/style_images/*.jpg \
  --content_images_paths=images/content_images/*.jpg \
  --image_size=256 \
  --content_square_crop=False \
  --style_image_size=256 \
  --style_square_crop=False \
  --interpolation_weights=[0.0,0.2,0.4,0.6,0.8,1.0]
  --logtostderr"""

def run_script():
    subprocess.call(CMD, shell=True)

@app.route("/", methods=['GET', 'POST'])
def main():
    import base64
    if request.method == 'POST':
      # styleBinaries = request.data['styleBin']
      # contentBinaries = request.data['contentBin']
      app.logger.info(f'len sbin: {request.files}')

      # byteeee = base64.decodebytes(styleBinaries[0])
      
      # app.logger.info(f'len sbin: {len(styleBinaries)}')
      # app.logger.info(f'len bin1: {len(styleBinaries[0])}')
      # app.logger.info(f'len bin2: {len(styleBinaries[0])}')
      # app.logger.info(f'len bin2: {byteeee[:100]}')
      # app.logger.info(f'len bin2: {type(styleBinaries[0])}')
      

      # with open('test.jpg', 'w') as handle:
      #   handle.write(byteeee)
      
      return jsonify(canitacceptboolean=True)
    else:
      return render_template("index.html")

if __name__ == "__main__":
  app.run(debug=True)

