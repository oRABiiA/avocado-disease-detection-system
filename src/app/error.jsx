"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.css";

const Error = ({ error, reset }) => {
    useEffect(() => {
        console.error("Error: ", error);
    }, [error]);

    return (
        <div className={styles['error-container']}>
            <h1 className={styles['error-title']}>Oops! Something went wrong.</h1>
            <p className={styles['error-message']}>{error?.message || "An unexpected error occurred."}</p>
            {/*<button className={styles['error-button']} onClick={() => reset()}>Try Again</button>*/}
            <Link href="/" className={styles['error-link']}><button className={styles['error-button']}>Go Back Home</button></Link>
        </div>
    );
};

export default Error;
