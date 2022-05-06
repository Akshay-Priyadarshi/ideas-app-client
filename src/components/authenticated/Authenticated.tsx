import React from "react";
import { Navigate } from "react-router-dom";
import { IChildren } from "../../customs/types";
import useAuth from "../../hooks/useAuth";

interface IAuthenticatedProps extends IChildren {}

const Authenticated: React.FC<IAuthenticatedProps> = ({ children }) => {
    const { loginData } = useAuth();

    if (loginData === undefined) {
        return <Navigate to={"/login"} />;
    } else {
        return <>{children}</>;
    }
};

export default Authenticated;
