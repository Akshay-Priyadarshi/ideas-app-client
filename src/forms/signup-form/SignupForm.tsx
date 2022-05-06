import React from "react";
import styles from "./SignupForm.module.css";
import * as Yup from "yup";
import { useFormik, FormikProvider, Field, ErrorMessage, Form } from "formik";
import { Link } from "react-router-dom";

const SignupForm = () => {
    const signupSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Min 8 characters required")
            .max(200, "Max 200 characters only")
            .required("Password is required"),
        confirmPassword: Yup.string().test(
            "password-match",
            () => "Passwords don't match",
            (value, ctx) => value === ctx.parent.password
        ),
    });

    const formik = useFormik({
        initialValues: { email: "", password: "", confirmPassword: "" },
        validationSchema: signupSchema,
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
            <Form className={styles.signupForm} onSubmit={formik.handleSubmit}>
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
                <div className={styles.formControl}>
                    <label
                        className={styles.formLabel}
                        htmlFor="confirmPassword"
                    >
                        Confirm Password
                    </label>
                    <Field
                        className={styles.formField}
                        type="password"
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                    />
                    <ErrorMessage
                        name="confirmPassword"
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
                    Signup
                </button>
                <Link to={"/login"}>
                    <p className={styles.formHelper}>
                        Already signed up? Login.
                    </p>
                </Link>
            </Form>
        </FormikProvider>
    );
};

export default SignupForm;