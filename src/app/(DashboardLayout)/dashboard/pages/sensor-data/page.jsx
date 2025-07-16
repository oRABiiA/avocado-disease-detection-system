"use client";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import dynamic from "next/dynamic";
import useMqtt from "@/app/hooks/useMqtt";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SensorData = () => {
  const { temperature, soil_moisture } = useMqtt();

  const [tempHistory, setTempHistory] = useState(Array(24).fill(null));
  const [moistureHistory, setMoistureHistory] = useState(Array(24).fill(null));
  const [timeLabels, setTimeLabels] = useState([]);

  // Update time labels every hour
  useEffect(() => {
    const generateTimeLabels = () => {
      const now = new Date();
      const labels = [];
      for (let i = 23; i >= 0; i--) {
        const d = new Date(now);
        d.setHours(now.getHours() - i);
        labels.push(d.getHours() + ":00");
      }
      setTimeLabels(labels);
    };

    generateTimeLabels();
    const interval = setInterval(generateTimeLabels, 60 * 60 * 1000); // every hour
    return () => clearInterval(interval);
  }, []);

  // Push latest values to history
  useEffect(() => {
    if (temperature !== null) {
      setTempHistory((prev) => [...prev.slice(1), temperature]);
    }
    if (soil_moisture !== null) {
      setMoistureHistory((prev) => [...prev.slice(1), soil_moisture]);
    }
  }, [temperature, soil_moisture]);

  // const commonOptions = {
  //   chart: {
  //     type: "area",
  //     zoom: { enabled: false },
  //   },
  //   dataLabels: { enabled: false },
  //   stroke: {
  //     curve: "smooth",
  //     width: 2,
  //   },
  //   grid: {
  //     strokeDashArray: 3,
  //     borderColor: "rgba(0,0,0,0.1)",
  //   },
  //   xaxis: {
  //     categories: timeLabels,
  //     title: { text: "Hour of Day" },
  //   },
  //   tooltip: {
  //     x: { format: "HH:mm" },
  //   },
  // };

  const commonOptions = {
    chart: {
      type: "area",
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    grid: {
      strokeDashArray: 3,
      borderColor: "rgba(0,0,0,0.1)",
    },
    xaxis: {
      categories: timeLabels,
      labels: { show: false },       // 🔴 Hide X-axis labels
      title: { text: "", style: { display: "none" } }, // 🔴 Remove X-axis title
      axisTicks: { show: false },    // 🔴 Hide axis ticks
      axisBorder: { show: false },   // 🔴 Hide axis border
    },
    tooltip: {
      x: { show: false }, // Optional: disables tooltip x formatting
    },
  };

  const temperatureData = {
    series: [
      {
        name: "Air Temperature (°C)",
        data: tempHistory,
      },
    ],
    options: {
      ...commonOptions,
      yaxis: {
        title: { text: "Temperature (°C)" },
      },
    },
  };

  const moistureData = {
    series: [
      {
        name: "Soil Moisture (%)",
        data: moistureHistory,
      },
    ],
    options: {
      ...commonOptions,
      yaxis: {
        title: { text: "Moisture (%)" },
      },
    },
  };

  return (
    <>
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5">Air Temperature</CardTitle>
          <CardSubtitle className="text-muted mb-3" tag="h6">
            Live Air Temperature Sensor Data - Section A
          </CardSubtitle>
          <Chart
            type="area"
            width="100%"
            height="350"
            options={temperatureData.options}
            series={temperatureData.series}
          />
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <CardTitle tag="h5">Soil Moisture</CardTitle>
          <CardSubtitle className="text-muted mb-3" tag="h6">
            Live Soil Moisture Sensor Data - Section A
          </CardSubtitle>
          <Chart
            type="area"
            width="100%"
            height="350"
            options={moistureData.options}
            series={moistureData.series}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default SensorData;