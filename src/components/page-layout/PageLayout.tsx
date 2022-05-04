import React from "react";
import styles from "./PageLayout.module.css";
import { IChildren } from "../../customs/types";
import Header from "../header/Header";

export interface IPageLayoutProps extends IChildren {}

const PageLayout: React.FunctionComponent<IPageLayoutProps> = ({
    children,
}) => {
    return (
        <div className={styles.pageLayout}>
            <Header />
            <div className={styles.pageContent}>{children}</div>
        </div>
    );
};

export default PageLayout;
