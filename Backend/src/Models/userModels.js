const mongoose = require("mongoose");
const { genSalt, hash } = require("bcrypt");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileSetup: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userPersonalInformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersPersonalInformation",
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await genSalt(10);
      this.password = await hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return next();
  }
});

module.exports = mongoose.model("User", UserSchema);

// cart: {
//   type: [
//     {
//       item: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         min: 1,
//       },
//     },
//   ],
//   default: [],
// },
// orderHistory: {
//   type: [
//     {
//       date: {
//         type: Date,
//         default: Date.now,
//       },
//       order: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
//     },
//   ],
//   default: [],
// },
