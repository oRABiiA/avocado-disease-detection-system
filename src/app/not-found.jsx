import Link from "next/link";
import styles from "./notfound.module.css";

const NotFound = () => {
    return (
        <div className={styles.container}>
            <img
                src="/not-found.png"
                alt="Not Found"
                className={styles.image}
            />
            <h2 className={styles.title}>Oops! Page Not Found</h2>
            <p className={styles.description}>
                Sorry, the page you are looking for does not exist.
            </p>
            <Link href="/" className={styles.button}>
                Back Home
            </Link>
        </div>
    );
};

export default NotFound;
