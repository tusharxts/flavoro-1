import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ItemCard from "./ItemCard";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [activeCart, setActiveCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);

  const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`fixed right-0 top-0 w-screen h-full lg:w-[20vw] p-5 bg-white ${
          activeCart ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 z-50`}
      >
        <div className="flex justify-between items-center bg-white my-3">
          <span className="bg-white text-xl font-bold text-gray-800 ">
            My Order
          </span>
          <IoMdClose
            onClick={() => setActiveCart(!activeCart)}
            className="bg-white border-2 border-gray-600 text-gray-600 font-bold p-1 text-xl rounded-md hover:text-red-300 hover:border-red-300 cursor-pointer"
          />
        </div>

        {cartItems.length > 0 ? (
          cartItems.map((food) => (
            <ItemCard
              key={food.id}
              id={food.id}
              name={food.name}
              price={food.price}
              img={food.img}
              qty={food.qty}
            />
          ))
        ) : (
          <h2 className="text-center text-xl font-bold text-gray-800">
            Your cart is empty
          </h2>
        )}

        <div className="absolute bottom-0 bg-white">
          <h3 className="bg-white font-semibold text-gray-800 select-none">
            Items : <span className="text-green-500 bg-white ">{totalQty}</span>
          </h3>
          <h3 className="bg-white font-semibold text-gray-800 select-none">
            Total Amount :
            <span className="text-green-500 bg-white "> ₹{totalPrice}</span>
          </h3>
          <hr className="lg:w-[18vw] w-[90vw] my-2 " />

          <button
            onClick={() => navigate("/success")}
            className="bg-green-500 font-bold px-3 text-white py-2 rounded-lg lg:w-[18vw] w-[90vw] mb-5"
          >
            Checkout
          </button>
        </div>
      </div>
      <FaShoppingCart
        onClick={() => {
          setActiveCart(!activeCart);
        }}
        className={` rounded-full cursor-pointer  p-3 text-5xl fixed bottom-10 lg:bottom-4 right-4 shadow-md bg-white ${
          totalQty > 0 && "animate-bounce delay-500 transition-all"
        }  ${activeCart && "hidden"} `}
      />
    </>
  );
};

export default Cart;
