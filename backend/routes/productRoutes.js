const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addProduct,
  getAllProducts,
  getProductById, // ✅ FIX typo
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const auth = require("../middleware/auth");

// 📦 multer config (store images in /uploads/)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// ✅ Get product by ID
router.get("/:id", getProductById);

// GET all products (Consumer Browse Page)
router.get("/", getAllProducts);

// GET single product by ID
router.get("/:id", getProductById);

// POST new product (Farmer uploads product)
router.post("/", auth(['farmer']), upload.single("image"), addProduct);

// PUT update product
router.put("/:id", auth(), updateProduct);

// DELETE product
router.delete("/:id", auth(), deleteProduct);


module.exports = router;
