import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/slices/CartSlice";
import { useEffect } from "react";

const useGetCart = (user) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get-cart/${user._id}`
        );
        const data = await res.data;
        console.log(data);
        dispatch(setCart(data.cartItems));
      } catch (error) {
        console.log("Error fetching from cart : ", error);
      }
    };

    getCart();
  }, [user._id]);
};

export default useGetCart;
