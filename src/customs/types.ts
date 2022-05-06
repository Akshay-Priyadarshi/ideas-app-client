export interface IChildren {
    children: React.ReactNode;
}

export interface IServerResponse {
    error: ServerErrorResponse | ServerErrorResponse[] | undefined;
    success: ServerSuccessResponse | undefined;
    reqPath: string;
}

export class ServerResponse {
    error: ServerErrorResponse | ServerErrorResponse[] | undefined;
    success: ServerSuccessResponse | undefined;
    reqPath: string;

    constructor(_: IServerResponse) {
        this.success = _.success;
        this.error = _.error;
        this.reqPath = _.reqPath;
    }
}

export interface IServerSuccessResponse {
    data?: any;
    message?: string;
    statusCode: number;
}

export class ServerSuccessResponse {
    data: any | undefined;
    message: string | undefined;
    statusCode: number;

    constructor(_: IServerSuccessResponse) {
        this.data = _.data;
        this.message = _.message;
        this.statusCode = _.statusCode;
    }
}

type Location = "body" | "cookies" | "headers" | "params" | "query";

export interface IServerErrorResponse {
    msg: string;
    name: string;
    statusCode: number;
    reason?: string;
    helpers?: [string];
    context?: Location;
    path?: string;
}

export class ServerErrorResponse {
    msg: string;
    name: string;
    statusCode: number;
    reason?: string;
    helpers?: [string];
    context?: Location;
    path?: string;

    constructor(_: IServerErrorResponse) {
        this.name = _.name;
        this.msg = _.msg;
        this.statusCode = _.statusCode;
        this.reason = _.reason;
        this.helpers = _.helpers;
        this.context = _.context;
        this.path = _.path;
    }
}
