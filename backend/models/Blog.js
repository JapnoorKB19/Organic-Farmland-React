const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    tags: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked the post
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
