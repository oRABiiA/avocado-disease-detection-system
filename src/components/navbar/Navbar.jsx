import Links from "./links/Links";
import styles from "./navbar.module.css";
import Image from "next/image";
import AppIcon from "../../../public/AppIcon.png"

const NavBar = () => {
    return (
        <div className={styles.container}>
            <Image className={styles.logo} src={AppIcon} alt="App Logo" />
            <div><Links /></div>
        </div>
    );
}

export default NavBar;