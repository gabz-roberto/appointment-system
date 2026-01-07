export type HttpRequest<BodyType = unknown> = {
    url: string;
    method: HttpMethod;
    headers?: Record<string, string>;
    body?: BodyType;
};

export interface HttpClient<ResponseType = unknown> {
    request<BodyType = unknown>(
        data: HttpRequest<BodyType>
    ): Promise<HttpResponse<ResponseType>>;
}

export type HttpMethod =
    | "post"
    | "get"
    | "put"
    | "patch"
    | "delete"
    | "head"
    | "options";

export enum HttpStatusCode {
    ok = 200,
    created = 201,
    noContent = 204,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    serverError = 500,
}

export type HttpResponse<ResponseType = unknown> = {
    statusCode: HttpStatusCode;
    body?: ResponseType;
};
