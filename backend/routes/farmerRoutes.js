const express = require("express");
const multer = require("multer");
const {
  getFarmerById,
  updateFarmerProfile,
  getAllFarmers,
  getFarmerProducts
} = require("../controllers/farmerController");

const auth = require("../middleware/auth");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists in your project root
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

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

router.get("/:id/products", getFarmerProducts);

module.exports = router;
