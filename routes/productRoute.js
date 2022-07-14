const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deletProdcut,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productControler");
const {
  isAuthenticatedUser,
  authroizeRoles,
} = require("../middleware/authentication");

const router = express.Router();

router.route("/products").get(getAllProducts); // we use our controller.

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authroizeRoles("admin"), createProduct); // we use this to create new Product

// delet, update, get-------------------
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authroizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authroizeRoles("admin"), deletProdcut);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
