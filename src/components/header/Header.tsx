import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className={styles.headerOuter}>
            <div className={styles.header}>
                <Link to="/">
                    <h1>LOGO</h1>
                </Link>
                <nav className={styles.navBar}>
                    <Link className={styles.navLink} to="/">
                        Home
                    </Link>
                    <Link className={styles.navLink} to="/login">
                        Login
                    </Link>
                    <Link className={styles.navLink} to="/signup">
                        Signup
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Header;
