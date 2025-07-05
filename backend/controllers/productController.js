const Product = require("../models/Product");
const User = require("../models/User");

// Add a product
// controllers/productController.js
const addProduct = async (req, res) => {
  try {
    console.log("User from auth middleware:", req.user);
    const userId = req.user._id;   // route: /farmers/:farmerId/products

    const {
      name,
      description,
      category,
      price,
      quantity,      // coming from the form as "quantity"
    } = req.body;

    // If you use multer.single('image'), req.file will hold 1 image
    const images = req.file ? [req.file.path] : [];

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const product = new Product({
      farmer: userId,
      name,
      description,
      category,
      price,
      quantityAvailable: quantity,   // map quantity → quantityAvailable
      images,
    });

    await product.save();
    // ✅ Also add the product to the user's products array
    await User.findByIdAndUpdate(
      userId,
      { $push: { products: product._id } }
    );
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Product add error:", error);
    res.status(500).json({ message: "Server error while adding product" });
  }
};


// Get all products
const getAllProducts = async (req, res) => {
    try {
        console.log("Fetching all products..."); // Debug log
        
        const products = await Product.find()
            .populate("farmer", "name email phone farmName address city state location rating")
            .exec();
        
        console.log(`Found ${products.length} products`); // Debug log
        res.json(products);
    } catch (error) {
        console.error("DETAILED ERROR in getAllProducts:", error); // This will show the actual error
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
};

// GET /api/products/:id - Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmer', 'name location phone');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, quantityAvailable} = req.body;
        const product = await Product.findById(req.params.id);

        if (!product || product.farmer.toString() !== req.user.id) {
            return res.status(404).json({ message: "Product not found or unauthorized" });
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.stock = stock || product.quantityAvailable;

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

module.exports = { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
