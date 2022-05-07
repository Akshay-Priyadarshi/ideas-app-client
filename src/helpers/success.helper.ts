import { AxiosResponse } from "axios";
import {
    IServerSuccessResponse,
    ServerResponse,
    ServerSuccessResponse,
} from "../customs/server";
import { successToast } from "./toast.helper";

export function successInterceptor(
    res: AxiosResponse
): Promise<ServerSuccessResponse> {
    const serverResponse = new ServerResponse(res.data);
    const serverSucccessResponse = new ServerSuccessResponse(
        serverResponse.success as IServerSuccessResponse
    );
    return Promise.resolve(serverSucccessResponse);
}

export const successMessagesHandler = (msg: string) => {
    successToast(msg);
};
