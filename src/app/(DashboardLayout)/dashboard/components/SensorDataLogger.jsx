// components/SensorDataLogger.tsx
"use client";
import { useEffect, useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import useMqtt from "@/app/hooks/useMqtt";
import {database} from "@/lib/firebaseConfig"

const SensorDataLogger = () => {
  const { temperature, soil_moisture } = useMqtt();
  const [tempHistory, setTempHistory] = useState(Array(24).fill(null));
  const [moistureHistory, setMoistureHistory] = useState(Array(24).fill(null));

  useEffect(() => {
    const interval = setInterval(() => {
      const db = getDatabase();
      const sensorRef = ref(db, "sensor_data");

      // Push the latest values to local state
      setTempHistory((prev) => {
        const updated = [...prev.slice(1), temperature];
        set(sensorRef, {
          temperature: updated,
          soil_moisture: moistureHistory,
        });
        return updated;
      });

      setMoistureHistory((prev) => {
        const updated = [...prev.slice(1), soil_moisture];
        set(ref(db, "sensor_data"), {
          temperature: tempHistory,
          soil_moisture: updated,
        });
        return updated;
      });

    }, 1000);

    return () => clearInterval(interval);
  }, [temperature, soil_moisture]);

  return null; // Nothing visual rendered
};


// // Sync sensor data to the database whenever history updates
// useEffect(() => {
//   const db = getDatabase();
//   const interval = setInterval(() => {
//     const sensorDataRef = ref(db, "sensor_data");
//     const payload = {
//       temperature: tempHistory,
//       soil_moisture: moistureHistory,
//       timestamp: new Date().toISOString(), 
//     };
//     set(sensorDataRef, payload);
//   }, 1000); // every hour
//   return () => clearInterval(interval);
// }, [tempHistory, moistureHistory]);

export default SensorDataLogger;
