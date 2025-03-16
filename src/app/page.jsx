'use client'

import Image from "next/image";
import styles from "./home.module.css";
import verifiedLogo from "../../public/icons/verified.svg"
import {useRouter} from "next/navigation";
import ShowImage from "@/components/ShowImage/ShowImage.jsx"
import Navbar from "@/components/navbar/Navbar";

const Home = () => {

    const router = useRouter();

    const navigateTo = (page) => {
        router.push(page);
    };

    return (
        <>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>Innovation in <i>AgriTech</i>.</h1>
                    <p className={styles.desc}>
                        <strong>With AgriTech</strong>, we leverage IoT technology to protect avocado orchards.
                        Our system integrates smart sensors and AI-powered image analysis to detect diseases early,
                        helping farmers take timely action.
                        <br/>
                        <br/>
                        The future of agriculture is smart, and we're leading the way. Our project harnesses IoT sensors
                        and machine learning analysis to detect avocado tree diseases before they become a problem. With
                        real-time
                        insights and predictive monitoring, we empower farmers to grow healthier, more sustainable
                        crops.
                        <br/>
                        <br/>
                        <strong>Key Features:</strong>
                        <br/>
                        <br/><ShowImage imgPath={verifiedLogo} imgAlt="VerifiedLogo" imgWidth={18}
                                        imgHeight={18}/> Real-time monitoring of
                        tree health
                        <br/><ShowImage imgPath={verifiedLogo} imgAlt="VerifiedLogo" imgWidth={18}
                                        imgHeight={18}/> Smart sensors tracking
                        soil and air conditions
                        <br/><ShowImage imgPath={verifiedLogo} imgAlt="VerifiedLogo" imgWidth={18}
                                        imgHeight={18}/> AI-driven disease
                        detection
                        <br/><ShowImage imgPath={verifiedLogo} imgAlt="VerifiedLogo" imgWidth={18}
                                        imgHeight={18}/> User-friendly dashboard
                        for insights
                        <br/>
                        <br/>
                        <em>Join us in advancing precision agriculture for healthier avocado crops!</em>
                    </p>
                    <div className={styles.buttons}>
                        <button onClick={() => navigateTo("/about")} className={styles.button}>Learn More</button>
                        <button onClick={() => navigateTo("/contact")} className={styles.button}>Contact Us</button>
                    </div>
                </div>
                <div className={styles.imgContainer}>
                    <Image src="/hero.gif" alt="Homepage image man standing" fill unoptimized={true}/>
                </div>
            </div>
        </>
    );
};

export default Home;