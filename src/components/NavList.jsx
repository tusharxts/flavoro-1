import { Link } from "react-router-dom";

const NavList = ({ toggleNav, setToggleNav }) => {
  return (
    <div
      className={`${
        !toggleNav && "translate-x-[200px]"
      } absolute top-12 right-5 lg:right-8 p-3 w-fit bg-white bg-opacity-10 backdrop-blur-sm flex flex-col justify-center items-start rounded-lg shadow-md border border-white font-bold text-gray-600 transition-all duration-500 ease-in-out `}
    >
      <Link to="/login" className="hover:text-black select-none">
        Login
      </Link>
      <Link to="/signup" className="hover:text-black select-none">
        Signup
      </Link>
    </div>
  );
};

export default NavList;
