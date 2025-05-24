const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http"); // <-- add this
const { Server } = require("socket.io"); // <-- add this
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Debug: Log environment variables
console.log("Client URL:", process.env.CLIENT_URL);
console.log("MongoDB URI:", process.env.MONGO_URI ? "Loaded" : "Missing");

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

// Listen for new socket connections
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Listen for disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server on the desired port using HTTP server (not app.listen)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running with Socket.io on port ${PORT}`);
});

// Export io for other modules to emit events later
module.exports = { io };
