import axios from "axios";
import {
    MutationFunction as MF,
    QueryFunction as QF,
    QueryKey,
} from "react-query";
import { ServerSuccessResponse } from "../customs/server";
import {
    DeleteVariable,
    baseUrlWithId,
    GetByIdVariable,
    UpdateVariable,
    CreateVariable,
    GetAllVariable,
} from "./helpers";

export const getAllApi =
    (BASE_URL: string): QF<ServerSuccessResponse, [QueryKey, GetAllVariable]> =>
    ({ queryKey }) => {
        const [_, v] = queryKey;
        return axios.get(`${BASE_URL}/`, {
            headers: {
                Authorization: v.accessToken,
            },
        });
    };

export const getByIdApi =
    (
        BASE_URL: string
    ): QF<ServerSuccessResponse, [QueryKey, GetByIdVariable]> =>
    ({ queryKey }) => {
        const [_, v] = queryKey;
        return axios.get(baseUrlWithId(BASE_URL, v.id), {
            headers: {
                Authorization: v.accessToken,
            },
        });
    };

export const createApi = <T>(
    BASE_URL: string
): MF<ServerSuccessResponse, CreateVariable<T>> => {
    return (v: CreateVariable<T>) =>
        axios.post(BASE_URL, v.create, {
            headers: {
                Authorization: v.accessToken,
            },
        });
};

export const updateApi = <T>(
    BASE_URL: string
): MF<ServerSuccessResponse, UpdateVariable<T>> => {
    return (v: UpdateVariable<T>) =>
        axios.put(baseUrlWithId(BASE_URL, v.id), v.update, {
            headers: {
                Authorization: v.accessToken,
            },
        });
};

export const deleteApi = (
    BASE_URL: string
): MF<ServerSuccessResponse, DeleteVariable> => {
    return (v: DeleteVariable) =>
        axios.delete(baseUrlWithId(BASE_URL, v.id), {
            headers: {
                Authorization: v.accessToken,
            },
        });
};
