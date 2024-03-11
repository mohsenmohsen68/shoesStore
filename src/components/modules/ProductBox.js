"use client";
import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import NumberToPersianWord from "number_to_persian_word";
import { Button } from "flowbite-react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

export default function ProductBox() {
  const [heartfill, setHeartFill] = useState(false);
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div className="flex flex-col w-56 h-[340px] z-0 justify-center rounded-lg overflow-hidden hover:cursor-pointer border-2 border-gray-200 mb-0">
      <div className="w-full h-2/3 overflow-hidden relative group">
        <img
          src="/img/banner4.jpg"
          alt="shoe"
          className="hover:scale-125 transition-transform duration-500"
        />
        <Button
          outline
          pill
          gradientDuoTone="purpleToPink"
          className="absolute invisible top-2 left-11 group-hover:visible"
        >
          افزودن به سبد خرید
        </Button>
        {heartfill ? (
          <GoHeartFill onClick={()=>setHeartFill(false)} className="absolute text-white text-2xl invisible top-2/3 left-4 group-hover:visible" />
        ) : (
          <GoHeart onClick={()=>setHeartFill(true)} className="absolute text-white text-2xl invisible top-2/3 left-4 group-hover:visible" />
        )}
      </div>
      <div className="px-3 my-0 pb-3">
        <h1 className="text-xl"> کفش اسپرت مردانه </h1>
        <h1 className="text-base"> مدل نایکی SB dunk </h1>
        <Rating value={2} readOnly />
        <p className="font-BYekan">
          {NumberToPersianWord.convertEnToPe(420000)} تومان
        </p>
        <p>سایز</p>
        <div className="flex justify-evenly items-center w-4/5">
          <p className="border-2 px-1 border-fuchsia-900 text-fuchsia-900 rounded-full">
            {NumberToPersianWord.convertEnToPe(41)}
          </p>
          <p className="border-2 px-1 border-fuchsia-900 text-fuchsia-900 rounded-full">
            {NumberToPersianWord.convertEnToPe(42)}
          </p>
          <p className="border-2 px-1 border-fuchsia-900 text-fuchsia-900 rounded-full">
            {NumberToPersianWord.convertEnToPe(43)}
          </p>
          <p className="border-2 px-1 border-fuchsia-900 text-fuchsia-900 rounded-full">
            {NumberToPersianWord.convertEnToPe(44)}
          </p>
        </div>
        <p>رنگ</p>
        <div className="flex justify-evenly items-center w-2/3">
          <div className="w-4 h-4 bg-black "></div>
          <div className="w-4 h-4 bg-white border-2 border-gray-200 "></div>
          <div className="w-4 h-4 bg-green-800 "></div>
          <div className="w-4 h-4 bg-yellow-400 "></div>
        </div>
      </div>
    </div>
  );
}
