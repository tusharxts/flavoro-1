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
import { Link } from "react-router-dom";
axios.defaults.withCredentials = true;

const Navbar = () => {
  const dispatch = useDispatch();
  const [toggleNav, setToggleNav] = useState(false);
  const user = useSelector((state) => state.auth.user);

  async function getUser() {
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
  }

  getCart(user).then((data) => dispatch(setCart(data.cartItems)));

  const auth = useSelector((state) => state.auth.isAuth);

  console.log("Authenticated: ", auth);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="flex flex-col lg:flex-row justify-between items-center gap-5 py-4 px-6 bg-#fdd835; shadow-lg rounded-md m-0">
      <div className="text-center lg:text-left">
        <h3 className="text-lg font-semibold text-gray-500">{}</h3>
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
          Sprincles Food
        </h1>
      </div>

      <div className="relative w-full lg:w-[30vw]">
        <input
          type="search"
          name="search"
          placeholder="Search for delicious food..."
          autoComplete="off"
          onChange={(event) => dispatch(setSearch(event.target.value))}
          className="p-3 border text-sm rounded-full outline-none border-gray-300 w-full shadow-sm focus:border-yellow-500 transition-all duration-300"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="bg-orange-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-yellow-600 transition duration-300"
          onClick={() => setToggleNav(true)}
        >
          <Link to="/Login">Login</Link>
          {/* Login */}
        </button>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-yellow-600 transition duration-300">
          <Link to="/Signup">Signup</Link>
        </button>
      </div>

      {/* <GiHamburgerMenu
        className={`absolute top-5 right-5 lg:right-8 lg:top-6 text-3xl text-gray-600 cursor-pointer ${
          toggleNav && "hidden"
        } transition-all ease-in-out duration-500`}
        onClick={() => setToggleNav(true)}
      />
      
      
      <MdClose
        className={`absolute top-5 right-5 lg:right-8 lg:top-6 text-3xl text-gray-600 cursor-pointer ${
          !toggleNav && "hidden"
        } transition-all ease-in-out duration-500`}
        onClick={() => setToggleNav(false)}
      /> */}
      <NavList toggleNav={toggleNav} setToggleNav={setToggleNav} auth={auth} />
    </nav>
  );
};

export default Navbar;
