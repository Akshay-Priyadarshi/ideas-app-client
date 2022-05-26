import { ServerSuccessResponse } from "../customs/server";
import { MutationFunction as MF } from "react-query";
import axios from "axios";
import { AuthenticatedVariable } from "./helpers";
const BASE_URL = "/ideas";

export interface UpvoteIdeaVariable extends AuthenticatedVariable {
    data: {
        userId: string;
        ideaId: string;
    };
}

export type DownvoteIdeaVariable = UpvoteIdeaVariable;

export const upvoteIdeaApi = (): MF<
    ServerSuccessResponse,
    UpvoteIdeaVariable
> => {
    return (v: UpvoteIdeaVariable) =>
        axios.post(BASE_URL + "/upvote", v.data, {
            headers: {
                Authorization: v.accessToken,
            },
        });
};

export const downvoteIdeaApi = (): MF<
    ServerSuccessResponse,
    DownvoteIdeaVariable
> => {
    return (v: DownvoteIdeaVariable) =>
        axios.post(BASE_URL + "/downvote", v.data, {
            headers: {
                Authorization: v.accessToken,
            },
        });
};
