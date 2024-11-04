import dotenv from 'dotenv';

dotenv.config({
    path: '.env'
});

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const CORS = process.env.CORS;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
