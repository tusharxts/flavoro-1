import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../redux/slices/CartSlice";
import axios from "axios";
import toast from "react-hot-toast";

const FoodCard = ({ id, img, name, price, desc, handleToast, rating }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const addToCart = async ({ id, img, name, rating, price, quantity }) => {
    const res = await axios.post(
      `http://localhost:5000/api/add-to-cart/${user._id}`,
      { id, image: img, name, rating, price, quantity }
    );
    const data = await res.data;
    toast.success(data.message);
  };

  return (
    <div className="font-bold w-[250px] p-5 bg-white flex flex-col gap-2 rounded-lg">
      <img
        src={img}
        srcSet=""
        className="w-auto h-[130px] hover:scale-110 cursor-grab overflow-hidden transition-all duration-500 ease-in-out rounded-lg"
      />
      <div className="text-sm flex justify-between bg-white">
        <h2 className="bg-white">{name}</h2>
        <span className="text-green-500 bg-white"> ₹{price}</span>
      </div>
      <p className="text-sm font-normal bg-white">{desc.slice(0, 50)}...</p>
      <div className="flex justify-between bg-white">
        <span className=" flex justify-center items-center bg-white">
          <AiFillStar className="mr-1 text-yellow-400 bg-white" /> {rating}
        </span>
        <button
          className="p-1 text-white bg-green-500 hover:bg-green-600 rounded-lg text-sm"
          onClick={() => {
            !user
              ? toast.error("Please login to add to cart")
              : addToCart({ id, img, name, rating, price, quantity: 1 });
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
