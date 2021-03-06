import { Form, Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import styles from "./LoginForm.module.css";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ServerSuccessResponse } from "../../customs/server";
import { Toaster } from "react-hot-toast";
import { useMutation } from "react-query";
import useAuth from "../../hooks/useAuth";
import { successToast } from "../../helpers/toast.helper";
import { LoginResponse } from "../../customs/response";
import { errorMessagesHandler } from "../../helpers/error.helper";
import { loginApi, LoginVariable } from "../../api/auth.api";
import PasswordField from "../../components/password-field/PasswordField";

const LoginForm = () => {
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const { mutate } = useMutation<
        ServerSuccessResponse,
        unknown,
        LoginVariable
    >("login", {
        mutationFn: loginApi,
        onSuccess: (res) => {
            res.message && successToast(res.message);
            loginUser({
                accessToken: res.data.token,
                loggedInUserId: res.data.loggedInUserId,
            } as LoginResponse);
            navigate("/dashboard");
        },
        onError: (err) => {
            console.log(err);
            if (Array.isArray(err)) errorMessagesHandler(err);
            else console.log(err);
        },
    });

    const handleLogin = async (email: string, password: string) => {
        mutate({ email, password });
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
                        <PasswordField
                            className={styles.formField}
                            inputFieldProps={{
                                type: "password",
                                name: "password",
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur,
                                value: formik.values.password,
                            }}
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
