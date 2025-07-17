"use client";
import { useEffect, useRef } from "react";
import {ref, set, get, child } from "firebase/database";
import useMqtt from "@/app/hooks/useMqtt";
import { database } from "@/lib/firebaseConfig";

const SensorDataLogger = () => {
  const { temperature, soil_moisture } = useMqtt();
  var hour_AM_PM = 0;

  const tempRef = useRef(temperature);
  const moistureRef = useRef(soil_moisture);
  const hourRef = useRef(hour_AM_PM);
  

  useEffect(() => {
    tempRef.current = temperature;
    moistureRef.current = soil_moisture;
  }, [temperature, soil_moisture]);

  useEffect(() => {
    const uploadSensorData = () => {
      const temp = tempRef.current;
      const moisture = moistureRef.current;
      var hour = hourRef.current

      if (temp !== null && moisture !== null) {
        const now = new Date();
        const sensorHour = now.getHours(); // "The hour at which time the data was taken from sensors e.g. 14"

        if (sensorHour === 0) 
        {
          hour = "12AM";
        } 
        else if (sensorHour < 12) 
        {
          hour = `${sensorHour}AM`;
        } 
        else if (sensorHour === 12) 
        {
          hour = "12PM";
        } 
        else 
        {
          hour = `${sensorHour - 12}PM`;
        }

        // Set path: sensor_data_history/{hour}
        const hourRef = ref(database, `sensor_data_history/${hour}`);

        set(hourRef, {
          temperature: temp,
          moisture: moisture,
          time_of_upload: hour,
        });
      }
    };

    uploadSensorData(); // Immediate upload on mount
    const interval = setInterval(uploadSensorData, 60 * 60 * 1000); // Every hour

    return () => clearInterval(interval);
  }, []); // Only once on mount

  return null;
};

export default SensorDataLogger;
