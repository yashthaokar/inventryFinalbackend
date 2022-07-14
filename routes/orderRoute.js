const express = require("express");
const router = express.Router();
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const {
  isAuthenticatedUser,
  authroizeRoles,
} = require("../middleware/authentication");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/user").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authroizeRoles("admin"), getAllOrders);

router
  .route("/admin/orders/:id")
  .put(isAuthenticatedUser, authroizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authroizeRoles("admin"), deleteOrder);

module.exports = router;
