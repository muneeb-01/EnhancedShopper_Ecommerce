const mongoose = require("mongoose");
require("dotenv").config();
const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${process.env.MONGOOSE_URI}/enhancedShoppers`)
  .then(function () {
    dbgr("Monggose Connect from app.js");
  })
  .catch(function (params) {
    dbgr("Monggose Connection error");
  });

module.exports = mongoose.connection;
