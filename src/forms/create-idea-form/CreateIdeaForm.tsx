import styles from "./CreateIdeaForm.module.css";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { toTitleCase } from "../../helpers/string.helper";
import classNames from "classnames";
import { useMutation, useQueryClient } from "react-query";
import { ServerSuccessResponse } from "../../customs/server";
import { useNavigate } from "react-router-dom";
import { createApi } from "../../api/crud.api";
import { successMessagesHandler } from "../../helpers/success.helper";
import { CreateVariable } from "../../api/helpers";
import { errorMessagesHandler } from "../../helpers/error.helper";
import useAuth from "../../hooks/useAuth";

const CreateIdeaForm = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { loginData } = useAuth();

    const createIdeaMutation = useMutation<
        ServerSuccessResponse,
        unknown,
        CreateVariable<{ title: string; desc: string; ideator: string }>
    >("createIdea", {
        mutationFn: createApi<{
            title: string;
            desc: string;
            ideator: string;
        }>("/ideas"),
        onSuccess: (res) => {
            res.message && successMessagesHandler(res.message);
            queryClient.invalidateQueries("getIdeas");
            navigate("/dashboard/");
        },
        onError: (err) => {
            if (Array.isArray(err)) errorMessagesHandler(err);
            else console.log(err);
        },
    });

    const createIdeaSchema = Yup.object().shape({
        title: Yup.string().max(100).min(3).required().trim(),
        description: Yup.string().max(1000).min(100).required().trim(),
        solvedProblem: Yup.string().max(1000).trim(),
        tags: Yup.array(Yup.string().max(10)),
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
        },
        validationSchema: createIdeaSchema,
        onSubmit: (values, {}) => {
            createIdeaMutation.mutate({
                create: {
                    title: values.title,
                    desc: values.description,
                    ideator: loginData?.loggedInUserId as string,
                },
                accessToken: loginData?.accessToken as string,
            });
        },
    });

    return (
        <>
            <FormikProvider value={formik}>
                <Form
                    className={styles.createIdeaForm}
                    onSubmit={formik.handleSubmit}
                >
                    <div className={styles.formControl}>
                        <label className={styles.formLabel} htmlFor="title">
                            Title
                        </label>
                        <Field
                            className={styles.formField}
                            type="text"
                            name="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                        />
                        <ErrorMessage
                            name="title"
                            render={(msg: string) => (
                                <p className={styles.formError}>
                                    {toTitleCase(msg)}
                                </p>
                            )}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label
                            className={styles.formLabel}
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            className={classNames(
                                styles.formField,
                                styles.desc
                            )}
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                        />
                        <ErrorMessage
                            name="description"
                            render={(msg: string) => (
                                <p className={styles.formError}>
                                    {toTitleCase(msg)}
                                </p>
                            )}
                        />
                    </div>
                    <button
                        className={styles.submitBtn}
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid}
                    >
                        Post Idea
                    </button>
                </Form>
            </FormikProvider>
            <Toaster />
        </>
    );
};

export default CreateIdeaForm;
