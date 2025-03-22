const express = require("express");
const { 
    createBlog, 
    getAllBlogs, 
    getBlogById, 
    updateBlog, 
    deleteBlog 
} = require("../controllers/blogController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Create a blog (Protected)
router.post("/", authMiddleware, createBlog);

// Get all blogs
router.get("/", getAllBlogs);

// Get blog by ID
router.get("/:id", getBlogById);

// Update blog (Protected)
router.put("/:id", authMiddleware, updateBlog);

// Delete blog (Protected)
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
