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
    HTTP_UNAUTHORIZED = 4001
}
