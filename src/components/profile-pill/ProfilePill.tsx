import React from "react";
import { HiChevronDoubleDown } from "react-icons/hi";
import styles from "./ProfilePill.module.css";

interface IProfilePillProps {
    name: string;
    dpLink: string;
}

const ProfilePill: React.FC<IProfilePillProps> = ({ name, dpLink }) => {
    return (
        <div className={styles.profilePill}>
            <div className={styles.dpBg}>
                <img className={styles.dp} src={dpLink} alt="Display Pic" />
            </div>
            <p className={styles.name}>{name}</p>
            <span className={styles.iconContainer}>
                <HiChevronDoubleDown className={styles.icon} />
            </span>
        </div>
    );
};

export default ProfilePill;
