import { IHTTPErrorResponse } from '../../application/base-service.js';
import { HTTPTypeError } from '../../application/user/util/type-error-enum.js';
import { ILogger } from '../../infrastructure/logging/logger.js';

export interface IHTTPResponse<T> {
    statusCode: number;
    body: T | IHTTPErrorResponse;
}

export const ok = <T>(body: T): IHTTPResponse<T> => {
    return {
        statusCode: 200,
        body
    };
};

export const created = <T>(body: T): IHTTPResponse<T> => {
    return {
        statusCode: 201,
        body
    };
};

export const noContent = (): IHTTPResponse<undefined> => {
    return {
        statusCode: 204,
        body: undefined
    };
};

const badRequest = <T>(body: T): IHTTPResponse<T> => {
    return {
        statusCode: 400,
        body
    };
};

const notFound = <T>(body: T): IHTTPResponse<T> => {
    return {
        statusCode: 404,
        body
    };
};

const conflict = <T>(body: T): IHTTPResponse<T> => {
    return {
        statusCode: 409,
        body
    };
};

const unexpectedError = <T>(body: T): IHTTPResponse<T> => {
    return {
        statusCode: 500,
        body
    };
};

const errorList = {
    [HTTPTypeError.INVALID_INPUT]: badRequest,
    [HTTPTypeError.NOT_FOUND]: notFound,
    [HTTPTypeError.RESOURCE_CONFLICT]: conflict,
    [HTTPTypeError.UNEXPECTED_ERROR]: unexpectedError
};

export const mapError = (
    errorResponse: IHTTPErrorResponse,
    logger: ILogger,
    userId?: string
): IHTTPResponse<IHTTPErrorResponse> => {
    if (errorResponse.errorType in errorList) {
        logger.error(createErrorLogMessage(errorResponse), userId);
        return errorList[errorResponse.errorType](errorResponse);
    }
    return unexpectedError(errorResponse);
};

export const createErrorLogMessage = (errorResponse: IHTTPErrorResponse) => {
    return `errorType: ${errorResponse.errorType} | details: ${errorResponse.details
        .map((detail) => detail.message)
        .join(' ')}`;
};
