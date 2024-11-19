import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    price: Number,
    totalPrice: Number,
    rating: Number,
    image: String,
    quantity: Number,
    userId: String,
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;
