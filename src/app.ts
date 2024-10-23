import express, { Request, Response, Express, NextFunction } from 'express';
import { PORT } from '../secrets';

import { Server } from 'socket.io';
import http from 'http';
import { handleSocketConnection } from './sockets/socket';
import { errorMiddleware } from './middlewares/errors';
import { connectDB } from './config/connect';

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

//Routes

app.get('/saif', (req, res) => {
    res.send('darling how are you, feeling good !!');
});

//Middlewares
app.use(errorMiddleware);

const start = async () => {
    try {
        await connectDB()
            .then(() => {
                server.listen(PORT, () => {
                    console.log(`HTTP server is running on port http://localhost:${PORT}`);
                });
            })
            .catch((error) => {
                console.log('MongoDB connection failed !! ', error);
            });
    } catch (error) {
        console.log('something went wrong while initializing the server and mongodb instance', error);
    }
};

start();
