import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/slices/SearchSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import NavList from "./NavList";
import axios from "axios";
import { loginUser, setUser } from "../redux/slices/AuthSlice";
import { setCart } from "../redux/slices/CartSlice";
import { getCart } from "../helpers";
axios.defaults.withCredentials = true;

const Navbar = () => {
  const dispatch = useDispatch();
  const [toggleNav, setToggleNav] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const getUser = async () => {
    const res = await axios.get(
      "https://flavoro-backend-app.onrender.com/api/get-user",
      {
        withCredentials: true,
      }
    );
    const data = await res.data;
    console.log(data.user);
    dispatch(setUser(data.user));
    dispatch(loginUser());
  };

  getCart(user).then((data) => dispatch(setCart(data.cartItems)));

  const auth = useSelector((state) => state.auth.isAuth);

  console.log("Authenticated: ", auth);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="flex flex-col lg:flex-row justify-between gap-5 py-3 mx-6 mb-10 ">
      <div>
        <h3 className="text-xl font-bold text-gray-600">
          {new Date().toUTCString().slice(0, 16)}
        </h3>
        <h1 className="text-2xl font-bold ">Flavoro Foods</h1>
      </div>
      <div>
        <input
          type="search"
          name="search"
          id=""
          placeholder="Search here"
          autoComplete="off"
          onChange={(event) => dispatch(setSearch(event.target.value))}
          className="p-3 border text-sm rounded-lg outline-none border-gray-400 w-full lg:w-[25vw] "
        />
      </div>
      <GiHamburgerMenu
        className={`absolute top-5 right-5 lg:right-8 lg:top-6 text-2xl text-gray-600 cursor-pointer ${
          toggleNav && "hidden"
        } transition-all ease-in-out duration-500`}
        onClick={() => setToggleNav(true)}
      />
      <MdClose
        className={`absolute top-5 right-5 lg:right-8 lg:top-6 text-2xl text-gray-600 cursor-pointer ${
          !toggleNav && "hidden"
        } transition-all ease-in-out duration-500`}
        onClick={() => setToggleNav(false)}
      />
      <NavList toggleNav={toggleNav} setToggleNav={setToggleNav} auth={auth} />
    </nav>
  );
};

export default Navbar;
