import React from "react";
import styles from "./Home.module.css";
import PageLayout from "../../components/layout/PageLayout";

const Home: React.FC = () => {
    return (
        <PageLayout>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>
                    Welcome to Node React Client
                </h1>
            </section>
        </PageLayout>
    );
};

export default Home;
