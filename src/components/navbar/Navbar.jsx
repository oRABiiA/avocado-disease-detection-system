import Links from "./links/Links";
import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";
import AppIcon from "../../../public/AppIcon.png"


const NavBar = () => {
    return (
        <div className={styles.container}>
            <Link href="/"><Image className={styles.logo} src={AppIcon} alt="App Logo"/></Link>
            <div><Links/></div>
        </div>
    );
}

export default NavBar;