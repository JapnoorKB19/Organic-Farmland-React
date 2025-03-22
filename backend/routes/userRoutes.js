const express = require("express");
const { getUserProfile, updateUserProfile, deleteUser } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Get user profile (Protected)
router.get("/profile", authMiddleware, getUserProfile);

// Update user profile (Protected)
router.put("/profile", authMiddleware, updateUserProfile);

// Delete user (Admin only)
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
