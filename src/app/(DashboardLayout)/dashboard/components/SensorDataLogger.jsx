// // components/SensorDataLogger.tsx
// "use client";
// import { useEffect, useState } from "react";
// import { getDatabase, ref, set } from "firebase/database";
// import useMqtt from "@/app/hooks/useMqtt";
// import {database} from "@/lib/firebaseConfig"

// const SensorDataLogger = () => {
//   const { temperature, soil_moisture } = useMqtt();
//   const [tempHistory, setTempHistory] = useState(Array(24).fill(null));
//   const [moistureHistory, setMoistureHistory] = useState(Array(24).fill(null));

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const db = getDatabase();
//       const sensorRef = ref(db, "sensor_data");

//       // Push the latest values to local state
//       setTempHistory((prev) => {
//         const updated = [...prev.slice(1), temperature];
//         set(sensorRef, {
//           temperature: updated,
//           soil_moisture: moistureHistory,
//         });
//         return updated;
//       });

//       setMoistureHistory((prev) => {
//         const updated = [...prev.slice(1), soil_moisture];
//         set(ref(db, "sensor_data"), {
//           temperature: tempHistory,
//           soil_moisture: updated,
//         });
//         return updated;
//       });

//     }, 1000);

//     return () => clearInterval(interval);
//   }, [temperature, soil_moisture]);

//   return null; // Nothing visual rendered
// };


// // // Sync sensor data to the database whenever history updates
// // useEffect(() => {
// //   const db = getDatabase();
// //   const interval = setInterval(() => {
// //     const sensorDataRef = ref(db, "sensor_data");
// //     const payload = {
// //       temperature: tempHistory,
// //       soil_moisture: moistureHistory,
// //       timestamp: new Date().toISOString(), 
// //     };
// //     set(sensorDataRef, payload);
// //   }, 1000); // every hour
// //   return () => clearInterval(interval);
// // }, [tempHistory, moistureHistory]);

// export default SensorDataLogger;


"use client";
import { useEffect, useRef } from "react";
import { getDatabase, ref, set } from "firebase/database";
import useMqtt from "@/app/hooks/useMqtt";

const SensorDataLogger = () => {
  const { temperature, soil_moisture } = useMqtt();

  // Use refs to access latest values inside setInterval
  const tempRef = useRef(temperature);
  const moistureRef = useRef(soil_moisture);

  useEffect(() => {
    tempRef.current = temperature;
    moistureRef.current = soil_moisture;
  }, [temperature, soil_moisture]);

  useEffect(() => {
    const db = getDatabase();
    const sensorRef = ref(db, "sensor_data");

    const uploadSensorData = () => {
      const temp = tempRef.current;
      const moisture = moistureRef.current;

      if (temp !== null && moisture !== null) {
        const now = new Date();
        const hour = now.getHours();

        set(sensorRef, {
          temperature: temp,
          moisture: moisture,
          time_of_upload: hour,
        });
      }
    };

    uploadSensorData(); // Initial upload

    const interval = setInterval(uploadSensorData, 7000); // Every hour

    return () => clearInterval(interval);
  }, []); // empty dependency array so it runs once on mount

  return null;
};

export default SensorDataLogger;

