import React from "react";
import styles from "./Dashboard.module.css";
import logo from "../../assets/logo/long-logo.svg";
import { Outlet } from "react-router-dom";
import {
    AiFillHome,
    AiOutlineHome,
    AiFillHeart,
    AiOutlineHeart,
} from "react-icons/ai";
import IconLink from "../../components/icon-link/IconLink";
import useAuth from "../../hooks/useAuth";
import Dp from "../../components/dp/Dp";
import { HiChevronDoubleDown } from "react-icons/hi";
import useLoggedInUser from "../../hooks/useLoggedInUser";

const Dashboard = () => {
    const { logoutUser, loginData } = useAuth();
    const { loggedInUser } = useLoggedInUser(
        loginData?.loggedInUserId as string
    );

    return (
        <div className={styles.dashboard}>
            <section className={styles.left}>
                <img className={styles.logo} src={logo} alt={"logo"} />
                <nav className={styles.navBar}>
                    <div className={styles.navLink}>
                        <IconLink
                            text="Home"
                            link="/dashboard/"
                            icon={<AiOutlineHome />}
                            activeIcon={<AiFillHome />}
                        />
                    </div>
                    <div className={styles.navLink}>
                        <IconLink
                            text="Favourite"
                            link="/dashboard/favourite"
                            icon={<AiOutlineHeart />}
                            activeIcon={<AiFillHeart />}
                        />
                    </div>
                    <p className={styles.navLink} onClick={() => logoutUser()}>
                        Logout
                    </p>
                </nav>
            </section>
            <section className={styles.right}>
                <section className={styles.rightHeader}>
                    <div className={styles.profilePill}>
                        <Dp dpLink={""} />
                        <p className={styles.name}>{"Akshay"}</p>
                        <span className={styles.iconContainer}>
                            <HiChevronDoubleDown className={styles.icon} />
                        </span>
                    </div>
                </section>
                <section className={styles.dynamicContent}>
                    <Outlet />
                </section>
            </section>
        </div>
    );
};

export default Dashboard;
