const express = require("express");
const { register, login, logout, test } = require("../controllers/authController");

const router = express.Router();

// User Registration
router.post("/register", register);

// User Login
router.post("/login", login);

// User Logout
router.post("/logout", logout);

router.get("/test", (req, res) => {
  res.send("Auth route working");
});

router.get("/controller-test", test);

module.exports = router;
