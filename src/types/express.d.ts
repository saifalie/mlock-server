import { Server } from 'socket.io';

declare module 'express-serve-static-core' {
    interface Request {
        io: Server;
    }
}

// declare global {
//     namespace Express {
//         interface Request {
//             io: Server;
//         }
//     }
// }
