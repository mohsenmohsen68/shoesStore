"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlBasket } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { AiOutlineMenuFold } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { getUserFavorites } from "@/root/redux/favorites/Favorites";
import { FaRegUser } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function NavBar({ isLogedIn, user }) {
  const [showMenu, setShowMenu] = useState(false);
  const [fixTop, setFixTop] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch()
  console.log("userrrr : ", user)

  const logoutHandler = () => {
    Swal.fire({
      showCancelButton: true,
      buttonsStyling: false,
      icon: "warning",
      customClass: {
        popup:
          "!relative !transform !overflow-hidden !rounded-lg !bg-white !text-left !shadow-xl !transition-all sm:!my-8 sm:!w-full sm:!max-w-lg !p-0 !grid-cols-none",
        icon: "!m-0 !mx-auto !flex !h-12 !w-12 !flex-shrink-0 !items-center !justify-center !rounded-full !border-0 !bg-red-100 sm:!h-10 sm:!w-10 !mt-5 sm!mt-6 sm:!ml-6 !col-start-1 !col-end-3 sm:!col-end-2",
        title:
          "!p-0 !pt-3 !text-center sm:!text-left !text-base !font-semibold !leading-6 !text-gray-900 !pl-4 !pr-4 sm:!pr-6 sm:!pl-0 sm:!pt-6 sm:!ml-4 !col-start-1 sm:!col-start-2 !col-end-3",
        htmlContainer:
          "!mt-2 sm:!mt-0 !m-0 !text-center sm:!text-left !text-sm !text-gray-500 !pl-4 sm:!pl-0 !pr-4 !pb-4 sm:!pr-6 sm:!pb-4 sm:!ml-4 !col-start-1 sm:!col-start-2 !col-end-3",
        actions:
          "!bg-gray-50 !px-4 !py-3 sm:!flex sm:!flex-row-reverse sm:!px-6 !w-full !justify-start !mt-0 !col-start-1 !col-end-3",
        confirmButton:
          "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto",
        cancelButton:
          "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
      },
      title: "خروج از حساب کاربری",
      text: "مطمعن هستید؟",
      confirmButtonText: "خروج",
      cancelButtonText: "انصراف"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch("/api/auth/signout", {
          method: "POST"
        });
        if (res.status === 200) {
          Swal.fire({
            buttonsStyling: false,
            icon: "success",
            customClass: {
              popup:
                "!relative !transform !overflow-hidden !rounded-lg !bg-white !text-left !shadow-xl !transition-all sm:!my-8 sm:!w-full sm:!max-w-lg !p-0 !grid-cols-none",
              icon: "!m-0 !mx-auto !flex !h-12 !w-12 !flex-shrink-0 !items-center !justify-center !rounded-full !border-0 !bg-red-100 sm:!h-10 sm:!w-10 !mt-5 sm!mt-6 sm:!ml-6 !col-start-1 !col-end-3 sm:!col-end-2",
              title:
                "!p-0 !pt-3 !text-center sm:!text-left !text-base !font-semibold !leading-6 !text-gray-900 !pl-4 !pr-4 sm:!pr-6 sm:!pl-0 sm:!pt-6 sm:!ml-4 !col-start-1 sm:!col-start-2 !col-end-3",
              htmlContainer:
                "!mt-2 sm:!mt-0 !m-0 !text-center sm:!text-left !text-sm !text-gray-500 !pl-4 sm:!pl-0 !pr-4 !pb-4 sm:!pr-6 sm:!pb-4 sm:!ml-4 !col-start-1 sm:!col-start-2 !col-end-3",
              actions:
                "!bg-gray-50 !px-4 !py-3 sm:!flex sm:!flex-row-reverse sm:!px-6 !w-full !justify-start !mt-0 !col-start-1 !col-end-3",
              confirmButton:
                "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto",
              cancelButton:
                "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            },
            title: "با موفقیت خارج شدید...",
            timer: 2000,
          });
          location.replace('/')
        }
      } else {
      }
    });
  };

  const getFavorites = async () => {

    const res = await dispatch(getUserFavorites(user._id))
    console.log("resss : ", res)
    setFavorites(res.payload.data)

  }
  useEffect(() => {

    if (user) {
      getFavorites()
    }

    if (typeof window !== "undefined") {
      const storage = JSON.parse(localStorage.getItem("cart"))
      if (storage) {
        setCartData(JSON.parse(localStorage.getItem("cart")))
      }
    }
    const fixNavBartoTop = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 90) {
        setFixTop(true);
      } else {
        setFixTop(false);
      }
    };
    window.addEventListener("scroll", fixNavBartoTop);
    return () => window.removeEventListener("scroll", fixNavBartoTop);
  }, []);
  return (
    <>
      <div
        className={`flex items-center justify-between ${fixTop ? "sticky top-0" : "absolute top-4"
          } px-4 py-[2px] bg-slate-200 z-10 sm:hidden border h-20 shadow-lg font-BYekan w-full transition-all`}
      >
        <div className='w-1/10 h-full text-center md:hidden '>
          <Image
            src={"/img/shoeshoplogo.jpg"}
            width={72}
            height={72}
            alt='logo'
            className='w-[72px] h-[72px] rounded-2xl'
          />
        </div>
        <div className='w-8/10 h-full flex  text-center items-center  text-sm md:w-5/6 md:text-xs '>
          <div className='flex justify-center items-center space-x-6 md:space-x-3'>
            <Link href={"/"} className='ml-6'>
              صفحه اصلی
            </Link>
            <div className='flex items-center'>
              <Link href={"/"}>فروشگاه</Link>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-3 h-3 mr-1'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
            </div>
            <Link href={"/"}>فروش سازمانی</Link>
            <Link href={"/aboutus"}>درباره ما</Link>
            <div className='flex items-center'>
              <Link href={"/rules"}>قوانین</Link>
            </div>
            {!isLogedIn && <Link href={"/login"}>ثبت نام/ورود</Link>}
            {isLogedIn && (
              <div className='flex relative items-center hover:cursor-pointer group'>
                <p>حساب کاربری</p>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-3 h-3 mr-1'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>

                <div className='absolute border top-5 rounded-lg bg-slate-300 invisible group-hover:visible overflow-hidden'>
                  <ul className='flex flex-col w-32 '>
                    <Link href='/p-user' className='hover:bg-slate-400 p-2'>
                      داشبورد{" "}
                    </Link>
                    <Link href='/p-user/orders' className='hover:bg-slate-400 p-2'>
                      سفارشات
                    </Link>
                    <Link href='/p-user/tickets' className='hover:bg-slate-400 p-2'>
                      تیکت های پشتیبانی
                    </Link>
                    <Link href='/p-user/comments' className='hover:bg-slate-400 p-2'>
                      پیغام ها{" "}
                    </Link>
                    <Link href='/p-user/favorites' className='hover:bg-slate-400 p-2'>
                      علاقه مندی ها
                    </Link>
                    <Link href='/p-user/settings' className='hover:bg-slate-400 p-2'>
                      تنظیمات
                    </Link>
                  </ul>
                </div>
              </div>
            )}
            <Link href={"/contactus"}>تماس با ما</Link>
          </div>
        </div>
        <div className='w-1/10 h-full text-center items-center md:w-1/6 md:px-0  '>

          <div className='flex justify-evenly gap-x-3 w-full h-full items-center  '>
            <div className="w-10 h-10 rounded-full relative  flex justify-center items-center group" >
              <div className="w-10 h-10 rounded-full relative bg-red-50 overflow-hidden flex justify-center items-center">
                {user?.img ? <Image src={user?.img} fill={true} alt="عکس پروفایل" /> : <FaRegUser className="w-5 h-5 " />}
              </div>
              <div className="flex overflow-hidden absolute top-10 w-28 rounded-md border flex-col justify-center items-center bg-slate-300 invisible group-hover:visible">
                <Link href={"/p-user"} className="w-full">
                  <div className="w-full p-2 hover:bg-slate-400 hover:cursor-pointer">حساب کاربری</div>
                </Link>
                <div className="w-full p-2 hover:bg-slate-400 hover:cursor-pointer" onClick={() => logoutHandler()}>خروج</div>
              </div>
            </div>

            <Link href={"/cart"}>
              <div className='relative'>
                <TiShoppingCart className='text-2xl' />
                {cartData.length > 0 ? <span className='absolute w-4 h-4 text-xs leading-3 -top-3 -right-2 items-center justify-center border border-white bg-white rounded-full'>
                  {cartData.length.toLocaleString("fa-IR")}
                </span> : <></>}
              </div>
            </Link>
            <Link href={"/favorites"}>
              <div className='relative'>
                <FaRegHeart className="text-xl" />
                {favorites.length > 0 ? <span className='absolute w-4 h-4 text-xs leading-3 -top-3 -right-2 items-center justify-center border border-white bg-white rounded-full'>
                  {favorites.length.toLocaleString("fa-IR")}
                </span> : <></>}
              </div>
            </Link>

          </div>
        </div>
      </div>

      <div
        className={`flex justify-between items-center ${fixTop ? "sticky top-0 " : "absolute top-4 "
          } py-[2px] hidden sm:visible sm:block h-20 bg-slate-200 z-40 m-0 w-full`}
      >
        <div className='flex justify-between items-center w-full h-full'>
          <div>
            <AiOutlineMenuFold
              className='w-10 h-10 z-20 mr-4'
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            />
          </div>
          <div>
            <img
              src='img/shoeshoplogo.jpg'
              alt='logo'
              className='w-[72px] h-[72px] rounded-2xl'
            />
          </div>
          <div className=' '>
            <div className='flex justify-center space-x-5'>
              <div className='ml-5'>
                <Link href={"/"}>
                  <div className='relative '>
                    <SlBasket className='text-xl' />
                    <span className='absolute w-4 h-4 text-xs leading-3 -top-3 -right-2 items-center justify-center bg-red-400 rounded-full'>
                      1
                    </span>
                  </div>
                </Link>
              </div>
              <Link href={"/"}>
                <div className='relative text-lg '>
                  <FaRegHeart />
                  <span className='absolute w-4 h-4 text-xs leading-3 -top-3 -right-2 items-center justify-center bg-red-400 rounded-full'>
                    3
                  </span>
                </div>
              </Link>
              <Link href={"/"}>
                <div className='relative text-lg '>
                  <FaShuffle />
                  <span className='absolute w-4 h-4 text-xs leading-3 -top-3 -right-2 items-center justify-center bg-red-400 rounded-full'>
                    2
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {showMenu && (
          <div className='w-full text-center bg-slate-200 mt-0 font-BYekan'>
            <div className='flex flex-col justify-center '>
              <Link href={"/"} className='hover:bg-slate-300 py-2'>
                صفحه اصلی
              </Link>
              <div className='flex items-center justify-center hover:bg-slate-300 py-2'>
                <Link href={"/"} className=''>
                  فروشگاه
                </Link>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-3 h-3 mr-1'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              </div>
              <Link href={"/"} className='hover:bg-slate-300 py-2'>
                فروش سازمانی
              </Link>
              <Link href={"/"} className='hover:bg-slate-300 py-2'>
                تماس با ما
              </Link>
              <div className='flex items-center  justify-center  hover:bg-slate-300 py-2'>
                <Link href={"/"}>وبلاگ</Link>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-3 h-3 mr-1'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              {!isLogedIn && (
                <Link href={"/login-register"}>ثبت نام / ورود</Link>
              )}
              {isLogedIn && (
                <div className=' flex relative items-center justify-center hover:bg-slate-300 py-2 hover: cursor-pointer group '>
                  <p>حساب کاربری</p>
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-3 h-3 mr-1'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>

                  <div className=' absolute w-full mt-4 h-0 border top-6 bg-slate-200 overflow-hidden group-hover:h-40 transition-all duration-2000 ease-in-out'>
                    <ul className='flex flex-col w-full justify-center items-center '>
                      <Link href='/' className='hover:bg-slate-300 w-full py-1'>
                        سفارشات
                      </Link>
                      <Link href='/' className='hover:bg-slate-300 w-full py-1'>
                        تیکت های پشتیبانی
                      </Link>
                      <Link href='/' className='hover:bg-slate-300 w-full py-1'>
                        پیغام ها{" "}
                      </Link>
                      <Link href='/' className='hover:bg-slate-300 w-full py-1'>
                        علاقه مندی ها
                      </Link>
                      <Link href='/' className='hover:bg-slate-300 w-full py-1'>
                        تنظیمات
                      </Link>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
