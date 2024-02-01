const router = require("express").Router();
const {
  signup,
  login,
  logout,
  getUser,
  resetPassword,
  verifyOtp,
} = require("./contollers/AuthController");
const {
  decrementQuantity,
  addToCart,
  removeFromCart,
  incrementQuantity,
  getCart,
} = require("./contollers/FeatureController");
const { verifyToken } = require("./middlewares/verifyToken");

// AUTH ROUTES
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.put("/reset-password", resetPassword);
router.put("/verify-otp", verifyOtp);
router.get("/get-user", verifyToken, getUser);

// FEATURE ROUTES
router.post("/add-to-cart/:id", addToCart);
router.get("/get-cart/:id", getCart);
router.delete("/remove-from-cart/:id", removeFromCart);
router.put("/increment-quantity/:id", incrementQuantity);
router.put("/decrement-quantity/:id", decrementQuantity);

module.exports = router;
