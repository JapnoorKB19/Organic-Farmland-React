const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "farmer", "consumer"], required: true },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    avatar: { type: String, default: "" },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
        required: true,
      },
    },
    lastLogin: { type: Date },

    // Farmer-specific fields
    farmName: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String },
    description: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    socialLinks: {
      instagram: { type: String },
    },

    // Consumer-specific fields
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
