import express, { Request, Response, Express, NextFunction } from 'express';
import { CORS, PORT } from '../secrets.js';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import { handleSocketConnection } from './sockets/socket.js';
import { errorMiddleware } from './middlewares/errors.js';
import { connectDB } from './config/connect.js';
import { notFoundMiddleware } from './middlewares/not-found.js';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from './utils/apiResponse.js';

import { buildAdminRouter } from './config/setup.js';
import { Locker } from './models/locker.model.js';
import rootRouter from './routes/index.routes.js';
import helmet from 'helmet';

dotenv.config();

// Initialize express app
const app: Express = express();
app.use(express.json());
// app.use(helmet());

// server instance
const server = http.createServer(app);

// io instance (WebSocket)
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

// Use the admin router
buildAdminRouter(app);

// routes
app.use('/api', rootRouter);

// Middlewares
app.use(errorMiddleware);
app.use(notFoundMiddleware);

// Start the server and connect to MongoDB
const startServer = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`HTTP server is running on http://localhost:${PORT}`);
            // console.log(`AdminJS server is running on http://localhost:${PORT}${admin.options.rootPath}`);
        });
    } catch (error) {
        console.log('Something went wrong while initializing the server and MongoDB instance:', error);
    }
};

startServer();
