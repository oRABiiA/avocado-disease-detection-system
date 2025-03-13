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

// const Links = () => {
//     const [open, setOpen] = useState(false);
//
//     return (
//         <div className={styles.container}>
//             <div className={styles.links}>
//                 {links.map((link => (
//                     <NavLink item={link} key={link.title}></NavLink>
//                 )))}
//                 {<NavLink item={{title: "Login", path: "/login"}}/>}
//             </div>
//             <Image
//                 className={styles.menuButton}
//                 src="/menu.png"
//                 alt=""
//                 width={30}
//                 height={30}
//                 onClick={() => setOpen((prev) => !prev)}
//             />
//             {open && (
//                 <div className={`${styles.mobileLinks} ${open ? styles.show : ""}`}>
//                     {links.map((link) => (
//                         <NavLink item={link} key={link.title}/>
//                     ))}
//                     {<NavLink item={{title: "Login", path: "/login"}}/>}
//                 </div>
//             )}
//         </div>
//     );
// };

const Links = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.container}>
            {/* Desktop Links */}
            <div className={styles.links}>
                {links.map((link) => (
                    <NavLink item={link} key={link.title} />
                ))}
                <NavLink item={{ title: "Login", path: "/login" }} />
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
                <NavLink item={{ title: "Login", path: "/login" }} />
            </div>}
        </div>
    );
};

export default Links;



