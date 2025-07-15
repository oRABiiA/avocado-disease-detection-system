'use client'
import { Col, Row } from "reactstrap";
import SensorChart from "@/app/(DashboardLayout)/dashboard/components/SensorChart";
import Tasks from "@/app/(DashboardLayout)/dashboard/components/Tasks";
import ProjectTables from "@/app/(DashboardLayout)/dashboard/components/ProjectTable";
import TopCards from "@/app/(DashboardLayout)/dashboard/components/TopCards";
import Blog from "@/app/(DashboardLayout)/dashboard/components/Blog";
import bg1 from "public/images/bg/bg1.jpg";
import bg2 from "public/images/bg/bg2.jpg";
import bg3 from "public/images/bg/bg3.jpg";
import bg4 from "public/images/bg/bg4.jpg";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAlert } from "../../../context/AlertContext";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import useMqtt from "@/app/hooks/useMqtt";

// firebase imports
import { get, ref, child } from "firebase/database";
import {database} from "@/lib/firebaseConfig"



export default function Dashboard() {

  const { addAlert } = useAlert();
  const [user, setUser] = useState(null);
  const [redirectState, setRedirectState] = useState(false); // Added loading state
  const router = useRouter();
  const hasAlertedRef = useRef(false);
  const { temperature, soil_moisture } = useMqtt();

  const [aiData, setAiData] = useState({ Healthy: "", Tip1: "", Tip2: "", Tip3: "" });
  const [healthyStatus, setHealthyStatus] = useState("Undefined");

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (!userData) {
      // Redirect to login if no user data is found
      router.push("/login");
    } else {
      setRedirectState(true);
      setUser(JSON.parse(userData)); // Set user data to state
    }
  }, [router]);

  useEffect(() => {
    const fetchAIResponse = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "AI_response"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setAiData(data);
          if(data.Healthy === "YES"){
            setHealthyStatus("Healthy");
          }
          else{
            setHealthyStatus("Unhealthy");
          }
        } else {
          console.log("No data available at AI_response");
        }
      } catch (error) {
        console.error("Error fetching AI_response:", error);
      }
    };
    fetchAIResponse();
  }, []);

  useEffect(() => {

    // Only check when values are valid
    if(temperature === null) return;

    if (temperature < 15 || temperature > 30) {
      addAlert("🚨 Air temperature is outside the optimal range!");
    }
  }, [temperature]);

  useEffect(() => {

    // Only check when values are valid
    if(soil_moisture === null) return;

    if (soil_moisture < 500) {
      addAlert("🚨 Soil moisture is too low!");
    }
  }, [soil_moisture]);

  // useEffect(() => {

  //   // Only check when values are valid
  //   if(healthyStatus === "Undefined") return;

  //   if (healthyStatus !== "Healthy") {
  //     addAlert("🚨 The tree is not healthy!");
  //   }
  // }, [healthyStatus]);

  useEffect(() => {
    if (healthyStatus === "Undefined" || hasAlertedRef.current) return;

    if (healthyStatus !== "Healthy") {
      const tips = [aiData.Tip1, aiData.Tip2, aiData.Tip3].filter(Boolean); // remove null/empty tips

      addAlert(
      <div>
        <strong>🚨 The tree is not healthy!</strong>
        <div className="mt-2">
          <p className="mb-1">🌿 Tips to help:</p>
          <ul className="mb-0 ps-3">
            {tips.map((tip, i) => (
              <li key={i}>👉 {tip}</li>
            ))}
          </ul>
        </div>
      </div>
      );

      hasAlertedRef.current = true;
    }
  }, [healthyStatus]);

  useEffect(() => {
    if (healthyStatus === "Healthy") {
      hasAlertedRef.current = false;
    }
  }, [healthyStatus]);

  const BlogData = [
    {
      image: bg1,
      title: "🌿 Tip 1: Watering Wisely",
      description:
        "Avocado trees prefer deep, infrequent watering. Ensure the soil drains well and water only when the top 2-3 inches of soil are dry.",
      btnbg: "primary",
    },
    {
      image: bg2,
      title: "🌞 Tip 2: Sunlight & Temperature",
      description:
        "Plant in a location with full sun (at least 6 hours a day). Avocados thrive between 18°C and 27°C and should be protected from frost.",
      btnbg: "primary",
    },
    {
      image: bg3,
      title: "🌱 Tip 3: Healthy Soil & Fertilizing",
      description:
        "Use well-drained, slightly acidic soil. Fertilize with a balanced fertilizer rich in nitrogen during the growing season.",
      btnbg: "primary",
    },
    {
      image: bg4,
      title: "🌿 Tip 4: Mulching for Moisture",
      description:
        "Apply a thick layer of mulch around the base of the tree (but not touching the trunk) to retain soil moisture, regulate temperature, and reduce weed growth.",
      btnbg: "primary",
    }
  ];

  return ( redirectState && 
  <div>
    {/***Top Cards***/}
    <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="air-temp"
            subtitle="Air Temperature"
            earning={temperature !== null ? `${temperature.toFixed(1)}°` : "Loading..."}
            icon="bi bi-wind"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="soil-temp"
            subtitle="Soil Temperature"
            earning={soil_moisture !== null ? `${soil_moisture.toFixed(1)}°` : "Loading..."}
            icon="bi bi-tree"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="health"
            subtitle="Tree No.A12"
            earning={healthyStatus || "Loading..."}
            icon="bi bi-bandaid"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="next-check"
            subtitle="Next Schedule Check"
            earning="25.5.2025"
            icon="bi bi-calendar-check"
          />
        </Col>
    </Row>
    {/* 🔔 Add Alert Button Here */}
    {/* <Row className="my-3">
      <Col>
        <button
          className="btn btn-danger"
          onClick={() => addAlert("🚨 Sensor temperature is too high!")}
        >
          Trigger Test Alert
        </button>
      </Col>
    </Row> */}
    {/***Sales & Feed***/}
    <Row>
      <Col sm="12" lg="6" xl="7" xxl="8">
        <SensorChart />
      </Col>
      <Col sm="12" lg="6" xl="5" xxl="4">
        <Tasks />
      </Col>
    </Row>
    {/***Table ***/}
    <Row>
      <Col lg="12" sm="12">
        <ProjectTables />
      </Col>
    </Row>
    {/*** Tip of the Day Section ***/}
    <Row className="my-4">
      <Col lg="12">
        <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded shadow-sm">
          <h5 className="mb-0 fw-semibold text-dark bi bi-cl">
            💡 Tip of the Day
          </h5>
        </div>
      </Col>
    </Row>
    {/***Blog Cards***/}
    <Row>
      {BlogData.map((blg) => (
        <Col sm="6" lg="6" xl="3" key={blg.title}>
          <Blog
            image={blg.image}
            title={blg.title}
            subtitle={blg.subtitle}
            text={blg.description}
            color={blg.btnbg}
          />
        </Col>
      ))}
    </Row>
  </div>);
}
