const AdminLog = require("../models/AdminLog");
const User = require("../models/User");
const Farmer = require("../models/Farmer");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.deleteOne();
        await new AdminLog({ action: `Deleted user ${req.params.id}` }).save();
        res.json({ message: "User deleted successfully" });
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

// Delete a farmer
const deleteFarmer = async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.params.id);
        if (!farmer) return res.status(404).json({ message: "Farmer not found" });

        await farmer.deleteOne();
        await new AdminLog({ action: `Deleted farmer ${req.params.id}` }).save();
        res.json({ message: "Farmer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get admin logs
const getAdminLogs = async (req, res) => {
    try {
        const logs = await AdminLog.find().sort({ createdAt: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getAllUsers, deleteUser, getAllFarmers, deleteFarmer, getAdminLogs };
