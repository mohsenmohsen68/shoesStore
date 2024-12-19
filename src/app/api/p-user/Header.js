import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";

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
      <div>
        <IoMdNotificationsOutline className="text-3xl text-red-600"/>
      </div>
    </div>
  );
}

export default Header;
