const Blog = require("../models/Blog");

// Create a blog post
const createBlogPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = new Blog({ title, content, author: req.user.id });

        await blog.save();
        res.status(201).json({ message: "Blog post created successfully", blog });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get all blog posts
const getAllBlogPosts = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "name");
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a blog post
const deleteBlogPost = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog || blog.author.toString() !== req.user.id) {
            return res.status(404).json({ message: "Blog post not found or unauthorized" });
        }

        await blog.deleteOne();
        res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createBlogPost, getAllBlogPosts, deleteBlogPost };
