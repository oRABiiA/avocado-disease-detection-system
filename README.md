# 🌱 Avocado Disease Detection System

An intelligent IoT + AI-powered system for **real-time avocado tree health monitoring** and **early disease detection**.  
The system combines **sensor data** (via MQTT), **AI image analysis** (via GPT-4o-mini), and **cloud integration** (Firebase) to deliver actionable insights to farmers.

---

## 📌 Features

- **🌳 Real-Time Monitoring**
  - Live sensor data (soil moisture, temperature, humidity) via Mosquitto Cloud.
  - Historical data tracking and visualization.
  
- **🤖 AI Disease Detection**
  - Upload tree images for disease analysis using GPT-4o-mini.
  - Receive treatment recommendations.

- **🚨 Smart Alerts**
  - Notifications for abnormal readings or detected diseases.
  - Clear, mark, and manage alerts.

- **🗓 Task & Event Management**
  - Calendar to add, update, and complete events.
  - Syncs events with Firebase Cloud.

---

## 🏗 System Architecture

The system consists of:
- **Farmer Interface** (Dashboard for data visualization and task management).
- **Cloud Services**:  
  - Firebase (data storage)  
  - Mosquitto MQTT Broker (sensor data)  
- **AI Model**: GPT-4o-mini for disease detection.

---

## 📊 Use Case Overview

The farmer can:
1. Monitor tree health via real-time sensor data.
2. Upload avocado tree images for disease analysis.
3. Get treatment recommendations.
4. Manage alerts, history, and calendar events.


---

## 🛠 Tech Stack

- **Frontend**: React / Next.js
- **Backend**: Node.js
- **Cloud Services**: Firebase, Mosquitto MQTT Broker
- **AI Model**: GPT-4o-mini
- **Database**: Firebase Realtime Database
- **Protocols**: MQTT

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/avocado-disease-detection.git
cd avocado-disease-detection
