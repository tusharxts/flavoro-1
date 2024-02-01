const User = require("../models/User");
const Food = require("../models/Food");

const addToCart = async (req, res) => {
  const userId = req.params.id;
  const { id, name, price, rating, image, quantity } = req.body;

  try {
    let newFood = await Food.create({
      id,
      name,
      price,
      rating,
      image,
      quantity,
      userId,
    });
    const savedFood = await newFood.save();
    let user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          cartItems: savedFood._id,
        },
      }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Failed adding to cart" });
    }

    return res.status(201).json({ success: true, message: "Added to cart" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getCart = async (req, res) => {
  const userId = req.params.id;

  try {
    const cartItems = await Food.find({ userId });
    console.log(cartItems);
    if (!cartItems) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, cartItems });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const id = req.params.id;
  console.log("Id from params", id);

  try {
    let food = await Food.findOneAndDelete({ _id: id });

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Food removed from cart" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const incrementQuantity = async (req, res) => {
  const id = req.params.id;

  try {
    let food = await Food.findOneAndUpdate(
      { id },
      [
        {
          $set: {
            quantity: { $add: ["$quantity", 1] },
            price: { $multiply: ["$price", { $add: ["$quantity", 1] }] },
          },
        },
      ],
      {
        upsert: true,
        new: true, // To return the updated document
      }
    );
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Food quantity incremented" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const decrementQuantity = async (req, res) => {
  const id = req.body.id;

  try {
    let food = await Food.findOneAndUpdate(
      { id },
      {
        $inc: { quantity: -1, price: food.price + food.price },
      },
      {
        upsert: true,
      }
    );

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Food quantity decremented",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  getCart,
};
