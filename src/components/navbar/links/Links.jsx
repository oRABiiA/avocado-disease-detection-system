
import styles from "./links.module.css";
import NavLink from "@/components/navbar/links/navLink/navLink";

const Links = () => {

    const links = [
        {
            title: "Homepage",
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

    // TEMPORARY
    const session = true;

    return (
        <div className={styles.links}>
            {links.map((link=>(
                <NavLink item={link} key={link.title}></NavLink>
            )))}
            {session ? (
                <button className={styles.logout}>Logout</button>
            ) : (
                <NavLink item={{title: "Login", path: "/login"}}/>
            )}
        </div>
    );
}

export default Links;