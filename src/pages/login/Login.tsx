import PageLayout from "../../components/page-layout/PageLayout";
import LoginForm from "../../forms/login-form/LoginForm";
import loginImg from "../../assets/login-img.svg";
import styles from "./Login.module.css";

const Login = () => {
    return (
        <PageLayout>
            <div className={styles.loginPage}>
                <div className={styles.left}>
                    <LoginForm />
                </div>
                <div className={styles.right}>
                    <img
                        className={styles.loginImg}
                        src={loginImg}
                        alt="login-img"
                    />
                </div>
            </div>
        </PageLayout>
    );
};

export default Login;
