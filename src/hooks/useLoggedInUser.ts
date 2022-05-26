import { useEffect, useState } from "react";
import { QueryKey, useQuery } from "react-query";
import { getByIdApi } from "../api/crud.api";
import { GetByIdVariable } from "../api/helpers";
import { ServerSuccessResponse } from "../customs/server";
import { User } from "../models/user.model";
import useAuth from "./useAuth";

const useLoggedInUser = (userId: String | undefined) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const { loginData } = useAuth();

    const { error, isError, refetch } = useQuery<
        ServerSuccessResponse,
        unknown,
        ServerSuccessResponse,
        [QueryKey, GetByIdVariable]
    >({
        queryKey: [
            "getLoggedInUser",
            {
                id: userId as string,
                accessToken: loginData?.accessToken as string,
            },
        ],
        queryFn: getByIdApi("/users"),
    });

    if (isError) {
        console.log(error);
    }

    const fetchLoggedInUser = () => {
        refetch().then((res) => {
            setLoggedInUser(res.data?.data);
        });
    };

    useEffect(() => {
        fetchLoggedInUser();
    }, [userId]);

    return { loggedInUser };
};

export default useLoggedInUser;
