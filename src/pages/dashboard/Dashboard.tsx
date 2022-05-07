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
import ProfilePill from "../../components/profile-pill/ProfilePill";

const Dashboard = () => {
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
                </nav>
            </section>
            <section className={styles.right}>
                <section className={styles.rightHeader}>
                    <ProfilePill
                        name="Akshay Priyadarshi"
                        dpLink="https://robohash.org/12"
                    />
                </section>
                <Outlet />
            </section>
        </div>
    );
};

export default Dashboard;
