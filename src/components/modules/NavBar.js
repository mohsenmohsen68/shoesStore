"use client";
import React from "react";
import Link from "next/link";
import { SlBasket } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { AiOutlineMenuFold } from "react-icons/ai";
import {useState} from 'react'

export default function NavBar() {
  const [showMenu, setShowMenu]= useState(false)
  return (
    <>
      <div className="flex sm:invisible justify-between p-6 items-center container w-screen border mt-4 fixed inset-0 h-20 bg-stone-50 dark:bg-stone-700 shadow-lg z-20 ">
        <div className="w-1/8 text-center md:invisible md:w-0">
          <img
            src="img/shoeshoplogo.jpg"
            alt="logo"
            className="w-[72px] h-[72px] rounded-2xl"
          />
        </div>
        <div className="w-5/8 text-center text-sm md:text-xs ">
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
            <div className="flex relative items-center hover:cursor-pointer group">
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

              <div className="absolute border top-5 rounded-lg bg-slate-300 invisible group-hover:visible ">
                <ul className="flex flex-col w-32 ">
                  <Link href="/" className="hover:bg-slate-400 py-1">
                    سفارشات
                  </Link>
                  <Link href="/" className="hover:bg-slate-400 py-1">
                    تیکت های پشتیبانی
                  </Link>
                  <Link href="/" className="hover:bg-slate-400 py-1">
                    پیغام ها{" "}
                  </Link>
                  <Link href="/" className="hover:bg-slate-400 py-1">
                    علاقه مندی ها
                  </Link>
                  <Link href="/" className="hover:bg-slate-400 py-1">
                    تنظیمات
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/8 text-center  ">
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

      <div className="flex invisible sm:visible sm:flex-col justify-between p-6 items-center container w-screen border mt-4 fixed inset-0 h-20 bg-stone-50 dark:bg-stone-700 shadow-lg z-20 ">
        <div className="flex justify-between items-center w-full h-full">
          <div>
            <AiOutlineMenuFold className="w-10 h-10" onClick={()=>{ setShowMenu(!showMenu) }}/>
          </div>
          <div className=" ">
            <img
              src="img/shoeshoplogo.jpg"
              alt="logo"
              className="w-[72px] h-[72px] rounded-2xl"
            />
          </div>
          <div className=" ">
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
        {showMenu && (
          <div className="w-screen text-center bg-red-200 mt-6">
          <div className="flex flex-col justify-center ">
            <Link href={"/"} className="hover:bg-red-400 py-2">
              صفحه اصلی
            </Link>
            <div className="flex items-center justify-center hover:bg-red-400 py-2">
              <Link href={"/"} className="">فروشگاه</Link>
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
            <Link href={"/"} className="hover:bg-red-400 py-2">فروش سازمانی</Link>
            <Link href={"/"} className="hover:bg-red-400 py-2">تماس با ما</Link>
            <div className="flex items-center  justify-center  hover:bg-red-400 py-2">
              <Link href={"/"} >وبلاگ</Link>
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
              className=" flex relative items-center justify-center hover:bg-red-400 py-2 hover: cursor-pointer group "
            >
              <p >حساب کاربری</p>
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

              <div className=" absolute w-full mt-4 h-0 border top-6 bg-red-100 overflow-hidden group-hover:h-40 transition-all duration-2000 ease-in-out  ">
                <ul className="flex flex-col w-full justify-center items-center ">
                  <Link href="/" className="hover:bg-red-200 w-full py-1">
                    سفارشات
                  </Link>
                  <Link href="/" className="hover:bg-red-200 w-full py-1">
                    تیکت های پشتیبانی
                  </Link>
                  <Link href="/" className="hover:bg-red-200 w-full py-1">
                    پیغام ها{" "}
                  </Link>
                  <Link href="/" className="hover:bg-red-200 w-full py-1">
                    علاقه مندی ها
                  </Link>
                  <Link href="/" className="hover:bg-red-200 w-full py-1">
                    تنظیمات
                  </Link>
                </ul>
              </div>
           
            </div>
              </div>
        </div>
        )}
      </div>
    </>
  );
}
