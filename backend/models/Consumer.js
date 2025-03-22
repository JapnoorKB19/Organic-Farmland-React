const mongoose = require("mongoose");

const consumerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // Consumer's past orders
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Farmer" }], // Favorite farmers
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consumer", consumerSchema);
