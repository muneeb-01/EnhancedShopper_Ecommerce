const mongoose = require("mongoose");

const personalInformationSchema = mongoose.Schema({
  profile: {
    type: String,
    default: undefined,
  },
  firstname: {
    type: String,
    default: undefined,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: undefined,
  },
  email: {
    type: String,
    default: undefined,
  },
  lastname: {
    type: String,
    default: undefined,
  },
  phone: {
    type: String,
    default: undefined,
  },
  province: {
    type: String,
    default: undefined,
  },
  city: {
    type: String,
    default: undefined,
  },
  area: {
    type: String,
    default: undefined,
  },
  fullAddress: {
    type: String,
    default: undefined,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "usersPersonalInformation",
  personalInformationSchema
);
