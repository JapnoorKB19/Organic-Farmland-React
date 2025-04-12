const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

/**
 * Auth middleware with optional role restriction
 * Usage: auth() → for any authenticated user
 *        auth(['admin']) → only allows admins
 */
const auth = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      // Get token from header or cookie
      let token = req.header("Authorization") || req.cookies?.token;

      if (!token) {
        return res.status(401).json({ message: "Access Denied! No token provided." });
      }

      // Handle 'Bearer <token>' format
      if (token.startsWith("Bearer ")) {
        token = token.slice(7).trim();
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found. Invalid token." });
      }

      // Attach user to request
      req.user = user;

      // Role-based access check
      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Access forbidden: insufficient rights." });
      }

      // Optional logging for development
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[AUTH] ${user.email} (${user.role}) authenticated.`);
      }

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired. Please log in again." });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token. Access denied." });
      } else {
        console.error("Auth middleware error:", error);
        return res.status(500).json({ message: "Server error during authentication." });
      }
    }
  };
};

module.exports = auth;
