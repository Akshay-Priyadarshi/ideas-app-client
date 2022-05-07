import React, { HTMLAttributes, HTMLProps, ReactChild, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "./IconLink.module.css";

export interface IIconLinkProps {
    text: string;
    link: string;
    activeIcon?: ReactChild;
    icon: ReactChild;
}

const IconLink: React.FC<IIconLinkProps> = ({
    icon,
    link,
    text,
    activeIcon,
}) => {
    let resolved = useResolvedPath(link);
    let match = useMatch({ path: resolved.pathname, end: true });
    // const [isActive, setIsActive] = useState(false);

    return (
        <Link to={link}>
            <div className={styles.navLink}>
                <span className={styles.navIcon} hidden={match !== null}>
                    {icon}
                </span>
                <span className={styles.navIcon} hidden={match === null}>
                    {activeIcon}
                </span>
                <p>{text}</p>
            </div>
        </Link>
    );
};

export default IconLink;