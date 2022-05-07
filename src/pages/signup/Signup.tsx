import PageLayout from "../../components/page-layout/PageLayout";
import SignupForm from "../../forms/signup-form/SignupForm";
import styles from "./Signup.module.css";
import signupImg from "../../assets/signup-img.svg";

const Signup = () => {
    return (
        <PageLayout>
            <div className={styles.signupPage}>
                <div className={styles.left}>
                    <SignupForm />
                </div>
                <div className={styles.right}>
                    <img
                        className={styles.signupImg}
                        src={signupImg}
                        alt="signup-img"
                    />
                </div>
            </div>
        </PageLayout>
    );
};

export default Signup;
