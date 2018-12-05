from flask import Flask

import test_subprocess

app = Flask(__name__)

@app.route("/")
def hello():
    test_subprocess.main()
    return "YAY!"

if __name__ == "__main__":
    app.run(debug=True)