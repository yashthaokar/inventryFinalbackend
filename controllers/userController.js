const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

const User = require("../models/userModel");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail");

//Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample ID",
      url: "profilePhotUrl",
    },
  });
  sendToken(user, 200, res);
  /* const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    //user,
    token,
  });*/
});

//login USer-------------
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // check emial and password form user input
  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password", 400));
  }
  const user = await User.findOne({ email }).select("+password"); // +password because in model password if bydefault is false.
  // if we not get user..
  if (!user) {
    return next(new ErrorHandler("Invalid Email and Password", 401));
  }
  //----------------
  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email and Password", 401));
  }

  /*   const token= user.getJWTToken()
      res.status(201).json({
          success:true,
          token,
           user,
      }) */ // with out wirting this much line of code we will use  this below....
  sendToken(user, 200, res);
});

// logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Successfully Logout Done",
  });
});

//Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  // get resert password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
  // protocol= host, host= localhost or other.
  const resetpasswordUrl = `{req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetpasswordUrl} \n\n If you are not requested for it, you can ignor it  `;

  try {
    await sendEmail({
      email: user.email,
      subject: `InventryManagement application Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// ------get User Details only user detials show

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("old password is Incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// update User profile
exports.updateProFile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // wehave to add cludinary later...
  const user = await User.findByIdAndUpdate(req.user.di, newUserData, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// get all users to data to (Admin) can see everyone.
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    success: true,
    message: `According to our request we got ${user.length} total number of Profiles.`,
    user,
  });
});

// get single user by (Admin can see)

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`user does not exitst with this ID: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User role BY admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// deldete user by admin
exports.deleteUserProfile = catchAsyncErrors(async (req, res, next) => {
  // wehave to remove cludinary
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`user does not exitst with this ID: ${req.params.id}`)
    );
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message:"Below User Delete Successfully....",
    user,
  });
});
