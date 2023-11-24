export interface IApiError {
    code?: ApiErrorCode,
    description?: string;
}

export enum ApiErrorCode {
    // TODO Declare Api errors - provided base
    Unauthorized = 'Unauthorized'
}