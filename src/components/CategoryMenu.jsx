import React, { useState, useEffect } from "react";
import FoodData from "../data/FoodData";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/slices/CategorySlice";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);

  const listUniqueCategories = () => {
    const uniqueCategories = [
      ...new Set(FoodData.map((item) => item.category)),
    ];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    listUniqueCategories();
  }, []);

  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category.category);

  return (
    <div className="ml-6">
      <h3 className="text-xl font-semibold">Find the best food</h3>
      <div className="my-5 overflow-x-scroll scroll-hide flex gap-3 lg:overflow-x-hidden">
        <button
          onClick={() => dispatch(setCategory("All"))}
          className={`px-3 py-2 scroll-smooth  text-center bg-gray-200 font-bold hover:bg-green-500 hover:text-white cursor-pointer rounded-lg ${
            selectedCategory === "All" && "bg-green-500 text-white"
          }}`}
        >
          All
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => dispatch(setCategory(category))}
            className={`px-3 py-2 scroll-smooth  text-center bg-gray-200 font-bold hover:bg-green-500 hover:text-white cursor-pointer rounded-lg ${
              selectedCategory === category && "bg-green-500 text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
