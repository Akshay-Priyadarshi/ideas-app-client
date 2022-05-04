import React from "react";
import styles from "./Home.module.css";
import PageLayout from "../../components/page-layout/PageLayout";
import heroImg from "../../assets/hero-img.svg";

const Home: React.FC = () => {
    return (
        <PageLayout>
            <section className={styles.hero}>
                <div className={styles.left}>
                    <h1 className={styles.title}>
                        ideate.
                        <br />
                        validate.
                        <br />
                        innovate.
                        <br />
                    </h1>
                    <h3 className={styles.subTitle}>
                        Take the first step towards the
                        <br />
                        next multi-dollar ideas you have.
                    </h3>
                    <button className={styles.actionBtn}>Join now.</button>
                </div>
                <div className={styles.right}>
                    <img
                        className={styles.heroImg}
                        src={heroImg}
                        alt="heroImg"
                    />
                </div>
            </section>
        </PageLayout>
    );
};

export default Home;
