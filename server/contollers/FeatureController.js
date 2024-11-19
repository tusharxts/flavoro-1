import User from "../models/User.js";
import Food from "../models/Food.js";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51Pr2Y7RqZVvd8Y477jHJVObEZ2V5YvEnnOfiAdttav09BghYw9kOg3jZjA252TEZOuWolKcs9RqblTJEiLadZLo900ZVt85pBT");

// Add to Cart
export const addToCart = async (req, res) => {
  const userId = req.params.id;
  const { id, name, price, rating, image, quantity } = req.body;

  try {
    let existingItem = await Food.findOne({ id, userId });
    console.log("Existing Item", existingItem);

    if (existingItem) {
      let updatedItem = await Food.findOneAndUpdate(
        { id, userId },
        {
          $set: {
            quantity: existingItem.quantity + 1,
            totalPrice: existingItem.price * (existingItem.quantity + 1),
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      if (!updatedItem) {
        return res
          .status(404)
          .json({ success: false, message: "Failed adding to cart" });
      }
      return res.status(201).json({ success: true, message: "Added to cart" });
    }

    let newFood = await Food.create({
      id,
      name,
      price,
      rating,
      image,
      quantity,
      userId,
      totalPrice: price * quantity,
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

// Get Cart
export const getCart = async (req, res) => {
  const userId = req.params.id;

  try {
    const cartItems = await Food.find({ userId });
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

// Remove from Cart
export const removeFromCart = async (req, res) => {
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

// Increment Quantity
export const incrementQuantity = async (req, res) => {
  const id = req.params.id;

  try {
    let food = await Food.findOneAndUpdate(
      { _id: id },
      [
        {
          $set: {
            quantity: { $add: ["$quantity", 1] },
            totalPrice: { $multiply: ["$price", { $add: ["$quantity", 1] }] },
          },
        },
      ],
      {
        upsert: true,
        new: true,
      }
    );

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Food quantity incremented", food });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Decrement Quantity
export const decrementQuantity = async (req, res) => {
  const id = req.params.id;

  try {
    let food = await Food.findOneAndUpdate(
      { _id: id, quantity: { $gt: 0 } },
      [
        {
          $set: {
            quantity: { $subtract: ["$quantity", 1] },
            totalPrice: {
              $subtract: ["$totalPrice", "$price"],
            },
          },
        },
      ],
      {
        upsert: true,
        new: true,
      }
    );

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found or quantity already at the minimum",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Food quantity decremented", food });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Checkout
export const checkout = async (req, res) => {
  const userId = req.id;
  try {
    const cartItems = await Food.find({ userId });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173",
    });

    res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Clear Cart
export const clearCart = async (req, res) => {
  const userId = req.id;

  try {
    await Food.deleteMany({ userId });
    await User.findOneAndUpdate({ _id: userId }, { cartItems: [] });

    return res.status(200).json({ success: true, message: "Order Confirmed" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
