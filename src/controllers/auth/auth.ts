import { Request, Response } from 'express';
import { BadRequestException } from '../../errors/bad-request';
import { ErrorCode } from '../../errors/root';
import * as jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET } from '../../../secrets';
import { User } from '../../models/user.model';
import { NotFoundException } from '../../errors/not-found';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../../utils/apiResponse';
import { UnauthoirzedException } from '../../errors/unauthorized';
import admin from '../../config/firebase';
import { InternalException } from '../../errors/internal-exception';

const signInWithGoogle = async (req: Request, res: Response) => {
    const { name, profile_picture, id_token } = req.body;

    if (!id_token) {
        throw new BadRequestException('ID token is required', ErrorCode.TOKEN_NOT_FOUND);
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(id_token);

        const verifiedEmail = decodedToken.email;

        if (!verifiedEmail) {
            throw new UnauthoirzedException('Invalid Token or expired', ErrorCode.INVALID_TOKEN);
        }

        let user = await User.findOne({ email: verifiedEmail });

        if (user) {
            const new_access_token = user.createAccessToken() as string;
            const new_refresh_token = user.createRefreshToken() as string;

            return res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    {
                        user: {
                            name: user.name,
                            email: user.email,
                            profile_picture: user.profile_picture,
                            id: user._id
                        },
                        tokens: {
                            access_token: new_access_token,
                            refresh_token: new_refresh_token
                        }
                    },
                    'User logged In'
                )
            );
        }

        if (!name || !profile_picture) {
            throw new BadRequestException('Missing required fields for registeration: name, profile_picture', ErrorCode.FIELDS_NOT_FOUND);
        }

        user = new User({
            email: verifiedEmail,
            name,
            profile_picture
        });

        await user.save();

        const accessToken = user.createAccessToken();
        const refreshToken = user.createRefreshToken();

        res.status(StatusCodes.CREATED).json(
            new ApiResponse(
                StatusCodes.CREATED,
                {
                    user: {
                        name: user.name,
                        id: user._id,
                        profile_picture: user.profile_picture,
                        email: user.email
                    },
                    tokens: {
                        access_token: accessToken,
                        refresh_token: refreshToken
                    }
                },
                'SuccessFully register the user'
            )
        );
    } catch (error) {
        console.error('SIGNUP/LOGIN: ', error);

        throw new InternalException('Failed to Login/Signup the user', ErrorCode.AUTH_INTERNAL_EXCEPTION, error);
    }
};

export const refresthToken = async (req: Request, res: Response) => {
    const { refresh_token } = req.body;
    if (!refresh_token) {
        throw new BadRequestException('Refresh token is required', ErrorCode.TOKEN_NOT_FOUND);
    }

    if (!REFRESH_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }

    try {
        const payload = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;

        const user = await User.findById(payload.id);

        if (!user) {
            throw new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND);
        }

        const new_access_token = user.createAccessToken();
        const new_refresh_token = user.createRefreshToken();

        res.status(StatusCodes.OK).json(
            new ApiResponse(StatusCodes.OK, { access_token: new_access_token, refresh_token: new_refresh_token }, 'Refresh the tokens Successfully')
        );
    } catch (error) {
        console.log('REFRESH_TOKENS: ', error);
        throw new UnauthoirzedException('Invalid Refresh Token', ErrorCode.INVALID_TOKEN);
    }
};
