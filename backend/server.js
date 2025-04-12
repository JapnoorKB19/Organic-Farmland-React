const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Debug: Log environment variables
console.log("Client URL:", process.env.CLIENT_URL);
console.log("MongoDB URI:", process.env.MONGO_URI ? "Loaded" : "Missing");

// Middleware
app.use(express.json()); // Ensures JSON payload is parsed correctly
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(cors({ 
    origin: process.env.CLIENT_URL, 
    credentials: true 
}));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
try {
    const routes = require("./routes/index");
    // server.js
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
