import React from "react";
import FoodCard from "./FoodCard";
import { useSelector } from "react-redux";
import FoodData from "../data/FoodData";
import toast, { Toaster } from "react-hot-toast";

const FoodItems = () => {
  const category = useSelector((state) => state.category.category);
  const search = useSelector((state) => state.search.search);
  const handleToast = (name) => toast.success(`Added ${name}`);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-wrap justify-center md:justify-start items-center w-fit gap-10 mx-6 my-10" id="fbg">
        {FoodData.filter((food) => {
          if (category === "All") {
            return food.name.toLowerCase().includes(search.toLowerCase());
          } else {
            return (
              category === food.category &&
              food.name.toLowerCase().includes(search.toLowerCase())
            );
          }
        }).map((food) => (
          <FoodCard
            key={food.id}
            name={food.name}
            img={food.img}
            price={food.price}
            desc={food.desc}
            id={food.id}
            rating={food.rating}
            handleToast={handleToast}
          />
        ))}
      </div>
    </>
  );
};

export default FoodItems;
