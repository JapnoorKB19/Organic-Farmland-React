const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http"); // <-- add this
const { Server } = require("socket.io"); // <-- add this
const connectDB = require("./config/db");
const path = require("path");
const chatRoutes = require('./routes/chatRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const consumerRoutes = require('./routes/consumerRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // allow only your frontend
  credentials: true // if you're sending cookies or auth headers
}));

app.use(express.json());

app.use('/api/chat', chatRoutes);

app.use('/api/farmers', farmerRoutes);

app.use('/api/consumers', consumerRoutes);

// Debug: Log environment variables
console.log("Client URL:", process.env.CLIENT_URL);
console.log("MongoDB URI:", process.env.MONGO_URI ? "Loaded" : "Missing");

// server.js 
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
connectDB();

// Routes
try {
  const routes = require("./routes/index");
  app.use("/api", routes);
} catch (error) {
  console.error("Error loading routes:", error.message);
}

// Default route for checking API status
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// Create HTTP server using Express app
const server = http.createServer(app);

// Initialize Socket.io server with CORS config matching your frontend
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const connectedUsers = new Map(); // Map of userId -> socket.id

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join", (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`User ${userId} connected with socket id ${socket.id}`);
  });

  // Join conversation room
  socket.on("joinRoom", ({ chatId }) => {
    socket.join(chatId);
    console.log(`Socket ${socket.id} joined room ${chatId}`);
  });

  // Send message to a conversation room
  socket.on("sendMessage", ({ chatId, message }) => {
    // Broadcast message to all sockets in the room except sender
    console.log(`Server received sendMessage: chatId=${chatId}, message=${message.text}`); // Add this!
    socket.to(chatId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    for (const [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
  });
});



// Start server on the desired port using HTTP server (not app.listen)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running with Socket.io on port ${PORT}`);
});

// Export io for other modules to emit events later
module.exports = { io };