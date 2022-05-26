import axios from "axios";
import { MutationFunction as MF } from "react-query";
import { ServerSuccessResponse } from "../customs/server";
import { AuthenticatedVariable } from "./helpers";

const BASE_URL = "/downvotes";

export interface DeleteDownvoteVariable extends AuthenticatedVariable {
    data: {
        userId: string;
        ideaId: string;
    };
}

export const deleteDownvoteApi = (): MF<
    ServerSuccessResponse,
    DeleteDownvoteVariable
> => {
    return (v: DeleteDownvoteVariable) =>
        axios.delete(BASE_URL, {
            data: v.data,
            headers: {
                Authorization: v.accessToken,
            },
        });
};
