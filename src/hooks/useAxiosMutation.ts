import { MutationFunction, useMutation } from "react-query";

export type AxiosMutationSucccessFn<
    TData = any,
    TVariables = any,
    TContext = unknown
> = (
    data: TData,
    variables?: TVariables,
    context?: TContext
) => void | Promise<unknown> | undefined;

export type AxiosMutationErrorFn<
    TError = unknown,
    TVariables = any,
    TContext = unknown
> = (
    error: TError,
    variables?: TVariables,
    context?: TContext
) => void | Promise<unknown> | undefined;

const useAxiosMutation = <TVariables = any, TData = any>(
    fetcher: MutationFunction<TData, TVariables>,
    successFn: AxiosMutationSucccessFn<TData, TVariables>,
    errorFn: AxiosMutationErrorFn<unknown, TVariables>
) => {
    const mutation = useMutation(fetcher);

    const mutate = (variables: TVariables) => {
        mutation.mutate(variables, {
            onSuccess: successFn,
            onError: errorFn,
        });
    };

    return { mutate };
};

export default useAxiosMutation;
