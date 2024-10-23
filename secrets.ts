import dotenv from 'dotenv';

dotenv.config({
    path: '.env'
});

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
