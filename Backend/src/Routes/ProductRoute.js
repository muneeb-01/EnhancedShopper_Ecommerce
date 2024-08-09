const express = require("express");
const productRouter = express.Router();
const { verifytoken } = require("../middlewares/auth-middleware");
const {
  getProducts,
  newCollection,
  getProductById,
} = require("../Controller/ProductController");

productRouter.get("/get-products", verifytoken, getProducts);
productRouter.get("/new-collection", verifytoken, newCollection);
productRouter.get("/allProducts/:productId", verifytoken, getProductById);

module.exports = productRouter;
