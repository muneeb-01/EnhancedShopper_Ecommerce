const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports.productsModel = mongoose.model("Product", ProductSchema);
