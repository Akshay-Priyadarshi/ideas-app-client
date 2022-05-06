import { AxiosResponse } from "axios";
import {
    IServerSuccessResponse,
    ServerResponse,
    ServerSuccessResponse,
} from "../customs/types";

export function successInterceptor(res: AxiosResponse): ServerSuccessResponse {
    const serverResponse = new ServerResponse(res.data);
    const serverSucccessResponse = new ServerSuccessResponse(
        serverResponse.success as IServerSuccessResponse
    );
    return serverSucccessResponse;
}
