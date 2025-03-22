const express = require("express");
const { 
    getAllUsers, 
    deleteUser, 
    getAdminLogs 
} = require("../controllers/adminController");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

const router = express.Router();

// Get all users (Admin only)
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

// Delete a user (Admin only)
router.delete("/user/:id", authMiddleware, adminMiddleware, deleteUser);

// Get admin logs (Admin only)
router.get("/logs", authMiddleware, adminMiddleware, getAdminLogs);

module.exports = router;
