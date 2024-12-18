import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";

function Header() {
  return (
    <div className='w-full h-20 bg-gray-300 flex justify-between'>
      <div className='flex'>
        <FaCircleUser />
        <div className='flex flex-col'>
          <p className="font-BYekan">محسن موحدی نژاد</p>
          <p className="font-BYekan">ادمین</p>
        </div>
      </div>
      <div>
        <IoMdNotificationsOutline />
      </div>
    </div>
  );
}

export default Header;
