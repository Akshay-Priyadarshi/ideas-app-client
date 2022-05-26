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
import { RiSearchLine, RiSearchFill } from "react-icons/ri";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import DisplayName from "../../components/display-name/DisplayName";
import { MdCreate, MdOutlineCreate } from "react-icons/md";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
    const { logoutUser, loginData } = useAuth();
    const { loggedInUser } = useLoggedInUser(loginData?.loggedInUserId);
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
                    <div className={styles.navLink}>
                        <IconLink
                            text="Search"
                            link="/dashboard/search"
                            icon={<RiSearchLine />}
                            activeIcon={<RiSearchFill />}
                        />
                    </div>
                    <div className={styles.navLink}>
                        <IconLink
                            text="Create"
                            link="/dashboard/create"
                            icon={<MdOutlineCreate />}
                            activeIcon={<MdCreate />}
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
                        <div className={styles.dp}>
                            <Dp profile={loggedInUser?.profile} />
                        </div>
                        <p className={styles.name}>
                            <DisplayName profile={loggedInUser?.profile} />
                        </p>
                        <span className={styles.iconContainer}>
                            <HiChevronDoubleDown className={styles.icon} />
                        </span>
                    </div>
                </section>
                <section className={styles.dynamicContent}>
                    <Outlet />
                    <Toaster />
                </section>
            </section>
        </div>
    );
};

export default Dashboard;
