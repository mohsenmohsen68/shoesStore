import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaRegComments } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaShoePrintsSolid } from "react-icons/lia";
import Link from "next/link";
import SideBarLogout from "./SideBarLogout";

function SideBar() {
  return (
    <div className='w-full h-full '>
      <div className='h-20 flex justify-center hover:bg-gray-100 items-center shadow-lg hover:border-l-8 hover:border-sky-500 hover:cursor-pointer transition-all ease-in-out '>
        خوش آمدی محسن عزیز
      </div>
      <div className='h-[calc(100%-160px)]  flex flex-col justify-start  items-center shadow-lg'>
        <Link href={'/p-user'} className="w-full">
        <div className='flex w-full h-10 px-2 py-8 hover:bg-gray-100 hover:border-l-8 hover:border-sky-500 hover:cursor-pointer transition-all ease-in-out'>
          <div className='w-1/6 flex justify-center items-center'>
            <LuLayoutDashboard className='text-2xl text-sky-500' />
          </div>
          <div className='w-5/6 flex justify-start items-center'>داشبورد</div>
        </div>
        </Link>
        <Link href={'/p-admin/tickets'} className="w-full">
        <div className='flex w-full h-10 p-2 hover:bg-gray-100 hover:border-l-8 hover:border-sky-500 hover:cursor-pointer transition-all ease-in-out'>
          <div className='w-1/6 flex justify-center items-center'>
            <MdOutlineSupportAgent className='text-2xl text-orange-500' />
          </div>
          <div>تیکت ها</div>
        </div>
        </Link>
        <Link href={'/p-admin/comments'} className="w-full">

        <div className='flex w-full h-10 p-2 hover:bg-gray-100 hover:border-l-8 hover:border-sky-500 hover:cursor-pointer transition-all ease-in-out'>
          <div className='w-1/6 flex justify-center items-center'>
            <FaRegComments className='text-2xl text-sky-500' />
          </div>
          <div>کامنت ها </div>
        </div>
        </Link>
        <Link href={'/p-admin/orders'} className="w-full">
        <div className='flex w-full h-10 p-2 hover:bg-gray-100 hover:border-l-8 hover:border-sky-500 hover:cursor-pointer transition-all ease-in-out'>
          <div className='w-1/6 flex justify-center items-center'>
            <TiShoppingCart className='text-2xl text-green-600' />
          </div>
          <div>سفارش ها</div>
        </div>
        </Link>
        <Link href={'/p-admin/users'} className="w-full">
        <div className='flex w-full h-10 p-2 hover:bg-gray-100 hover:border-l-8 hover:border-sky-500 hover:cursor-pointer transition-all ease-in-out'>
          <div className='w-1/6 flex justify-center items-center'>
            <FaUsers className='text-2xl text-red-600' />
          </div>
          <div>کاربران</div>
        </div>
        </Link>
        <Link href={'/p-admin/products'} className="w-full">
          <div className='flex w-full h-10 p-2 hover:bg-gray-100 hover:border-l-8 hover:border-sky-500 hover:cursor-pointer transition-all ease-in-out'>
            <div className='w-1/6 flex justify-center items-center'>
              <LiaShoePrintsSolid className='text-2xl text-yellow-400' />
            </div>
            <div>محصولات</div>
          </div>
        </Link>
        <Link href={'/p-admin/settings'} className="w-full">

        <div className='flex w-full h-10 p-2 hover:bg-gray-100 hover:border-l-8 hover:border-sky-500 hover:cursor-pointer transition-all ease-in-out'>
          <div className='w-1/6 flex justify-center items-center'>
            <IoSettingsOutline className='text-2xl text-zinc-500' />
          </div>
          <div>تنظیمات پروفایل</div>
        </div>
        </Link>
      </div>
      <div className='h-20 flex justify-center items-center hover:bg-gray-200 shadow-lg hover:border-l-8 hover:border-sky-500 hover:cursor-pointer transition-all ease-in-out'>
        <SideBarLogout/>
      </div>
    </div>
  );
}

export default SideBar;
