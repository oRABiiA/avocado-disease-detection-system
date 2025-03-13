'use client'

import styles from "./links.module.css";
import NavLink from "@/components/navbar/links/navLink/NavLink";
import {useState} from "react";
import Image from "next/image";

const links = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Features",
        path: "/features",
    },
    {
        title: "Contact",
        path: "/contact",
    },
    {
        title: "About",
        path: "/about",
    },
]

const Links = () => {
    const [open, setOpen] = useState(false);

    // TEMPORARY
    const session = false;

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map((link => (
                    <NavLink item={link} key={link.title}></NavLink>
                )))}
                {session ? (
                    <button className={styles.logout}>Logout</button>
                ) : (
                    <NavLink item={{title: "Login", path: "/login"}}/>
                )}
            </div>
            <Image
                className={styles.menuButton}
                src="/menu.png"
                alt=""
                width={30}
                height={30}
                onClick={() => setOpen((prev) => !prev)}
            />
            {open && (
                <div className={styles.mobileLinks}>
                    {links.map((link) => (
                        <NavLink item={link} key={link.title} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Links;