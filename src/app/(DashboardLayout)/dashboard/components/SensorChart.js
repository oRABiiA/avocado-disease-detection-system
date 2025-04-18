import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SensorChart = () => {
  const chartoptions = {
    series: [
      {
        name: "Air Temperature (°C)",
        data: [16, 15, 15, 14, 14, 15, 18, 21, 24, 26, 28, 29, 30, 31, 30, 29, 27, 25, 22, 20, 19, 18, 17, 16],
      },
      {
        name: "Soil Moisture (%)",
        data: [45, 44, 44, 43, 42, 42, 41, 40, 39, 38, 37, 37, 36, 36, 37, 38, 39, 40, 42, 43, 44, 45, 45, 45],
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
        categories: [
          "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM",
          "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
          "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
          "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
        ],
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
          format: "HH:mm"
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

