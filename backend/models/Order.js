const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    consumerId: { type: mongoose.Schema.Types.ObjectId, ref: "Consumer", required: true },
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    deliveryAddress: { type: String, required: true },
    paymentMethod: { type: String, enum: ["COD", "Online"], required: true },
    transactionId: { type: String }, // Only applicable for online payments
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
