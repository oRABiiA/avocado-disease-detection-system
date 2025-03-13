import Image from "next/image";
import styles from "./features.module.css";

const features = [
    {
        icon: "/icons/farmer_icon.png",
        title: "Real-Time Environmental Monitoring",
        description: "Track soil moisture, air humidity, temperature, and leaf conditions with our IoT sensors.",
    },
    {
        icon: "/icons/farmer_icon.png",
        title: "AI-Powered Disease Detection",
        description: "Using image processing and machine learning, we detect diseases before they spread.",
    },
    {
        icon: "/icons/farmer_icon.png",
        title: "Smart Alerts & Notifications",
        description: "Get real-time alerts for disease detection, climate anomalies, and recommended actions.",
    },
    {
        icon: "/icons/farmer_icon.png",
        title: "Interactive Dashboard for Insights",
        description: "Visualize sensor data, historical trends, and receive AI-driven reports.",
    },
    {
        icon: "/icons/farmer_icon.png",
        title: "Seamless Cloud Integration",
        description: "Access your farm data anytime, anywhere, with secure cloud storage and multi-user access.",
    },
    {
        icon: "/icons/farmer_icon.png",
        title: "Sustainable & Cost-Effective Agriculture",
        description: "Optimize resource use, reduce chemical application, and improve yield through smart analytics.",
    },
];

const FeaturesPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Our Features</h1>
            <p className={styles.subtitle}>Empowering Smart Agriculture with Cutting-Edge Technology.</p>
            <div className={styles.featuresGrid}>
                {features.map((feature, index) => (
                    <div key={index} className={styles.featureCard}>
                        <Image src={feature.icon} alt={feature.title} width={50} height={50} />
                        <h2>{feature.title}</h2>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesPage;
