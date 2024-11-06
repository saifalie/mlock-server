import express from 'express';
import { CORS, PORT } from '../secrets.js';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import { handleSocketConnection } from './sockets/socket.js';
import { connectDB } from './config/connect.js';
import { notFoundMiddleware } from './middlewares/not-found.js';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from './utils/apiResponse.js';
import { buildAdminRouter } from './config/setup.js';
dotenv.config();
// Initialize express app
const app = express();
app.use(express.json());
// server instance
const server = http.createServer(app);
// io instance (WebSocket)
const io = new Server(server, {
    cors: {
        origin: `${CORS}`
    }
});
// Attach the websocket instance to the request object
app.use((req, res, next) => {
    req.io = io;
    return next();
});
// Initialize the websocket handling logic
handleSocketConnection(io);
// Use the admin router
buildAdminRouter(app);
// Routes
app.get('/saif', (req, res) => {
    res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { data: 'data' }, 'data is there'));
});
// Middlewares
// app.use(errorMiddleware);
app.use(notFoundMiddleware);
// Start the server and connect to MongoDB
const startServer = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`HTTP server is running on http://localhost:${PORT}`);
            // console.log(`AdminJS server is running on http://localhost:${PORT}${admin.options.rootPath}`);
        });
    }
    catch (error) {
        console.log('Something went wrong while initializing the server and MongoDB instance:', error);
    }
};
startServer();
//# sourceMappingURL=app.js.map