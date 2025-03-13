import mongoose from "mongoose";

const consumerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // Reference to Orders
  },
  { timestamps: true }
);

const Consumer = mongoose.model("Consumer", consumerSchema);
export default Consumer;
