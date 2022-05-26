import axios from "axios";
import { MutationFunction as MF } from "react-query";
import { ServerSuccessResponse } from "../customs/server";
import { AuthenticatedVariable } from "./helpers";

const BASE_URL = "/upvotes";

export interface DeleteUpvoteVariable extends AuthenticatedVariable {
    data: {
        userId: string;
        ideaId: string;
    };
}

export const deleteUpvoteApi = (): MF<
    ServerSuccessResponse,
    DeleteUpvoteVariable
> => {
    return (v: DeleteUpvoteVariable) =>
        axios.delete(BASE_URL, {
            data: v.data,
            headers: {
                Authorization: v.accessToken,
            },
        });
};
