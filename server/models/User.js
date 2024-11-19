import mongoose from "mongoose";
import Food from "../models/Food";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cartItems: {
    type: Array,
    default: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
  },
  otp: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
