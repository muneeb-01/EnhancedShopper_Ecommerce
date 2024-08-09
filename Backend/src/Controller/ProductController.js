const { productsModel } = require("../Models/productModel");
const mongoose = require("mongoose");
module.exports.getProducts = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) return res.status(201).send("unauthorized user detected");

    const products = await productsModel
      .find({ quantity: { $gt: 0 } })
      .sort({ timeStamp: -1 });

    return res.status(200).json({ products });
  } catch (error) {}
};

module.exports.newCollection = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) return res.status(201).send("Unauthorized user detected");

    const allProducts = await productsModel.find({ quantity: { $gt: 0 } });
    const newCollection = allProducts.slice(0).slice(-4);
    res.status(200).json({ newCollection });
  } catch (error) {}
};

module.exports.getProductById = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(401).send("Unauthorized user detected");
    }

    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send("Invalid product ID format");
    }

    const product = await productsModel.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
