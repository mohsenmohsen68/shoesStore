import React from "react";
import NumberToPersianWord from "number_to_persian_word";
import { Button } from "flowbite-react";
import Link from "next/link";

export default function ProductBox({product }) {

  console.log("ffff : ",product)
  return (
    <Link href={`/products/${product._id}`}>
    <div data-aos="fade-up" className="flex flex-col w-56 h-[340px] z-0 justify-center  overflow-hidden hover:cursor-pointer shadow-xl border-gray-200 mb-0">
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
          className="absolute hidden top-2 left-11 group-hover:block"
        >
          افزودن به سبد خرید
        </Button>
       
      </div>
      <div className="px-3 my-0 pb-3 font-BYekan">
        <h1 className="text-xl font-BYekan"> کفش {product.model} {product.suitableFor} </h1>
        <h1 className="text-base font-BYekan"> مدل {product.name} </h1>
        {/* <Rating value={2} readOnly /> */}
        <p className="font-BYekan">
          {NumberToPersianWord.convertEnToPe(product.price)} تومان
        </p>
        <p>سایز</p>
        <div className="flex justify-evenly items-center w-4/5">
         {product.size.map((item,index) => <p key={index} className="border-2 flex justify-center items-center px-2 border-fuchsia-900 text-fuchsia-900 rounded-full">
            {NumberToPersianWord.convertEnToPe(item)}
          </p>)}
          
        </div>
        <p>رنگ</p>
        <div className="flex justify-evenly items-center w-2/3">
          
          {product.color.map((item, index)=> {
            if(item === "مشکی"){
              return <div key={index} className={`w-4 h-4 bg-black border-2 border-gray-200 `}></div>
            }else 
            if(item === "سفید"){
              return <div key={index} className={`w-4 h-4 bg-white border-2 border-gray-200 `}></div>
            }else 
            if(item === "زرد"){
              return <div key={index} className={`w-4 h-4 bg-yellow-500 border-2 border-gray-200 `}></div>
            }else if(item === "قهوه ای"){
              return <div key={index} className={`w-4 h-4 bg-amber-800 border-2 border-gray-200 `}></div>
            }else 
            if(item === "قرمز"){
              return <div key={index} className={`w-4 h-4 bg-red-500 border-2 border-gray-200 `}></div>
            }else 
            if(item === "توسی"){
              return <div key={index} className={`w-4 h-4 bg-gray-500 border-2 border-gray-200 `}></div>
            }else 
            if(item === "سبز"){
              return <div key={index} className={`w-4 h-4 bg-green-500 border-2 border-gray-200 `}></div>
            }
            }
          )}
        </div>
      </div>
    </div>
    </Link>
    
  );
}
