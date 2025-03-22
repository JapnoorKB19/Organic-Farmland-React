const express = require("express");
const { 
    sendMessage, 
    getMessages 
} = require("../controllers/chatController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Send a message (Protected)
router.post("/", authMiddleware, sendMessage);

// Get messages between users
router.get("/:conversationId", authMiddleware, getMessages);

module.exports = router;
