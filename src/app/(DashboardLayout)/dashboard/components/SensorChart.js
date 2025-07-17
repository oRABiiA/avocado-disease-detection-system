"use client";
import { useEffect, useState } from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";
import { getDatabase, ref, onValue, get} from "firebase/database";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SensorChart = () => {
  const [tempData, setTempData] = useState([]);
  const [moistureData, setMoistureData] = useState([]);

  // Hour labels for 24 hours
  const timeLabels = [
    "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM",
    "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
    "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
  ];

    // Fetch data from Firebase every hour
  useEffect(() => {
    const db = getDatabase();
    const sensorRef = ref(db, "sensor_data");

    const fetchData = async () => {
      try {
        const snapshot = await get(sensorRef);
        const data = snapshot.val();
        if (data) {
          // const maxMoisture = 4000; // Adjust based on your sensor range

          const moistureArray = Object.values(data.soil_moisture || {});
          const temperatureArray = Object.values(data.temperature || {});

          // const moisturePercentages = moistureArray.map((raw) =>
          //   Math.round((raw / maxMoisture) * 100)
          // );

          setTempData(temperatureArray);
          setMoistureData(moistureArray);
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData(); // initial fetch

    const interval = setInterval(() => {
      fetchData();
    }, 60 * 60 * 1000); // every hour

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
          24-Hour Readings from Air & Soil Sensors - Section A
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
