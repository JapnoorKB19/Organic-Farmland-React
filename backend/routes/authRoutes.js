const express = require("express");
const { register, login, logout, test, getMe} = require("../controllers/authController");
const auth = require("../middleware/auth");
const router = express.Router();

// User Registration
router.post("/register", register);

// User Login
router.post('/login', (req, res, next) => {
  console.log('Login route hit');
  next();
}, login);

// User Logout
router.post("/logout", logout);

router.get("/test", (req, res) => {
  res.send("Auth route working");
});

router.get("/me", auth, getMe);

router.get("/controller-test", test);

module.exports = router;
