import React from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { logout, login } from "../store/slices/auth.slice";
import { LoginResponse } from "../customs/response";

const useAuth = () => {
    const loginData = useAppSelector((state) => state.auth.loginData);
    const dispatch = useAppDispatch();

    const logoutUser = () => {
        dispatch(logout());
    };

    const loginUser = (loginResponse: LoginResponse) => {
        dispatch(login(loginResponse));
    };

    return { loginData, logoutUser, loginUser };
};

export default useAuth;
