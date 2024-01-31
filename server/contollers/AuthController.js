const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SIGNUP ROUTE
const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, message: "Please Login" });
    }

    const securePassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: securePassword,
    });

    await user.save();

    return res
      .status(201)
      .json({ success: true, message: "Singup Successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN ROUTE
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Please Signup" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, messgae: "Login Successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGOUT ROUTE
const logout = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .json({ success: true, message: "Logout Successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET USER ROUTE
const getUser = async (req, res) => {
  const reqId = req.id;

  try {
    let user = await User.findById(reqId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "User found", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { signup, login, logout, getUser };
