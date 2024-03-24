import React from "react";
import NumberToPersianWord from "number_to_persian_word";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex w-full bg-slate-300 shadow-2xl  h-fit overflow-hidden p-7 gap-2 md:flex-col font-BYekan ">

        <div className="w-2/3 flex gap-2 md:w-full sm:flex-col ">
        <div id="shopInfo" className="flex flex-col w-1/2 p-1 space-y-1 shadow-md sm:w-full">
        <div className="flex gap-2 items-center ">
        <img
          src="img/shoeshoplogo.jpg"
          alt="logo"
          className="w-[47px] h-[47px] rounded-2xl"
        />
        <h1 className="text-xl lg:text-lg md:text-base sm:text-sm"> فروشگاه کفش جلوه </h1>
        </div>
        <p className="text-base lg:text-sm ">
          تهران، ولیعصر، مجتمع تجاری برلن، واحد 
          {NumberToPersianWord.convertEnToPe(123)}
        </p>
        <p className="text-base lg:text-sm">پست الکترونیکی : jelve@gmail.com</p>
        <p className="text-base lg:text-sm">
          پیگیری سفارشات :  {NumberToPersianWord.convertEnToPe(979724944)} - {NumberToPersianWord.convertEnToPe(21)}+
        </p>
      </div>

      <div id="articles" className="flex flex-col w-1/2 p-1 space-y-1 shadow-md sm:w-full ">
        <p className="text-xl lg:text-lg md:text-base sm:text-sm">جدیدترین نوشته ها</p>
        <div className="flex flex-col">
        <div className=" flex space-x-2 items-center ">
            <img src="/img/article2.jpg" alt="article image" className="w-12 h-12 ml-2 mb-2" />
            <div className="flex flex-col">
              <p className="text-base lg:text-sm"> انتخاب کفش مناسب </p>
              <p className="text-base lg:text-sm">
                {NumberToPersianWord.convertEnToPe(24)} بهمن 
                {NumberToPersianWord.convertEnToPe(1402)}
              </p>
            </div>
          </div>

          <div className=" flex space-x-2 items-center ">
            <img src="/img/article2.jpg" alt="article image" className="w-12 h-12 ml-2 mb-2" />
            <div className="flex flex-col">
              <p className="text-base lg:text-sm"> انتخاب کفش مناسب </p>
              <p className="text-base lg:text-sm">
                {NumberToPersianWord.convertEnToPe(24)} بهمن 
                {NumberToPersianWord.convertEnToPe(1402)}
              </p>
            </div>
          </div>

          <div className=" flex space-x-2 items-center ">
            <img src="/img/article2.jpg" alt="article image" className="w-12 h-12 ml-2 mb-2" />
            <div className="flex flex-col">
              <p className="text-base lg:text-sm"> انتخاب کفش مناسب </p>
              <p className="text-base lg:text-sm">
                {NumberToPersianWord.convertEnToPe(24)} بهمن 
                {NumberToPersianWord.convertEnToPe(1402)}
              </p>
            </div>
          </div>

          
        </div>
      </div>
        </div>

      

      <div className="w-1/3 flex gap-2 md:w-full sm:flex-col">
      <div id="footerMenu" className="flex flex-col w-1/2 p-1 space-y-1 shadow-md sm:w-full ">
        <h1 className="text-xl lg:text-lg md:text-base sm:text-sm">لینک های مفید</h1>
        <div className="flex flex-col md:flex-row md:justify-evenly">
        <Link href='/' className="text-base lg:text-sm hover:cursor-pointer">صفحه اصلی</Link>
        <Link href='/' className="text-base lg:text-sm hover:cursor-pointer">فروشگاه</Link>
        <Link href='/' className="text-base lg:text-sm hover:cursor-pointer md:hidden">فروش سازمانی</Link>
        <Link href='/' className="text-base lg:text-sm hover:cursor-pointer">تماس با ما</Link>
        <Link href='/' className="text-base lg:text-sm hover:cursor-pointer">وبلاگ</Link>
        </div>
      </div>

      <div id="socials" className="flex flex-col w-1/2 space-y-1 shadow-md sm:w-full">
        <h1 className="text-xl lg:text-lg md:text-base sm:text-sm">رسانه‌های مجازی</h1>
        <div className="flex space-x-1 justify-center items-center">
        <img
          src="/img/socials/insta.png"
          alt="instagram logo"
          className="w-10 h-10 lg:w-7 lg:h-7 rounded-full"
        />
        <img
          src="/img/socials/Eitaa-Logo-Full.png"
          alt="eita logo"
          className="w-10 h-10 lg:w-7 lg:h-7 rounded-full"
        />
        <img
          src="/img/socials/teleg.png"
          alt="eita logo"
          className="w-10 h-10 lg:w-7 lg:h-7 rounded-full"
        />
        </div>
        
      </div>
      </div>

      
    </div>
  );
}
