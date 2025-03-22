const Review = require("../models/Review");
const Farmer = require("../models/Farmer");

// Add a review
const addReview = async (req, res) => {
    try {
        const { farmerId, rating, comment } = req.body;

        const farmer = await Farmer.findById(farmerId);
        if (!farmer) return res.status(404).json({ message: "Farmer not found" });

        const review = new Review({ user: req.user.id, farmer: farmerId, rating, comment });
        await review.save();

        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get reviews for a farmer
const getFarmerReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ farmer: req.params.farmerId }).populate("user", "name");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { addReview, getFarmerReviews };
