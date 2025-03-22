const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "farmer", "consumer"], required: true },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    avatar: { type: String, default: "" },
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number], // [longitude, latitude]
    },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" }); // Enable geospatial queries

module.exports = mongoose.model("User", userSchema);
