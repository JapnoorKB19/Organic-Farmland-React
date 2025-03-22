const Farmer = require("../models/Farmer");
const Product = require("../models/Product");

// Get farmer profile
const getFarmerProfile = async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.user.id).populate("products");
        if (!farmer) return res.status(404).json({ message: "Farmer not found" });

        res.json(farmer);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update farmer profile
const updateFarmerProfile = async (req, res) => {
    try {
        const { name, location, contact } = req.body;
        const farmer = await Farmer.findById(req.user.id);

        if (!farmer) return res.status(404).json({ message: "Farmer not found" });

        farmer.name = name || farmer.name;
        farmer.location = location || farmer.location;
        farmer.contact = contact || farmer.contact;

        await farmer.save();
        res.json({ message: "Profile updated successfully", farmer });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get all farmers
const getAllFarmers = async (req, res) => {
    try {
        const farmers = await Farmer.find().select("-password");
        res.json(farmers);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getFarmerProfile, updateFarmerProfile, getAllFarmers };
