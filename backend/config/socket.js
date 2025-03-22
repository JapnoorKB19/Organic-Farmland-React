const socketIo = require("socket.io");

const initializeSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "*", // Allow frontend access (update for production)
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        socket.on("joinRoom", (room) => {
            socket.join(room);
            console.log(`User joined room: ${room}`);
        });

        socket.on("sendMessage", ({ room, message }) => {
            io.to(room).emit("receiveMessage", message);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    return io;
};

module.exports = initializeSocket;
