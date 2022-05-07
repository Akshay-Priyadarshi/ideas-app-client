import { Form, Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import styles from "./LoginForm.module.css";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    ServerErrorResponse,
    ServerSuccessResponse,
} from "../../customs/server";
import { Toaster } from "react-hot-toast";
import { errorToast, successToast } from "../../helpers/toast.helper";
import useAuth from "../../hooks/useAuth";
import { LoginResponse } from "../../customs/response";

const LoginForm = () => {
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        const res = await axios.post("/auth/login", {
            email,
            password,
        });
        if (res instanceof ServerSuccessResponse) {
            successToast(res.message as string);
            loginUser({
                accessToken: res.data.token,
                loggedInUserId: res.data.loggedInUserId,
            } as LoginResponse);
            navigate("/dashboard");
        }
        if (Array.isArray(res)) {
            res.forEach((err: ServerErrorResponse) => {
                errorToast(err.msg);
            });
        }
    };

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Min 8 characters required")
            .max(200, "Max 200 characters only")
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: loginSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            handleLogin(values.email, values.password);
            resetForm();
            setSubmitting(false);
        },
    });

    return (
        <>
            <FormikProvider value={formik}>
                <Form
                    className={styles.loginForm}
                    onSubmit={formik.handleSubmit}
                >
                    <div className={styles.formControl}>
                        <label className={styles.formLabel} htmlFor="email">
                            Email
                        </label>
                        <Field
                            className={styles.formField}
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        <ErrorMessage
                            name="email"
                            render={(msg: string) => (
                                <p className={styles.formError}>{msg}</p>
                            )}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label className={styles.formLabel} htmlFor="password">
                            Password
                        </label>
                        <Field
                            className={styles.formField}
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <ErrorMessage
                            name="password"
                            render={(msg: string) => (
                                <p className={styles.formError}>{msg}</p>
                            )}
                        />
                    </div>
                    <button
                        className={styles.submitBtn}
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid}
                    >
                        Login
                    </button>
                    <Link to={"/"}>
                        <p className={styles.helperLink}>Forgot password?</p>
                    </Link>
                    <Link to={"/signup"}>
                        <p>Don't have an account? Create now.</p>
                    </Link>
                </Form>
            </FormikProvider>
            <Toaster />
        </>
    );
};

export default LoginForm;
