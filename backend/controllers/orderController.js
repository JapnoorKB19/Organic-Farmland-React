const Order = require("../models/Order");
const Product = require("../models/Product");

// Create an order
const createOrder = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);

        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.stock < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        const order = new Order({ consumer: req.user.id, product: productId, quantity });

        product.stock -= quantity;
        await product.save();
        await order.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get all orders for a consumer
const getConsumerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ consumer: req.user.id }).populate("product", "name price");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get all orders for a farmer
const getFarmerOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate({
            path: "product",
            match: { farmer: req.user.id },
            select: "name price"
        });

        res.json(orders.filter(order => order.product)); // Filter out null values
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = status;
        await order.save();

        res.json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createOrder, getConsumerOrders, getFarmerOrders, updateOrderStatus };
