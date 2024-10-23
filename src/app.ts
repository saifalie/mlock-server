import express, { Request, Response, Express, NextFunction } from 'express';
import { PORT } from '../secrets';

import { Server } from 'socket.io';
import http from 'http';
import { handleSocketConnection } from './sockets/socket';

const app: Express = express();

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

// Attach the websocket instance to the request object
app.use((req: Request, res: Response, next: NextFunction) => {
    req.io = io;
    return next();
});

// Initialize the websocket handling logic

handleSocketConnection(io);

server.listen(PORT, () => {
    console.log('server is running on the port: ', PORT);
});
