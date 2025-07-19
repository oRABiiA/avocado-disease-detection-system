
import time
import cv2
import threading
from flask import Flask, send_file


# 1. Initialize Flask
app = Flask(__name__)

# This function captures a photo from your USB camera
def capture_photo_loop():
    while True:
        cam = cv2.VideoCapture(0)
        ret, frame = cam.read()
        cam.release()

        if ret:
            cv2.imwrite("static/photo.jpg", frame)
            print("✅ Photo captured")
        else:
            print("❌ Failed to capture photo")

        time.sleep(600)  # wait 10 minutes (600 seconds)

# Start the photo-capturing loop in the background
threading.Thread(target=capture_photo_loop, daemon=True).start()

# Serve the latest photo
@app.route("/photo")
def serve_photo():
    return send_file("static/photo.jpg", mimetype="image/jpeg")

# Start the Flask web server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
