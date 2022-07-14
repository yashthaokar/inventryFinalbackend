const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  getUserDetails,
  updatePassword,
  updateProFile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUserProfile,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  authroizeRoles,
} = require("../middleware/authentication");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/logout").get(logout);

router.route("/user").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/user/update").put(isAuthenticatedUser, updateProFile);

// admin can access this routes
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authroizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authroizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authroizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authroizeRoles("admin"), deleteUserProfile);

module.exports = router;
