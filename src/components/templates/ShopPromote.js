import React from "react";

export default function ShopPromote() {
  return (
    <div className="w-11/12 h-72 mx-auto flex mt-20 md:flex-col md:space-y-6 mb-24 md:mb-72 sm:mb-20 ">
      <div className="w-1/2 md:w-full flex">
        <div className="w-1/3 flex flex-col relative space-y-7 ">
          <div className="w-[200%] absolute top-1/4 -translate-y-1/4 flex flex-col space-y-6 z-20">
            <div>
              <p className="text-2xl lg:text-xl md:text-lg sm:text-base font-BYekanBold">
                راحتی، استایل،{" "}
                <span className="text-red-600 text-3xl lg:text-2xl md:text-xl sm:text-lg">اصالت</span>
              </p>
              <p className="text-lg lg:text-base md:text-sm sm:text-xs font-BYekan">
                در کفش های ما هیچ ریگی نیست ...
              </p>
            </div>
            <div>
              <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                <span class="relative p-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 sm:text-xs">
                  تماس با ما
                </span>
              </button>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-left"
          className=" perspective-400 w-2/3 h-full"
        >
          <img
            src="/img/promote4.jpg"
            className="transform w-full h-full  hover:-rotate-y-0 rotate-y-45  transition-all duration-1000"
            alt=""
          />
        </div>

      </div>

      <div className="w-1/2 md:w-full flex">
        <div data-aos="fade-right" className=" perspective-400 w-2/3 h-full flex" >
          <img src="/img/promote2.jpg" className="transform w-full h-full -rotate-y-45 hover:rotate-y-0  transition-all duration-1000" alt="promote image" />
        </div>

        <div className="w-1/3 relative ">
          <div className="absolute w-[150%] top-1/4 -translate-y-1/4 left-1/4 -translate-x-1/4 flex flex-col space-y-7">
            <div>
              <p className="text-2xl lg:text-xl md:text-lg sm:text-base font-BYekanBold">باشگاه مشتریان جلوه</p>
              <p className="text-lg lg:text-base md:text-sm sm:text-xs font-BYekan">
                مشتریان{" "}
                <span className="text-red-600 font-BYekanBold text-3xl lg:text-2xl md:text-xl sm:text-lg">
                  وفادار
                </span>{" "}
                میتوانند ...
              </p>
            </div>
            <div>
              <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                <span class="relative p-2 sm:text-xs transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  اطلاعات بیشتر ...
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
