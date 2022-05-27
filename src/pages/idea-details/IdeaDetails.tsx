import { QueryKey, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getByIdApi } from "../../api/crud.api";
import { GetByIdVariable } from "../../api/helpers";
import { ServerSuccessResponse } from "../../customs/server";
import useAuth from "../../hooks/useAuth";
import { toTitleCase } from "../../helpers/string.helper";

const IdeaDetails = () => {
    const { id } = useParams();
    const { loginData } = useAuth();
    const {
        isLoading,
        isError,
        error,
        data: getIdeaRes,
    } = useQuery<
        ServerSuccessResponse,
        unknown,
        ServerSuccessResponse,
        [QueryKey, GetByIdVariable]
    >({
        queryKey: [
            "getIdea",
            {
                id: id as string,
                accessToken: loginData?.accessToken as string,
            },
        ],
        queryFn: getByIdApi("/ideas"),
    });

    if (isLoading) return <p>Loading</p>;

    if (isError) {
        console.log(error);
    }

    return (
        <div>
            <h2>{toTitleCase(getIdeaRes?.data.title)}</h2>
            <h4>{toTitleCase(getIdeaRes?.data.desc)}</h4>
        </div>
    );
};

export default IdeaDetails;
