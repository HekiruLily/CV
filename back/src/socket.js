const { Server } = require('socket.io');
const http = require('http');

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
        }
    });
};

const getSocket = () => {
    if (!io) {
        throw new Error("Socket.io chưa được khởi tạo!");
    }
    return io;
};

module.exports = { initSocket, getSocket };