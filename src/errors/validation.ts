import { StatusCodes } from 'http-status-codes';
import { ErrorCode, HttpException } from './root';

export class UnprocesableEntity extends HttpException {
    constructor(message: string, errorCode: ErrorCode, errors?: any) {
        super(message, errorCode, StatusCodes.UNPROCESSABLE_ENTITY, errors);
    }
}
