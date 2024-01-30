const router = require("express").Router();
const {
  signup,
  login,
  logout,
  getUser,
} = require("./contollers/AuthController");
const { resetPassword } = require("./contollers/FeatureController");
const { verifyToken } = require("./middlewares/verifyToken");

// AUTH ROUTES
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.put("/reset-password", resetPassword);
router.get("/get-user", verifyToken, getUser);

// FEATURE ROUTES

module.exports = router;
