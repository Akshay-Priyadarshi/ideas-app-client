import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import cn from "classnames";
import logo from "../../assets/logo/logo-svg.svg";
import { HiMenuAlt3 as MenuIcon } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";

const Header = () => {
    const { loginData, logoutUser } = useAuth();

    return (
        <div className={styles.headerOuter}>
            <div className={styles.header}>
                <Link to="/">
                    <img className={styles.logo} src={logo} alt="logo" />
                </Link>
                <nav className={styles.navBar}>
                    <p className={cn([styles.navLink])}>
                        <Link to="/">Home</Link>
                    </p>
                    {loginData !== undefined ? (
                        <>
                            <p className={cn([styles.navLink])}>
                                <Link to="/dashboard">Dashboard</Link>
                            </p>
                            <p
                                className={cn([
                                    styles.navLink,
                                    styles.circularOutline,
                                ])}
                                onClick={logoutUser}
                            >
                                Logout
                            </p>
                        </>
                    ) : (
                        <>
                            <p
                                className={cn([
                                    styles.navLink,
                                    styles.circularOutline,
                                ])}
                            >
                                <Link to="/login">Login</Link>
                            </p>
                            <p
                                className={cn([
                                    styles.navLink,
                                    styles.circularOutline,
                                ])}
                            >
                                <Link to="/signup">Signup</Link>
                            </p>
                        </>
                    )}
                </nav>
                <MenuIcon className={styles.menuIcon} color="#08289C" />
            </div>
        </div>
    );
};

export default Header;
