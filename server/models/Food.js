const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    price: Number,
    rating: Number,
    image: String,
    quantity: Number,
    userId: String,
  },
  { timestamps: true }
);

const Food = mongoose.model("food", foodSchema);
module.exports = Food;
