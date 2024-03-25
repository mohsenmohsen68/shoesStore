"use client";
import React,{useState} from "react";

function AddToShoppingCart() {
  const [productCount, setProductCount] = useState(0);
  return (
    <div className="flex items-center ">
      <div className="flex justify-center items-center ml-9">
        <div className="border-[1px] p-2 transition-all hover:cursor-pointer hover:bg-slate-400 " onClick={(event) => setProductCount((prev) => prev - 1)}>-</div>
        <div className="border-[1px] p-2 transition-all hover:cursor-pointer hover:bg-slate-400"> {productCount} </div>
        <div className="border-[1px] p-2 transition-all hover:cursor-pointer hover:bg-slate-400" onClick={(event) => setProductCount((prev) => prev + 1)}>+</div>
      </div>
      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
        <span className="font-BYekan relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          افزودن به سبد خرید{" "}
        </span>
      </button>
    </div>
  );
}

export default AddToShoppingCart;
