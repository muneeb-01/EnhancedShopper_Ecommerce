const userModel = require("../Models/userModels");
const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const personalInfo = require("../Models/personalInfo");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const dbgr = require("debug")("development:authController");

const maxAge = 1000 * 60 * 60 * 24 * 3;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

module.exports.signUpController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(201).send("username or password must required");

    const validity = await userModel.findOne({ email });
    if (validity) return res.status(201).send("User alredy exist");

    const user = await userModel.create({
      username,
      password,
      email,
    });

    res.cookie(
      "jwt",
      createToken(user.email, user._id, {
        maxAge,
        secure: true,
        sameSite: "none",
      })
    );

    res.status(200).json({
      user: {
        email: user.email,
        username: user.username,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    dbgr("Sign up Error");
    res.status(403).send("error");
  }
};

module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(201).send("Unauthorized user detected");

    const user = await userModel.findOne({ email });
    if (!user) return res.status(201).send("Unauthorized user detected");
    const auth = await compare(password, user.password);

    if (!auth) return res.status(201).send("Unauthorized user detected");

    res.cookie(
      "jwt",
      createToken(user.email, user._id, {
        maxAge,
        secure: true,
        sameSite: "none",
      })
    );
    res.status(200).json({
      user: {
        email: user.email,
        username: user.username,
        profileSetup: user.profileSetup,
        isAdmin: user.admin,
      },
    });
  } catch (error) {
    dbgr("Sign In Error");
    res.status(403).send("somthing went wrong");
  }
};

module.exports.getUserInfo = async (req, res) => {
  try {
    const { userId } = req;

    const user = await userModel.findById(userId);
    if (!user) return res.status(202).send("user not found...");

    res.status(200).json({
      user: {
        email: user.email,
        username: user.username,
        profileSetup: user.profileSetup,
        isAdmin: user.admin,
      },
    });
  } catch (error) {
    dbgr("Sign In Error");
    res.send("somthing went wrong");
  }
};

module.exports.logoutController = async (req, res) => {
  try {
    const { userId } = req;
    const user = await userModel.findById(userId);
    if (!user) return res.status(201).send("user not found...");

    res.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "None" });
    res.status(200).send("Logout successfully");
  } catch (error) {
    dbgr("Sign In Error");
    res.status(403).send("somthing went wrong");
  }
};

module.exports.updateProfileInformation = async (req, res) => {
  try {
    const { userId } = req;
    const user = await userModel.findById(userId);
    if (!user) return res.status(201).send("user not found...");

    const { firstname, lastname, phone, province, city, area, fullAddress } =
      req.body;

    if (!firstname) return res.status(201).send("Firstname not exist");
    if (!lastname) return res.status(201).send("lastname not exist");
    if (!phone) return res.status(201).send("phone not exist");
    if (!province) return res.status(201).send("province not exist");
    if (!city) return res.status(201).send("city not exist");
    if (!area) return res.status(201).send("area not exist");
    if (!fullAddress) return res.status(201).send("fullAddress not exist");

    const isPersonalInfo = await personalInfo.findOne({ userId });
    let personalInformation;

    if (isPersonalInfo) {
      personalInformation = await personalInfo.findByIdAndUpdate(
        isPersonalInfo._id,
        {
          userId,
          firstname,
          email: user.email,
          lastname,
          phone,
          province,
          city,
          area,
          fullAddress,
        }
      );
    } else {
      personalInformation = await personalInfo.create({
        userId,
        firstname,
        email: user.email,
        lastname,
        phone,
        province,
        city,
        area,
        fullAddress,
      });
    }

    user.userPersonalInformation = personalInformation._id;
    user.profileSetup = true;
    await user.save();
    await personalInformation.save();

    res.status(200).json({ personalInformation });
  } catch (error) {
    dbgr("update personal information error");
    console.log(error);
    res.status(403).send("somthing went wrong");
  }
};

module.exports.getPersonalInformation = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) return res.status(201).send("Unauthorized user detected");

    const personalInformation = await personalInfo.findOne({ userId });

    res.status(200).json({ personalInformation });
  } catch (error) {}
};

module.exports.updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) return res.status(201).send("File is required");
    const { userId } = req;
    const { HOST } = req.body;

    const profile = await personalInfo.findOneAndUpdate(
      { userId },
      {
        profile: `${HOST}/uploads/profiles/${req.file.filename}`,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).send("update profile error");
  }
};

module.exports.deleteProfilePicture = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) return res.status(400).send("unauthorized user detected");
    const { profile } = req.body;
    const filename = path.basename(req.body.profile);
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "uploads",
      "profiles",
      filename
    );

    fs.unlinkSync(filePath, async (err) => {
      if (err) {
        return res.status(500).send("failed to delete the file");
      }
    });

    const personalInformation = await personalInfo.findOneAndUpdate(
      { userId },
      {
        $set: { profile: null },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ personalInformation });
  } catch (error) {
    return res.status(500).send("delete profile error");
  }
};
