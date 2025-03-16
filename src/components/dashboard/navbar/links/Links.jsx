'use client'

import styles from "./links.module.css"
import NavLink from "./navLink/NavLink.jsx"
import {useState} from "react";
import Image from "next/image";

const links = [
    {
        title: "Dashboard",
        path: "/dashboard",
    },
    {
        title: "Calendar",
        path: "/calendar",
    },
    {
        title: "Alerts",
        path: "/alerts",
    },
    {
        title: "Generate",
        path: "/generate",
    },
    {
        title: "Settings",
        path: "/settings",
    },
    {
        title: "Help",
        path: "/help",
    },
]

const Links = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.container}>
            {/* Desktop Links */}
            <div className={styles.links}>
                {links.map((link) => (
                    <NavLink item={link} key={link.title} />
                ))}
                <NavLink item={{ title: "Logout", path: "/" }} />
            </div>

            {/* Mobile Menu Button */}
            <Image
                className={styles.menuButton}
                src="/menu.png"
                alt="Menu"
                width={30}
                height={30}
                onClick={() => setOpen((prev) => !prev)}
            />

            {/* Mobile Links */}
            {open && <div className={`${styles.mobileLinks} ${open ? styles.show : ""}`}>
                {links.map((link) => (
                    <NavLink item={link} key={link.title} />
                ))}
                <NavLink item={{ title: "Logout", path: "/" }} />
            </div>}
        </div>
    );
};

export default Links;



