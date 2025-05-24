const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const protectedRoutes = require("./protectedRoutes");
const farmerRoutes = require("./farmerRoutes");

router.use("/auth", authRoutes);
router.use("/protected", protectedRoutes);
router.use("/farmers", farmerRoutes); 

module.exports = router;
