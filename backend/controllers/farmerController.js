const Farmer = require("../models/User");
const Product = require("../models/Product");

// Get farmer profile

const getFarmerById = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id).select("-password").populate("products");
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
        const city = req.query.city;
        let query = {};
        if (city) {
            query.location = { $regex: new RegExp(city, "i") }; // case-insensitive city filter
        }

        const farmers = await Farmer.find(query).select("-password");
        res.json(farmers);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Get all products for a specific farmer
const getFarmerProducts = async (req, res) => {
    try {
        const products = await Product.find({ farmer: req.params.id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
};

module.exports = {
    getFarmerById,
    updateFarmerProfile,
    getAllFarmers,
    getFarmerProducts,
};
