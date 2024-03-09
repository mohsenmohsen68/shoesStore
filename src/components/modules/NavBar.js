"use client"
import React from "react";
import Link from "next/link";
import { SlBasket } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { useState } from "react"; 

export default function NavBar() {
  const [showUser, setShowUser] = useState(false);
  return (
    <div className="flex justify-between p-6 items-center container w-screen border mt-4 fixed inset-0 h-20 bg-stone-50 dark:bg-stone-700 shadow-lg ">
      <div className="w-1/6 text-center ">
        <img
          src="img/shoeshoplogo.jpg"
          alt="logo"
          className="w-[72px] h-[72px] rounded-2xl"
        />
      </div>
      <div className="w-2/3 text-center ">
        <div className="flex justify-center space-x-6">
          <Link href={"/"} className="ml-6">
            صفحه اصلی
          </Link>
          <div className="flex items-center">
            <Link href={"/"}>فروشگاه</Link>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <Link href={"/"}>فروش سازمانی</Link>
          <Link href={"/"}>تماس با ما</Link>
          <div className="flex items-center">
            <Link href={"/"}>وبلاگ</Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* <Link href={"/"}>ثبت نام / ورود</Link> */}
          <div
            className="flex relative items-center hover: cursor-pointer "
            onClick={() => {
              setShowUser(!showUser);
              console.log(showUser);
            }}
          >
            <p>حساب کاربری</p>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {showUser && 
            <div className=" absolute border top-8 z-10 ">
              <ul className="flex flex-col space-y-4 w-32 ">
                <Link href="/" className="hover:bg-slate-500">سفارشات</Link>
                <Link href="/">تیکت های پشتیبانی</Link>
                <Link href="/">پیغام ها </Link>
                <Link href="/">علاقه مندی ها</Link>
                <Link href="/">تنظیمات</Link>
              </ul>
            </div>}
          </div>
          
        </div>
      </div>
      <div className="w-1/6 text-center ">
        <div className="flex justify-center space-x-5">
          <div className="ml-5">
            <Link href={"/"}>
              <div className="relative ">
                <SlBasket className="text-xl" />
                <span className="absolute w-4 h-4 text-xs leading-3 -top-3 -right-2 items-center justify-center bg-red-400 rounded-full">
                  1
                </span>
              </div>
            </Link>
          </div>
          <Link href={"/"}>
            <div className="relative text-lg ">
              <FaRegHeart />
              <span className="absolute w-4 h-4 text-xs leading-3 -top-3 -right-2 items-center justify-center bg-red-400 rounded-full">
                3
              </span>
            </div>
          </Link>
          <Link href={"/"}>
            <div className="relative text-lg ">
              <FaShuffle />
              <span className="absolute w-4 h-4 text-xs leading-3 -top-3 -right-2 items-center justify-center bg-red-400 rounded-full">
                2
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
