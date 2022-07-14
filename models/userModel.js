const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter Your Name"],
    maxLength: [25, "Name should not exceed 25 charaters"],
    minLenght: [4, "name charaters shloud more that 4 charaters"],
  },
  email: {
    type: String,
    required: [true, "please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "please Enter a Valid Email"],
  },
  password: {
    type: String,
    required: [true, "please Enter your Password"],
    minLenght: [8, "password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
//---------hasing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } // it will just check password modify he ya nahi if not then only it will hash the password.
  this.password = await bcrypt.hash(this.password, 10);
});

// -------JWT token

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// campare password ----------
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // this mining self user.
};

// generating password for reset token
userSchema.methods.getResetPasswordToken = function () {
  // generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // hashin and adding to userSchema.
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // we make this for valid only 10 mints
  return resetToken;
}; // in crypto give buffer value then we put tostring which give symbol type value then we pass hex which give has valuetype value.but its not actula has.
// then we have to use crypto.createHash() to create has in () we have to write "sha256" its a algorithum of that methods. and then .update(token) so it will update our token because we want ot update token, we we give .digest("hex") to give hex value and complite this process.

module.exports = mongoose.model("User", userSchema);
