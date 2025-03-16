"use client";

import React from "react";
import styles from "./login.module.css";
import Image from "next/image";
import {useRouter} from "next/navigation";
import Navbar from "@/components/navbar/Navbar";

function Login() {
    const router = useRouter();

    const navigateTo = (page) => {
        router.push(page);
    };

    return (
        <>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.row}>

                    {/* Left Section */}
                    <div className={styles.colLeft}>
                        <Image
                            src="/loginHero.gif"
                            alt="Man riding motorbike"
                            width={700}
                            height={700}
                            className={styles.heroImage}
                        />
                    </div>

                    {/* Right Section - Login Form */}
                    <div className={styles.colRight}>
                        <div className={styles.card}>
                            <div className={styles.cardBody}>

                                {/* App Icon and Title */}
                                <div className={styles.inputGroup}>
                                    <Image
                                        src="/AppIcon.png"
                                        alt="App Icon"
                                        width={50}
                                        height={50}
                                    />
                                    <h2 className={styles.title}>Login</h2>
                                </div>

                                {/* Form Inputs */}
                                <input className={styles.inputField} placeholder="User ID" type="text"/>
                                <input className={styles.inputField} placeholder="Password" type="password"/>

                                {/* Help Section */}
                                <div className={styles.helpSection}>
                                    <label className={styles.helpText} htmlFor="help">Need Help?</label>
                                    <button className={styles.linkButton} onClick={() => navigateTo("/contact")}>
                                        Contact Us
                                    </button>
                                </div>

                                {/* Sign In Button */}
                                <button className={styles.btnPrimary} onClick={() => navigateTo("/dashboard")}>Sign In</button>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Login;
