import styles from "./footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>AgriTech</div>
            <div className={styles.text}>
                Avocado Tree Detection System © All rights reserved.
            </div>
        </div>
    );
};

export default Footer;