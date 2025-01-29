import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { RxHome } from "react-icons/rx";
import Link from "next/link";

function Header({username,role}) {
  return (
    <div className='w-full h-20 bg-gray-300 flex justify-between items-center px-5 py-2'>
      <div className='flex justify-center items-center'>
        <FaCircleUser className="text-3xl ml-4" />
        <div className='flex flex-col justify-center items-center'>
          <p className="font-BYekanBold">{username}</p>
          <p className="font-BYekan">{role==='ADMIN' ? "ادمین" : "کاربر عادی"}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <IoMdNotificationsOutline className="text-2xl text-red-600"/>
        <Link href={'/'}>
        <RxHome className="text-2xl text-red-600"/>
        </Link>
      </div>
    </div>
  );
}

export default Header;
