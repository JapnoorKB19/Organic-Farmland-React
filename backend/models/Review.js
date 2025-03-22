const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    consumerId: { type: mongoose.Schema.Types.ObjectId, ref: "Consumer", required: true },
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
