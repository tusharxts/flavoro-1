import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, setCart } from "../redux/slices/CartSlice";
import { incrementQty, decrementQty } from "../redux/slices/CartSlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { getCart } from "../helpers";

const ItemCard = ({ id, image, name, price, quantity, _id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const removeFromCart = async (id) => {
    const res = await axios.delete(
      `https://flavoro-backend-app.onrender.com/api/remove-from-cart/${id}`
    );
    const data = await res.data;
    console.log(data);
    toast.success(data.message);
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  };

  const incrementQuantity = async (id) => {
    const res = await axios.put(
      `https://flavoro-backend-app.onrender.com/api/increment-quantity/${id}`
    );
    const data = await res.data;
    console.log(data);
    toast.success(data.message);
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  };

  const decrementQuantity = async (id) => {
    const res = await axios.put(
      `https://flavoro-backend-app.onrender.com/api/decrement-quantity/${id}`
    );
    const data = await res.data;
    console.log(data);
    toast.success(data.message);
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  };

  return (
    <div className="flex gap-2 shadow-lg rounded-lg p-2 bg-white mb-3">
      <MdDelete
        className="absolute right-7 text-gray-600 cursor-pointer"
        onClick={() => {
          removeFromCart(_id);
        }}
      />
      <img src={image} alt="pizza" className="w-[50px] h-[50px] my-auto" />
      <div className="bg-white leading-5 ">
        <h2 className="bg-white font-bold text-gray-800">{name}</h2>
        <div className="flex justify-between items-center w-full bg-white">
          <span className="text-green-500 font-bold bg-white mt-1">
            ₹{price}
          </span>
          <div className="flex justify-center items-center gap-2 bg-white absolute right-7">
            <AiOutlineMinus
              onClick={() =>
                quantity > 1 ? decrementQuantity(_id) : quantity == 0
              }
              className="bg-white border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none cursor-pointer transition-all ease-linear font-bold p-1 text-xl rounded-md"
            />
            <span className="text-green-500 font-semibold bg-white text-center select-none ">
              {quantity}
            </span>
            <AiOutlinePlus
              onClick={() =>
                quantity >= 1 ? incrementQuantity(_id) : quantity == 0
              }
              className="bg-white border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none cursor-pointer transition-all ease-linear font-bold p-1 text-xl rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
