import Cart from "./components/Cart";
import CategoryMenu from "./components/CategoryMenu";
import FoodItems from "./components/FoodItems";
import Navbar from "./components/Navbar";

export default function Home() {
  // Check if the current URL contains "/success"
  if (window.location.href.includes("/success")) {
    // Display success message or perform actions related to a successful payment
    console.log("Payment successful!");
  }
  return (
    <>
      <Navbar />
      <CategoryMenu />
      <FoodItems />
      <Cart />
    </>
  );
}
