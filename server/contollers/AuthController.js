import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

// SIGNUP ROUTE
export const signup = async (req, res) => {
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
      .json({ success: true, message: "Signup Successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN ROUTE
export const login = async (req, res) => {
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

    const jwtSecret = process.env.JWT_SECRET || "default-secret";
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });

    return res
      .cookie("token", token, {
        httpOnly: false,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ success: true, message: "Login Successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGOUT ROUTE
export const logout = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .json({ success: true, message: "Logout Successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET USER ROUTE
export const getUser = async (req, res) => {
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

// RESET PASSWORD ROUTE
export const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const generatedOtp = Math.floor(Math.random() * 10000); // 4 digit otp

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Please Signup" });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2242e16b435b21",
        pass: "5e868c15705c32",
      },
    });

    const info = await transporter.sendMail({
      from: "odin06190@gmail.com", // sender address
      to: email, // list of receivers
      subject: "New OTP has been generated", // Subject line
      html: `<h3>Your Generated OTP is: <i>${generatedOtp}</i></h3>`, // html body
    });

    if (info.messageId) {
      await User.findOneAndUpdate(
        { email },
        { $set: { otp: generatedOtp } }
      );

      return res
        .status(200)
        .json({ success: true, message: "OTP has been sent to your email" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// VERIFY OTP ROUTE
export const verifyOtp = async (req, res) => {
  const { otp, newPassword } = req.body;

  try {
    const securePassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOneAndUpdate(
      { otp },
      {
        $set: { password: securePassword, otp: 0 },
      }
    );

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    return res.status(200).json({ success: true, message: "Password Updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
