const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgetPasswordController,
  updateProfileController,
  // getOrdersController,
  // getAllOrdersController,
  // orderStatusController
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post("/register", registerController); // registerController created in controller folder(authController)

// LOGIN || METHOD POST
router.post("/login", loginController); // loginController created in controller folder(

// FORGET PASSWORD || METHOD POST
router.post("/forget-password", forgetPasswordController); // forgetPasswordController created in controller folder(

// test routes
router.get("/test", requireSignIn, isAdmin, testController); // loginController created in controller folder(
// we can add any no of middleware between them

// protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController); // loginController created in controller folder(

// //orders
// router.get("/orders", requireSignIn, getOrdersController);

// //all orders
// router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// // order status update
// router.put(
//   "/order-status/:orderId",
//   requireSignIn,
//   isAdmin,
//   orderStatusController
// );

module.exports = router;
