const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes"); // Ensure this is correct

router.use("/auth", authRoutes); // This makes sure /api/auth works

module.exports = router;
