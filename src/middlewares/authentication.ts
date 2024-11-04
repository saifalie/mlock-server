import { NextFunction, Request, Response } from 'express';
import { UnauthoirzedException } from '../errors/unauthorized';
import { ErrorCode } from '../errors/root';
import * as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../../secrets';
import { User } from '../models/user.model';
import { NotFoundException } from '../errors/not-found';

interface CustomRequest extends Request {
    user: {
        id: string;
        full_name: string;
    };
    socket: any;
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthoirzedException('Unauthorized', ErrorCode.HTTP_UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];

    if (!ACCESS_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }

    try {
        const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as jwt.JwtPayload;

        if (!payload || typeof payload === 'string') {
            throw new UnauthoirzedException('Authentication Invalid', ErrorCode.HTTP_UNAUTHORIZED);
        }

        req.user = { id: payload.id, full_name: payload.full_name };
        req.socket = req.io;

        const user = await User.findById(payload.id);
        if (!user) {
            throw new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND);
        }

        next();
    } catch (error) {
        throw new UnauthoirzedException('Authentication Invalid', ErrorCode.HTTP_UNAUTHORIZED);
    }
};

export default auth;
