import React from "react";
import styles from "./Dp.module.css";

interface IDpProps {
    dpLink: string;
}

const Dp: React.FC<IDpProps> = ({ dpLink }) => {
    return (
        <div className={styles.dpBg}>
            <img className={styles.dp} src={dpLink} alt="Display Pic" />
        </div>
    );
};

export default Dp;
