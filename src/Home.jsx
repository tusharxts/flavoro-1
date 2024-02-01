import { useEffect } from "react";
import Cart from "./components/Cart";
import CategoryMenu from "./components/CategoryMenu";
import FoodItems from "./components/FoodItems";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <CategoryMenu />
      <FoodItems />
      <Cart />
    </>
  );
}
