import Image from "next/image";
import styles from "./about.module.css";
import verifiedLogo from "../../../public/icons/verified.svg"
import ShowImage from "@/components/ShowImage/ShowImage.jsx"
import sustainIcon from "../../../public/icons/sustain_icon.png"
import farmerIcon from "../../../public/icons/farmer_icon.png"
import chartIcon from "../../../public/icons/chart_icon.png"

export const metadata = {
    title: "About",
    description: "About AgriTech",
};

const AboutPage = () => {
    return (
        <div className={styles.container}>
            {/* Text Section */}
            <div className={styles.textContainer}>
                <h2 className={styles.subtitle}>About AgriTech</h2>
                <h1 className={styles.title}>
                    Innovating Agriculture with <span className={styles.highlight}>Smarter</span>,
                    <span className={styles.highlight}> Faster</span>, and
                    <span className={styles.highlight}> More Sustainable</span> Solutions.
                </h1>

                <h2 className={styles.sectionTitle}>What We Do</h2>
                <p>
                    We have developed an <strong>Early Detection System for Avocado Tree Diseases</strong>, integrating:
                </p>
                <ul className={styles.featureList}>
                    <li><ShowImage imgPath = {verifiedLogo} imgAlt="VerifiedLogo" imgWidth={18} imgHeight={18}/> <strong>Smart Sensors</strong> – Monitoring soil moisture, humidity, and environmental conditions.</li>
                    <li><ShowImage imgPath = {verifiedLogo} imgAlt="VerifiedLogo" imgWidth={18} imgHeight={18}/> <strong>AI-Powered Image Analysis</strong> – Detecting signs of disease before they spread.</li>
                    <li><ShowImage imgPath = {verifiedLogo} imgAlt="VerifiedLogo" imgWidth={18} imgHeight={18}/> <strong>Real-Time Alerts</strong> – Helping farmers take immediate action.</li>
                    <li><ShowImage imgPath = {verifiedLogo} imgAlt="VerifiedLogo" imgWidth={18} imgHeight={18}/> <strong>User-Friendly Dashboard</strong> – Visualizing data for informed decision-making.</li>
                </ul>

                <h2 className={styles.sectionTitle}>Why It Matters</h2>
                <ul className={styles.impactList}>
                    <li><ShowImage imgPath = {sustainIcon} imgAlt="VerifiedLogo" imgWidth={24} imgHeight={24}/> <strong>Sustainability</strong> – Reducing chemical usage and preserving natural ecosystems.</li>
                    <li><ShowImage imgPath = {chartIcon} imgAlt="VerifiedLogo" imgWidth={24} imgHeight={24}/> <strong>Efficiency</strong> – Saving time and costs by automating disease detection.</li>
                    <li><ShowImage imgPath = {farmerIcon} imgAlt="VerifiedLogo" imgWidth={24} imgHeight={24}/> <strong>Farmer Empowerment</strong> – Providing actionable insights for smarter farming.</li>
                </ul>

                <h2 className={styles.sectionTitle}>Our Vision</h2>
                <p>
                    We believe in a future where <strong>technology and agriculture work together</strong>, ensuring
                    <strong> healthier crops</strong>, <strong> higher yields</strong>, and a more <strong>sustainable</strong> farming industry.
                    Join us in shaping the <strong>future of precision agriculture</strong>!
                </p>
            </div>

            {/* Image Section */}
            <div className={styles.imgContainer}>
                <Image
                    src="/about.png"
                    alt="About AgriTech"
                    width={500}
                    height={350}
                    className={styles.img}
                />
            </div>
        </div>
    );
};

export default AboutPage;
