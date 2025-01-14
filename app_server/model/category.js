const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    kdCategory: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 2,
    },
    namaC: { type: String, required: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", CategorySchema);
