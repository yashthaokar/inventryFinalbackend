const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies; // we only want token
  //console.log(token)

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resources", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id); // in jwttoken we assign this.id.... we use ti or access it here.
  next();
});

// we are chekcing the roles of User (...roles) we get admin here
exports.authroizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce`,
          403
        )
      );
    } // we are checkig inside roles admin is not there. 403 that mins server refused your request

    next();
  };
};
