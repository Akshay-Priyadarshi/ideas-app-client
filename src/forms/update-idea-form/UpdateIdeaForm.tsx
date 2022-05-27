import classNames from "classnames";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { useQueryClient, useMutation, useQuery, QueryKey } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { getByIdApi, updateApi } from "../../api/crud.api";
import { GetByIdVariable, UpdateVariable } from "../../api/helpers";
import { ServerSuccessResponse } from "../../customs/server";
import { errorMessagesHandler } from "../../helpers/error.helper";
import { toTitleCase } from "../../helpers/string.helper";
import { successMessagesHandler } from "../../helpers/success.helper";
import useAuth from "../../hooks/useAuth";
import styles from "./UpdateIdeaForm.module.css";

interface Props {
    ideaId: string;
}

const UpdateIdeaForm: React.FC<Props> = ({ ideaId }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { loginData } = useAuth();

    const updateIdeaSchema = Yup.object().shape({
        title: Yup.string().max(100).min(3).required().trim(),
        description: Yup.string().max(1000).min(100).required().trim(),
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
        },
        validationSchema: updateIdeaSchema,
        onSubmit: (values, {}) => {
            updateIdeaMutation.mutate({
                update: {
                    title: values.title,
                    desc: values.description,
                },
                id: ideaId as string,
                accessToken: loginData?.accessToken as string,
            });
        },
    });

    const updateIdeaMutation = useMutation<
        ServerSuccessResponse,
        unknown,
        UpdateVariable<{ title: string; desc: string }>
    >("updateIdea", {
        mutationFn: updateApi<{
            title: string;
            desc: string;
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

    const {} = useQuery<
        ServerSuccessResponse,
        unknown,
        ServerSuccessResponse,
        [QueryKey, GetByIdVariable]
    >({
        queryKey: [
            "getIdea",
            {
                id: ideaId as string,
                accessToken: loginData?.accessToken as string,
            },
        ],
        queryFn: getByIdApi("/ideas"),
        onSuccess: (res) => {
            console.log(res.data);
            formik.values.title = toTitleCase(res.data.title);
            formik.values.description = toTitleCase(res.data.desc);
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
                            style={{ fontFamily: "inherit" }}
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
                        Update Idea
                    </button>
                </Form>
            </FormikProvider>
            <Toaster />
        </>
    );
};

export default UpdateIdeaForm;
