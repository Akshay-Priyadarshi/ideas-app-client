import React from "react";
import { Navigate } from "react-router-dom";
import { IChildren } from "../../customs/types";
import useAuth from "../../hooks/useAuth";

interface IOnlyUnauthenticatedProps extends IChildren {}

const OnlyUnauthenticated: React.FC<IOnlyUnauthenticatedProps> = ({
    children,
}) => {
    const { loginData } = useAuth();

    if (loginData === undefined) {
        return <>{children}</>;
    } else {
        return <Navigate to={"/dashboard"} />;
    }
};

export default OnlyUnauthenticated;
