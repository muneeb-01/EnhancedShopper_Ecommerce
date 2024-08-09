const express = require("express");
const { verifytoken } = require("../middlewares/auth-middleware");
const { upload } = require("../config/multer-connection");
const {
  signUpController,
  loginController,
  getUserInfo,
  logoutController,
  updateProfileInformation,
  getPersonalInformation,
  updateProfilePicture,
  deleteProfilePicture,
} = require("../Controller/AuthController");

const AuthRoute = express.Router();

AuthRoute.post("/signup", signUpController);
AuthRoute.post("/login", loginController);
AuthRoute.get("/get-user-info", verifytoken, getUserInfo);
AuthRoute.get("/logout", verifytoken, logoutController);

AuthRoute.post(
  "/update-profile-information",
  verifytoken,
  updateProfileInformation
);

AuthRoute.get("/get-profile-information", verifytoken, getPersonalInformation);
AuthRoute.post(
  "/update-profile-picture",
  verifytoken,
  upload,
  updateProfilePicture
);

AuthRoute.post("/delete-profile-picture", verifytoken, deleteProfilePicture);

module.exports = AuthRoute;
