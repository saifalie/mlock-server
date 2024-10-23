import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../errors/root';

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode).json({
        message: error.message,
        ErrorCode: error.errorCode,
        errors: error.errors
    });
};