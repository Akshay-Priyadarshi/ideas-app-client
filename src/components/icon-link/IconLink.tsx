import React, { ReactChild } from "react";
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
                <span className={styles.navIcon}>
                    {match !== null ? activeIcon : icon}
                </span>
                <p>{text}</p>
            </div>
        </Link>
    );
};

export default IconLink;
