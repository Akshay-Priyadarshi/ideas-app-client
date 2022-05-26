import { FunctionComponent } from "react";
import styles from "./PageLayout.module.css";
import Header from "../header/Header";
import { IChildren } from "../../customs/types";

export interface IProps extends IChildren {}

const PageLayout: FunctionComponent<IProps> = (props) => {
    return (
        <div className={styles.pageLayout}>
            <Header />
            <div className={styles.pageContent}>{props.children}</div>
        </div>
    );
};

export default PageLayout;
