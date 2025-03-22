const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    farmName: { type: String, required: true },
    description: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Farmer's listed products
    rating: { type: Number, default: 0 }, // Average rating from reviews
    totalReviews: { type: Number, default: 0 },
    socialLinks: {
      website: { type: String },
      instagram: { type: String },
      facebook: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farmer", farmerSchema);
