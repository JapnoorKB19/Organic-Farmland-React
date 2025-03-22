const express = require("express");
const { 
    createOrder, 
    getUserOrders, 
    getOrderById, 
    updateOrderStatus 
} = require("../controllers/orderController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Create an order (Protected)
router.post("/", authMiddleware, createOrder);

// Get user's orders (Protected)
router.get("/", authMiddleware, getUserOrders);

// Get order by ID
router.get("/:id", getOrderById);

// Update order status (Protected)
router.put("/:id", authMiddleware, updateOrderStatus);

module.exports = router;
