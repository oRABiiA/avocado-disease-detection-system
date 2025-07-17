"use client";
import { useEffect, useState } from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";
import { ref, get } from "firebase/database";
import { database } from "@/lib/firebaseConfig";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SensorChart = () => {
  const [tempData, setTempData] = useState([]);
  const [moistureData, setMoistureData] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);

  // Define the correct 12-hour clock order
  const hourOrder = [
    "12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM",
    "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM",
  ];

  const sortEntriesByHourOrder = (entries) => {
    return entries.sort((a, b) => {
      const aIndex = hourOrder.indexOf(a.time_of_upload);
      const bIndex = hourOrder.indexOf(b.time_of_upload);
      return aIndex - bIndex;
    });
  };

  const fetchSensorHistory = async () => {
    const sensorHistoryRef = ref(database, "sensor_data_history");

    try {
      const snapshot = await get(sensorHistoryRef);
      const data = snapshot.val();

      if (data) {
        const entries = Object.values(data);

        // Sort by correct hour order (12AM to 11PM)
        const sorted = sortEntriesByHourOrder(entries);

        const labels = sorted.map((entry) => entry.time_of_upload);
        const temps = sorted.map((entry) => entry.temperature);
        const moistures = sorted.map((entry) => entry.moisture);

        setTimeLabels(labels);
        setTempData(temps);
        setMoistureData(moistures);
      }
    } catch (error) {
      console.error("Error fetching sensor data history:", error);
    }
  };

  useEffect(() => {
    fetchSensorHistory(); // Initial fetch

    // Update every 24 hours
    const interval = setInterval(() => {
      fetchSensorHistory();
    }, 1000 * 60 * 60 * 24); // 24 hours

    return () => clearInterval(interval);
  }, []);

  const chartoptions = {
    series: [
      {
        name: "Air Temperature (°C)",
        data: tempData,
      },
      {
        name: "Soil Moisture (%)",
        data: moistureData,
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
        borderColor: "rgba(0,0,0,0.1)",
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        categories: timeLabels,
        title: {
          text: "Hour of Day",
        },
      },
      yaxis: {
        title: {
          text: "Sensor Value",
        },
      },
      tooltip: {
        x: {
          show: true,
        },
      },
    },
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Sensor Data Overview</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          24-Hour Readings from Air & Soil Sensors
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        />
      </CardBody>
    </Card>
  );
};

export default SensorChart;
