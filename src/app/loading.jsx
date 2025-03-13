'use client'

import styles from "./loading.module.css";
import Image from "next/image";
import loadingGif from "../../public/loading.gif"

const Loading = () => {
    return (
        <div className={styles['loading-overlay']}>
            <Image src={loadingGif} alt="Loading..." className={styles['loading-image']} />
        </div>
    );
};

export default Loading;
