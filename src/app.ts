import express, { Request, Response, Express, NextFunction } from 'express';
import { CORS, PORT } from '../secrets';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import { handleSocketConnection } from './sockets/socket';
import { errorMiddleware } from './middlewares/errors';
import { connectDB } from './config/connect';
import { notFoundMiddleware } from './middlewares/not-found';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from './utils/apiResponse';

dotenv.config();
const app: Express = express();

app.use(express.json());

// server instance
const server = http.createServer(app);

// io instance
const io = new Server(server, {
    cors: {
        origin: `${CORS}`
    }
});

// Attach the websocket instance to the request object
app.use((req: Request, res: Response, next: NextFunction) => {
    req.io = io;
    return next();
});

// Initialize the websocket handling logic

handleSocketConnection(io);

//Routes

app.get('/saif', (req, res) => {
    res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { data: 'data' }, 'data is there'));
});

//Middlewares
app.use(errorMiddleware);
app.use(notFoundMiddleware);

// initializing the DB and server
const start = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`HTTP server is running on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('something went wrong while initializing the server and mongodb instance', error);
    }
};

start();
