// "use client"
import React from "react";
import NumberToPersianWord from "number_to_persian_word";
import { Button } from "flowbite-react";
import Link from "next/link";
import { TiStar } from "react-icons/ti";

export default function ProductBox({ product, children }) {

  console.log("ffff : ", product)
  return (
    <Link href={`/products/${product._id}`}>
      <div data-aos="fade-up" className="flex flex-col w-56 h-[380px] z-0 justify-start overflow-hidden hover:cursor-pointer shadow-xl dark:shadow-yellow-50 dark:shadow-sm border-gray-200 mb-0 dark:bg-slate-800">
        <div className="w-full overflow-hidden relative group h-1/2">
          <img
            src={product.img[0] || "/img/banner4.jpg"}
            alt="shoe"
            className="hover:scale-125 transition-transform duration-500"
          />
          <Button
            outline
            pill
            gradientDuoTone="purpleToPink"
            className="absolute hidden top-2 left-11 group-hover:block"
          >
            افزودن به سبد خرید
          </Button>

        </div>
        <div className="px-2 font-BYekan flex flex-col justify-evenly h-1/2">
          <h1 className="text-xl font-BYekan self-center"> {product.name} </h1>
          <h1 className="text-base font-BYekan self-center">  {product.model} {product.suitableFor === "MAN" ? "مردانه" : product.suitableFor === "WOMAN" ? "زنانه" : "بچگانه"} </h1>

          <div className="flex w-full justify-between">
            <div className="font-BYekan">قیمت</div>
            <p className="font-BYekan">
              {NumberToPersianWord.convertEnToPe(product.price)} تومان
            </p>
          </div>
          <div className="flex w-full px-1 justify-between">
            <p className="font-BYekan">سایز</p>
            <div className="flex justify-start items-center ">
              {product.size.map((item, index) => <p key={index} className="border-1 flex justify-center items-center px-1 border-fuchsia-900 text-fuchsia-900 rounded-md">
                {NumberToPersianWord.convertEnToPe(item)}
              </p>)}
            </div>
          </div>
          <div className="flex w-full px-1 justify-between">
            <p className="font-BYekan">رنگ</p>
            <div className="flex justify-start gap-2 items-center">
              {product.color.map((item, index) => (
                <div key={index} style={{ backgroundColor: item }} className={`w-4 h-4 border border-gray-200`}></div>
              ))}
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="flex">
            {Array(product.wholeScore).fill(1).map(item => <TiStar className="text-yellow-300 text-2xl" />)}
            {Array(5 - product.wholeScore).fill(1).map(item => <TiStar className="text-gray-200 text-2xl" />)}
            </div>
          </div>
        </div>
        {children}
      </div>
    </Link>

  );
}
