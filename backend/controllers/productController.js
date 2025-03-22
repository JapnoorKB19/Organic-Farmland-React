const Product = require("../models/Product");

// Add a product
const addProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;
        const product = new Product({ name, price, description, stock, farmer: req.user.id });

        await product.save();
        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("farmer", "name location");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product || product.farmer.toString() !== req.user.id) {
            return res.status(404).json({ message: "Product not found or unauthorized" });
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.stock = stock || product.stock;

        await product.save();
        res.json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product || product.farmer.toString() !== req.user.id) {
            return res.status(404).json({ message: "Product not found or unauthorized" });
        }

        await product.deleteOne();
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct };
