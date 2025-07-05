const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();
const Product = require("../models/Product");

// Get products for a specific farmer
router.get("/:userId/products", async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.params.userId })
      .populate("farmer", "name farmName location");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user profile (Protected)
router.get("/profile", authMiddleware, getUserProfile);

// Update user profile (Protected)
router.put("/profile", authMiddleware, updateUserProfile);


module.exports = router;
