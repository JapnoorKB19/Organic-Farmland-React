const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    console.log("Register endpoint hit with data:", req.body);


    try {
      const {
        name,
        email,
        password,
        role,
        phone,
        farmName,
        farmLocation,
        farmCity,
        farmState,
        farmCountry,
        farmZip
      } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user object
      const newUser = new User({
        name,
        email,
        phone,
        role,
        password: hashedPassword,
      });
  
      // If farmer, assign farm details directly to schema fields
      if (role === "farmer") {
        newUser.farmName = farmName;
        newUser.address = farmLocation;
        newUser.city = farmCity;
        newUser.state = farmState;
        newUser.country = farmCountry;
        newUser.zipCode = farmZip;
      }
      console.log("Registering user:", newUser);

      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMe = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error in /me route:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const logout = (req, res) => {
  res.json({ message: "Logout successful" });
};

const test = (req, res) => {
    console.log("Test route in authController hit");
    res.send("AuthController Test Route Working");
  };
  
module.exports = { register, login, logout, test, getMe };