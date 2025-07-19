import cv2
from openai import OpenAI
import base64
import schedule
import time
from datetime import datetime
import paho.mqtt.client as mqtt
from PIL import Image
import io
import json
import re
import firebase_admin
from firebase_admin import credentials, db

# ─── Your OpenAI API Key ───────────────────────
client = OpenAI(
    api_key="" # add your openAi sdk here
)
# Initialize Firebase
cred = credentials.Certificate("avotech-eb2b8-firebase-adminsdk-fbsvc-afc48b957d.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://avotech-eb2b8-default-rtdb.europe-west1.firebasedatabase.app'
})
test_ref = db.reference("AI_response")


# ─── Sensor Data ───────────────────────────────
temperature = None
soil_moisture = None


# ─── MQTT Setup ────────────────────────────────
def on_connect(client, userdata, flags, rc):
    print("✅ Connected to MQTT broker")
    client.subscribe("AvoTech/temperature")
    client.subscribe("AvoTech/soil_moisture")


def on_message(client, userdata, msg):
    global temperature, soil_moisture
    if msg.topic == "AvoTech/temperature":
        temperature = msg.payload.decode()
    elif msg.topic == "AvoTech/soil_moisture":
        soil_moisture = msg.payload.decode()


mqtt_client = mqtt.Client()
mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message
mqtt_client.connect("test.mosquitto.org", 1883, 60)
mqtt_client.loop_start()


def save_gpt_reply_to_firebase(gpt_reply):
    # If gpt_reply is a string, convert it to a dictionary
    if isinstance(gpt_reply, str):
        try:
            gpt_reply = json.loads(gpt_reply)
        except json.JSONDecodeError as e:
            print(f"❌ JSON decode failed: {e}")
            return

    # Skip saving if GPT says no tree is detected
    if gpt_reply.get("healthy") == "no tree detected":
        print("⚠️ No tree detected. Skipping save to Firebase.")
        return

    formatted = {
        "Healthy": gpt_reply["healthy"],
        "Tip1": gpt_reply["tip1"],
        "Tip2": gpt_reply["tip2"],
        "Tip3": gpt_reply["tip3"],
        "timestamp": datetime.now().isoformat()
    }

    try:
        ref = db.reference("AI_response")
        ref.set(formatted)
        print("✅ GPT reply saved to Firebase.")
    except Exception as e:
        print(f"❌ Failed to save to Firebase: {e}")


def run_analysis():
    print(f"\n📸 Running analysis at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    # Wait for sensor data if not yet received
    wait_start = time.time()
    while (temperature is None or soil_moisture is None) and (time.time() - wait_start < 10):
        time.sleep(1)

    # ─── Capture Image ─────────────────────────────
    cam = cv2.VideoCapture(0)
    ret, frame = cam.read()
    cam.release()

    if not ret:
        print("❌ Failed to capture photo")
        exit()

    # # ─── Save the Image Locally ────────────────────
    cv2.imwrite("photo.jpg", frame)

    # ─── Resize Image to 512px Max (preserve aspect) ──
    image = Image.open("photo.jpg")
    image.thumbnail((512, 512))  # Resizes in-place, keeping aspect ratio

    # Save resized image to a new file
    resized_path = "resized_photo.jpg"
    image.save(resized_path)

    # ─── Read Resized Image and Convert to Base64 ──────
    with open(resized_path, "rb") as f:
        img_bytes = f.read()
        b64_image = base64.b64encode(img_bytes).decode('utf-8')

    # ─── Add Sensor Info to Prompt ─────────────
    sensor_info = f"The temperature is {temperature}°C and the soil moisture is {soil_moisture}. "
    prompt = (
        f"You are an expert in avocado trees. This is a photo of an avocado tree. "
        f"Sensor data: {sensor_info}. "
        f"Return your answer in JSON format only: {{ healthy:YES or NO, tip1:..., tip2:..., tip3:... }}. "
        f"If healthy or If unhealthy, include 3 helpful tips. If the avocado tree in the image is not clearly visible, not centered, or not identifiable, you must return: healthy: 'no tree detected'. If there are signs of leaf damage, discoloration, drooping, or wilting, set healthy: NO. Only return YES if the tree looks clearly healthy."
    )
    print(prompt)
    # ─── Send to ChatGPT with Image Input ──────────
    response = client.chat.completions.create(
      model="gpt-4o-mini",
      store=True,
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text":prompt},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{b64_image}"
                        }
                    }
                ]
            }
        ],
        max_tokens=300
    )

    # # ─── Print ChatGPT’s Reply ─────────────────────
    response_analyise=response.choices[0].message.content
    # Step 2: Remove markdown backticks and "json" tag
    if response_analyise.startswith("```json"):
        response_analyise = response_analyise[7:]  # remove ```json
    # Remove ending triple backticks if present
    if response_analyise.strip().endswith("```"):
        response_analyise = response_analyise.strip()[:-3]
    cleaned = response_analyise.strip()
    print("\n🤖 ChatGPT content says:")
    print(cleaned)
    save_gpt_reply_to_firebase(cleaned)



# ─── Schedule Tasks ─────────────────────────────────
schedule.every().day.at("09:00").do(run_analysis)
schedule.every().day.at("15:00").do(run_analysis)

print("✅ Avocado health checker started. Waiting for 09:00 and 15:00...")

while True:


    print(f"\n📸 time now is: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    schedule.run_pending()
    time.sleep(60)
