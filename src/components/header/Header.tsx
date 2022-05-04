import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import cn from "classnames";
import logo from "../../assets/logo/logo-svg.svg";

const Header = () => {
    return (
        <div className={styles.headerOuter}>
            <div className={styles.header}>
                <Link to="/">
                    <img className={styles.logo} src={logo} alt="logo" />
                </Link>
                <nav className={styles.navBar}>
                    <Link className={cn([styles.navLink])} to="/">
                        Home
                    </Link>
                    <Link
                        className={cn([styles.navLink, styles.circularOutline])}
                        to="/login"
                    >
                        Login
                    </Link>
                    <Link
                        className={cn([styles.navLink, styles.circularOutline])}
                        to="/signup"
                    >
                        Signup
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Header;
