import Links from "./links/Links";
import Link from "next/link";
import styles from "./dashboardNavbar.module.css";
import Image from "next/image";
import AppIcon from "../../../../public/AppIcon.png"


const DashboardNavBar = () => {
    return (
        <div className={styles.container}>
            <Link href="/dashboard" className={styles.logoTxt}><Image className={styles.logo} src={AppIcon} alt="App Logo"/></Link>
            <div><Links/></div>
        </div>
    );
}

export default DashboardNavBar;