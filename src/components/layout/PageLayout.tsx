import React from "react";
import styles from "./PageLayout.module.css";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { IChildren } from "../../customs/types";

export interface IPageLayoutProps extends IChildren {}

const PageLayout: React.FunctionComponent<IPageLayoutProps> = ({
    children,
}) => {
    return (
        <div className={styles.pageLayout}>
            <Header />
            <div className={styles.pageContent}>{children}</div>
            <Footer />
        </div>
    );
};

export default PageLayout;
