const express = require("express");
const {
      getFarmerById,
      updateFarmerProfile,
      getAllFarmers,
      getFarmerProducts,
      addProduct,
      updateProduct,
      deleteProduct
} = require("../controllers/farmerController");

const auth = require("../middleware/auth");

const router = express.Router();

// Get all farmers
router.get("/", getAllFarmers);

// Get farmer by ID
router.get("/:id", getFarmerById);

// Update farmer profile (Protected)
router.put("/profile", auth(), updateFarmerProfile);

// GET /api/farmers/search?query=someText
router.get("/search", async (req, res) => {
  try {
    const query = req.query.query || "";
    const regex = new RegExp(query, "i"); // case-insensitive search

    const farmers = await Farmer.find({
      $or: [{ name: regex }, { location: regex }],
    });

    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



// 🔽 Product-specific routes 🔽

// Get all products by a specific farmer
router.get("/:id/products", getFarmerProducts);

// Add new product for farmer
router.post("/:id/products", auth(), addProduct);

// Update a specific product
router.put("/:id/products/:productId", auth(), updateProduct);

// Delete a specific product
router.delete("/:id/products/:productId", auth(), deleteProduct);

module.exports = router;
