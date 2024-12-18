import React from "react";
import { GiConverseShoe } from "react-icons/gi";
import { FaEdgeLegacy } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";


function Information() {
    const phoneCode = 21;
    const phoneNumber = 123456789;
    const cellphone = 93305984848;
  return (
    <div className='flex flex-col gap-2 justify-center items-center p-4 shadow-lg mx-4 '>
      <div className='font-BYekan text-sm'>تماس با ما</div>
      <div className='font-BYekan text-xl'>اطلاعات تماس</div>
      <div className='flex justify-between items-center w-full'>
        <div className="w-1/5 flex justify-center">
        <GiConverseShoe className='text-gray-400 text-2xl' />
        </div>
        <div className='font-BYekan w-4/5 flex justify-start'>فروشگاه کفش جلوه</div>
      </div>
      <div className='flex justify-between items-center w-full'>
        <div className="w-1/5 flex justify-center">
        <FaEdgeLegacy className='text-gray-400 text-2xl' />
        </div>
        <div className='font-BYekan w-4/5 flex justify-start'>https://jelvehshoes.ir</div>
      </div>
      <div className='flex justify-between items-center w-full'>
        <div className="w-1/5 flex justify-center">
        <FaLocationDot className='text-gray-400 text-2xl' />
        </div>
        <div className='font-BYekan w-4/5 flex justify-start'> تهران، اردستانی، تهران، شهرک شریف (محله‌ی مرواریدشهر) </div>
      </div>
      <div className='flex justify-between items-center w-full'>
        <div className="w-1/5 flex justify-center">
        <FaPhone className='text-gray-400 text-2xl' />
        </div>
        <div className='font-BYekan w-4/5 flex justify-start'>{phoneCode.toLocaleString("fa-ir", { useGrouping: false })}-{phoneNumber.toLocaleString("fa-ir", { useGrouping: false })}</div>
      </div>
      <div className='flex justify-between items-center w-full'>
        <div className="w-1/5 flex justify-center">
        <MdOutgoingMail className='text-gray-400 text-2xl' />
        </div>
        <div className='font-BYekan w-4/5 flex justify-start'>jelveh@gmail.com</div>
      </div>
      <div className='flex justify-between items-center w-full'>
        <div className="w-1/5 flex justify-center">
        <FaTelegramPlane className='text-gray-400 text-2xl' />
        </div>
        <div className='font-BYekan w-4/5 flex justify-start'>تماس با مدیریت در واتس اپ یا تلگرام : {(cellphone).toLocaleString("fa-ir", { useGrouping: false })}</div>
      </div>
      
      
    </div>
  );
}

export default Information;
