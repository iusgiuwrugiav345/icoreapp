import os
from flask import Flask, send_from_directory
from threading import Thread

app = Flask('')
BASE_DIR = os.path.dirname(__file__)
WEBAPP_DIR = os.path.join(BASE_DIR, "webapp")

@app.route('/')
def home():
    return "I'm alive!"

@app.route('/webapp')
@app.route('/webapp/')
def webapp_index():
    return send_from_directory(WEBAPP_DIR, "index.html")

@app.route('/webapp/<path:filename>')
def webapp_assets(filename):
    return send_from_directory(WEBAPP_DIR, filename)

def run():
    app.run(host='0.0.0.0', port=8080)

def keep_alive():
    t = Thread(target=run)
    t.start()
