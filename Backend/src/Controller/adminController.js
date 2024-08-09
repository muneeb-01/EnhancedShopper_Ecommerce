const { productsModel } = require("../Models/productModel");

module.exports.imageUploadHandler = (req, res, next) => {
  try {
    const files = req?.files;
    const { HOST } = req.body;

    const fileUrl = files.map((file) => {
      return `${HOST}/uploads/products/${file.filename}`;
    });

    res.status(200).send(fileUrl);
  } catch (error) {}
};

module.exports.addProductHandler = async (req, res) => {
  try {
    const { name, description, price, brand, category, images, quantity } =
      req.body;

    const isProduct = await productsModel.findOne({ name });
    if (isProduct)
      return res.status(201).send("Product already exist with this name");

    const product = await productsModel.create({
      name: name,
      description: description,
      brand: brand,
      images: images,
      category: category,
      price: price,
      quantity: quantity,
    });
    res.status(200).send("Product added successfully");
  } catch (error) {
    console.log(error);
  }
};
