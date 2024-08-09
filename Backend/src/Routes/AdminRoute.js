const express = require("express");
const userModel = require("../Models/userModels");
const dbgr = require("debug")("development:app");
const adminRoute = express.Router();
const {
  imageUploadHandler,
  addProductHandler,
} = require("../Controller/adminController");
const { uploadMultiple } = require("../config/multer-connection");
const { verifytoken } = require("../middlewares/auth-middleware");

if (process.env.NODE_ENV === "development") {
  adminRoute.post("/create/admin", async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const user = await userModel.findOne({ email });
      if (user)
        return res.status(400).send("User with the same email already existed");

      const admin = await userModel.create({
        username,
        email,
        password,
        admin: true,
      });

      res.send({ admin });
    } catch (error) {
      dbgr("Error from /create/admin");
    }
  });
}

adminRoute.post(
  "/addProduct/images",
  verifytoken,
  uploadMultiple,
  imageUploadHandler
);

adminRoute.post("/add-product", verifytoken, addProductHandler);

module.exports = adminRoute;
