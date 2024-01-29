const stripe = require("stripe")(
  "sk_test_51OdELlSFi1hMjAp6cC9ZsorpgOpaXD6MfH4KRfqk22sF6MLKH4xGeFGjWhSQHNYBqOegO9xl56KOHnEg2PGJ8DrP00iYi44BlQ"
);
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const YOUR_DOMAIN = "http://localhost:5173";

app.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;
  console.log("CartItems are here: ", cartItems);

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "required",
    customer_email: "customer@example.com",
    shipping_address_collection: {
      allowed_countries: ["IN", "US", "GB", "CA", "AU"],
    },
    line_items: cartItems.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: cartItems.map((item) => item.img),
          },
          unit_amount: item.price * 100,
        },
        quantity: item.qty,
      };
    }),

    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });

  res.status(200).json(session);
});

app.listen(4242, () => console.log("Running on port 4242"));
