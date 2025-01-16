import { Server } from 'socket.io';

export const handleSocketConnection = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('socketId: ', socket.id);
        console.log('hey its saif here');
        
    });

    io.on('disconnect', (socket) => {
        console.log('socket disconnected');
    });
};
