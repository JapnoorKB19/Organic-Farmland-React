const express = require("express");
const { 
    addProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/productController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Add a product (Protected)
router.post("/", authMiddleware, addProduct);

// Get all products
router.get("/", getAllProducts);

// Get product by ID
router.get("/:id", getProductById);

// Update product (Protected)
router.put("/:id", authMiddleware, updateProduct);

// Delete product (Protected)
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
