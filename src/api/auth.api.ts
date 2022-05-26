import axios from "axios";
import { MutationFunction as MF } from "react-query";
import { ServerSuccessResponse } from "../customs/server";

const BASE_URL = "/auth";

export interface LoginVariable {
    email: string;
    password: string;
}

export interface SignupVariable {
    email: string;
    password: string;
}

export const loginApi: MF<ServerSuccessResponse, LoginVariable> = (
    v: LoginVariable
) =>
    axios.post(`${BASE_URL}/login`, {
        email: v.email,
        password: v.password,
    });

export const signupApi: MF<ServerSuccessResponse, SignupVariable> = (
    v: SignupVariable
) =>
    axios.post(`${BASE_URL}/signup`, {
        email: v.email,
        password: v.password,
    });
