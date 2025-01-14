const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  kdProduct: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 8,
  },
  kdBrand: {
    type: mongoose.Schema.Types.String,
    ref: "brands", //FK
    required: true,
  },
  kdCategory: {
    type: mongoose.Schema.Types.String,
    ref: "categories", //FK
    required: true,
  },
  namaP: { type: String, required: true },
  deskripsi: { type: String, required: false },
  harga: { type: Number, required: true },
  stok: { type: Number, required: true },
  image_url: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
