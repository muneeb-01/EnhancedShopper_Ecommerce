const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/profiles");
  },
  filename: function (req, file, cb) {
    const uniqueName = uuidv4();
    cb(null, uniqueName + path.extname(file.originalname));
  },
});
module.exports.upload = multer({ storage: profileStorage }).single("profile");

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/products");
  },
  filename: function (req, file, cb) {
    const uniqueName = uuidv4();
    cb(null, uniqueName + path.extname(file.originalname));
  },
});
module.exports.uploadMultiple = multer({ storage: productStorage }).array(
  "productImages",
  4
);
