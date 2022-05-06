import axios from "axios";
import {
    ServerErrorResponse,
    ServerResponse,
    IServerErrorResponse,
} from "../customs/types";

export function errorInterceptor(err: any): ServerErrorResponse[] | any {
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
            return serverErrors;
        }
    } else {
        return err;
    }
}
