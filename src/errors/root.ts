import { StatusCodes } from 'http-status-codes';

export class HttpException extends Error {
    message: string;
    errorCode: ErrorCode;
    statusCode: StatusCodes;
    errors: any;

    constructor(message: string, errorCode: ErrorCode, statusCode: StatusCodes, errors: any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 6001,
    USER_ALREADY_EXSISTS = 6002,
    LOCKER_NOT_FOUND = 5001,
    HTTP_UNAUTHORIZED = 4001,
    FIELDS_NOT_FOUND = 4003,
    TOKEN_NOT_FOUND = 4003,
    FILE_NOT_FOUND = 4006,
    FILE_INTERNAL_EXCEPTION = 5004,
    SECRET_KEY_NOT_FOUND = 4005,
    INVALID_TOKEN = 4006,
    AUTH_INTERNAL_EXCEPTION = 5001
}
