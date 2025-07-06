const User = require("../models/User");
const Order = require("../models/Order");

// Get all consumers (for admin or farmer's chat list)
const getAllConsumers = async (req, res) => {
  try {
    const consumers = await User.find({ role: "consumer" }).select("-password");
    res.json(consumers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get current user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("products");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = {
  getAllConsumers,
  getMyOrders,
};
