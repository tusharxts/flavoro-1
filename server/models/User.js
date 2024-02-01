const mongoose = require("mongoose");
const Food = require("./Food");

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
        ref: "food",
      },
    ],
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
