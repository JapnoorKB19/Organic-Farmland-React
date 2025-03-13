import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Farmer from "../models/Farmer.js";
import Consumer from "../models/Consumer.js";
import Admin from "../models/admin.js";

dotenv.config();
const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { role, name, email, password, farmName, address, city } = req.body;

  try {
    // Check if user already exists
    const userExists = await (role === "farmer" ? Farmer : Consumer).findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;
    if (role === "farmer") {
      newUser = new Farmer({ name, email, password: hashedPassword, farmName, address, city });
    } else {
      newUser = new Consumer({ name, email, password: hashedPassword, address, city });
    }

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { role, email, password } = req.body;

  try {
    let user;
    if (role === "farmer") user = await Farmer.findOne({ email });
    else if (role === "consumer") user = await Consumer.findOne({ email });
    else user = await Admin.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate Token
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });
    res.json({ message: "Login successful", token });

  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

export default router;
