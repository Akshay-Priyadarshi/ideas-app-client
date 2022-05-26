export const baseUrlWithId = (BASE_URL: string, id: string) => {
    return `${BASE_URL}/${id}`;
};

export interface GetAllVariable extends AuthenticatedVariable {}

export interface GetByIdVariable extends AuthenticatedVariable {
    id: string;
}

export interface UpdateVariable<U = any> extends AuthenticatedVariable {
    id: string;
    update: U;
}

export interface CreateVariable<C = any> extends AuthenticatedVariable {
    create: C;
}

export interface DeleteVariable extends AuthenticatedVariable {
    id: string;
}

export interface AuthenticatedVariable {
    accessToken: string;
}
