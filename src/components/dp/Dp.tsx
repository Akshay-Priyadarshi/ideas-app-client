import React from "react";
import styles from "./Dp.module.css";
import { MdAccountCircle } from "react-icons/md";
import { Profile } from "../../models/profile.model";

interface IDpProps {
    profile: Profile | null | undefined;
}

const Dp: React.FC<IDpProps> = ({ profile }) => {
    return (
        <div className={styles.dpBg}>
            {profile ? (
                <img
                    className={styles.dp}
                    src={profile.avatarUrl}
                    alt="Display Pic"
                />
            ) : (
                <MdAccountCircle className={styles.unknownDp} />
            )}
        </div>
    );
};

export default Dp;
