import 'dotenv/config';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';

// Create a new MongoStore instance using the create method
const MongoStore = new connectMongo(session);

export const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
});

sessionStore.on('error', (error: any) => {
    console.log('Session store error', error);
});

export const authenticate = async (email: string, password: string) => {
    if (email === 'saifalie14@gmail.com' && password === '1234') {
        return Promise.resolve({ email: email, password: password });
    } else {
        return null;
    }
};

export const PORT = process.env.PORT || 7000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD!;
