import { useEffect, useState } from "react";
import mqtt from "mqtt";

const BROKER_URL = "wss://test.mosquitto.org:8081"; // WebSocket MQTT endpoint
const TOPICS = ["AvoTech/temperature", "AvoTech/soil_moisture"];

export default function useMqtt() {
  const [sensorData, setSensorData] = useState({
    temperature: null,
    soil_moisture: null,
  });

  useEffect(() => {
    const client = mqtt.connect(BROKER_URL);

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe(TOPICS);
    });

    client.on("message", (topic, message) => {
      const value = parseFloat(message.toString());

      setSensorData((prev) => ({
        ...prev,
        temperature: topic === "AvoTech/temperature" ? value : prev.temperature,
        soil_moisture: topic === "AvoTech/soil_moisture" ? value : prev.soil_moisture,
      }));
    });

    return () => {
      client.end();
    };
  }, []);

  return sensorData;
}
