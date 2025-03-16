import Image from "next/image";
import styles from "./features.module.css";
import Slideshow from "@/app/features/features-slideshow/Slideshow";
import Navbar from "@/components/navbar/Navbar";

const features = [
    {
        icon: "/icons/realtime_icon.png",
        title: "Real-Time Environmental Monitoring",
        description: "Track soil moisture, air humidity, temperature, and leaf conditions with our IoT sensors.",
    },
    {
        icon: "/icons/ai_icon.png",
        title: "AI-Powered Disease Detection",
        description: "Using image processing and machine learning, we detect diseases before they spread.",
    },
    {
        icon: "/icons/smart_alert_icon.png",
        title: "Smart Alerts & Notifications",
        description: "Get real-time alerts for disease detection, climate anomalies, and recommended actions.",
    },
    {
        icon: "/icons/analytic_icon.png",
        title: "Interactive Dashboard for Insights",
        description: "Visualize sensor data, historical trends, and receive AI-driven reports.",
    },
    {
        icon: "/icons/cloud_icon.png",
        title: "Seamless Cloud Integration",
        description: "Access your farm data anytime, anywhere, with secure cloud storage and multi-user access.",
    },
    {
        icon: "/icons/sustainable_icon.png",
        title: "Sustainable & Cost-Effective Agriculture",
        description: "Optimize resource use, reduce chemical application, and improve yield through smart analytics.",
    },
];

export const metadata = {
    title: "Features",
    description: "Features of AgriTech",
};


const FeaturesPage = () => {
    return (
        <>
            <Navbar/>
            <div className={styles.container}>
                <h1 className={styles.title}>Our Features</h1>
                <Slideshow/>
                <p className={styles.subtitle}><i>Empowering Smart Agriculture with Cutting-Edge Technology.</i></p>
                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureCard}>
                            <Image src={feature.icon} alt={feature.title} width={50} height={50}/>
                            <h2>{feature.title}</h2>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FeaturesPage;
