const express = require("express");
const { 
    getFarmers, 
    getFarmerById, 
    updateFarmerProfile 
} = require("../controllers/farmerController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Get all farmers
router.get("/", getFarmers);

// Get farmer by ID
router.get("/:id", getFarmerById);

// Update farmer profile (Protected)
router.put("/:id", authMiddleware, updateFarmerProfile);

module.exports = router;
