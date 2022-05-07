import axios from "axios";
import {
    ServerErrorResponse,
    ServerResponse,
    IServerErrorResponse,
} from "../customs/server";
import { errorToast } from "./toast.helper";

export function errorInterceptor(
    err: any
): Promise<ServerErrorResponse[] | any> {
    if (axios.isAxiosError(err)) {
        if (err.response) {
            const serverResponse = err.response.data as ServerResponse;
            const serverErrors = [];
            if (Array.isArray(serverResponse.error)) {
                serverResponse.error.forEach((e) => {
                    serverErrors.push(new ServerErrorResponse(e));
                });
            } else {
                serverErrors.push(
                    new ServerErrorResponse(
                        serverResponse.error as IServerErrorResponse
                    )
                );
            }
            return Promise.reject(serverErrors);
        }
    }
    return Promise.reject(err);
}

export const errorMessagesHandler = (errors: ServerErrorResponse[]) => {
    errors.forEach((e) => {
        errorToast(e.msg);
    });
};
