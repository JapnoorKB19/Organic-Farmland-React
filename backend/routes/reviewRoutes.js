const express = require("express");
const { 
    addReview, 
    getReviewsByFarmer, 
    updateReview, 
    deleteReview 
} = require("../controllers/reviewController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Add a review (Protected)
router.post("/:farmerId", authMiddleware, addReview);

// Get reviews for a farmer
router.get("/:farmerId", getReviewsByFarmer);

// Update review (Protected)
router.put("/:reviewId", authMiddleware, updateReview);

// Delete review (Protected)
router.delete("/:reviewId", authMiddleware, deleteReview);

module.exports = router;
