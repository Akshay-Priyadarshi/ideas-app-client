import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    useFormik,
    FormikProvider,
} from "formik";
import React from "react";
import styles from "./LoginForm.module.css";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const LoginForm = () => {
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
            console.log(values);
            // submit form
            setTimeout(() => {
                alert(JSON.stringify(values));
            }, 4000);
            resetForm();
            setSubmitting(false);
        },
    });

    return (
        <FormikProvider value={formik}>
            <Form className={styles.loginForm} onSubmit={formik.handleSubmit}>
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
    );
};

export default LoginForm;
