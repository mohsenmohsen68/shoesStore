import BreadCrumb from "@/components/modules/BreadCrumb";
import ProductSwiper from "@/components/modules/ProductSwiper/ProductSwiper";
import React from "react";
import StarRate from "@/components/modules/StarRate";
import AddToShoppingCart from "@/components/modules/AddToShoppingCart";
import AddToFavorites from "@/components/modules/AddToFavorites";
import { CiDeliveryTruck } from "react-icons/ci";
import { LiaCertificateSolid } from "react-icons/lia";
import { MdHighQuality } from "react-icons/md";
import Explanation from "@/components/modules/Explanation";
import SimillarProducts from "@/components/modules/SimillarProducts";

function page({ params }) {
  return (
    <div className="w-full flex flex-col gap-4 my-9">
      <div className="w-11/12 flex mt-24 gap-4 mx-auto ">
        <div className="w-2/5 h-[500px] ">
          <ProductSwiper />
        </div>
        <div className="w-3/5 flex flex-col">
          <div className="flex w-full">
            <div className="w-11/12 m-0">
              <BreadCrumb titles={params.product} />
            </div>
            <div className="w-1/12 flex bg-slate-100 rounded-lg m-0 justify-evenly items-center">
              <div>
                <svg
                  class="w-4 h-4 text-gray-800 dark:text-white hover:cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m9 5 7 7-7 7"
                  />
                </svg>
              </div>
              <div>
                <svg
                  class="w-4 h-4 text-gray-800 dark:text-white hover:cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m15 19-7-7 7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <p className="text-2xl font-BYekan mr-2 mt-4">
              کفش پیاده روی مدل Sk005
            </p>
          </div>
          <div className="flex justify-start gap-2 mr-2 mt-4 items-center">
            <StarRate rate={2} />
            <p className="font-BYekan">(دیدگاه کاربران)</p>
          </div>
          <div>
            <div className="mr-2 mt-4">
              <p className="font-BYekanBold">۴۲۰۰۰۰ تومان</p>
            </div>
            <div>
              <p className="p-4 text-base font-BYekan text-justify">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تژی مورد نیاز، و کاربردهای متنوع با
                هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،
                تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
                الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در
                این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
                راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
                حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای
                موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </div>
          </div>
          <hr className=" border-slate-400" />
          <div className="mr-4 mt-4">
            <div className="font-BYekan">
              {" "}
              <span className="font-BYekanBold">شناسه محصول :</span> ۹۷۲۴۴۰۹۹۴
            </div>
            <div className="font-BYekan">
              <span className="font-BYekanBold">دسته :</span> اسپرت، مردانه
            </div>
            <div className="font-BYekan">
              <span className="font-BYekanBold">برچسب :</span>{" "}
            </div>
            <div className="font-BYekan">
              <span className="font-BYekanBold">اشتراک گذاری : </span>
            </div>

            <div></div>
          </div>
          <hr className=" border-slate-400" />
          <div className="flex flex-col gap-4 mt-4 pr-4">
            <p className="text-green-800-800 font-BYekanBold ">
              در انبار موجود می باشد .
            </p>
            <div className="flex items-center">
              <p className=" font-BYekanBold ">سایز های موجود :</p>
              <p className="px-2 py-1 mr-4 hover:bg-purple-700 hover:text-white text-purple-700 rounded-full border-2">
                ۴۰
              </p>
              <p className="px-2 py-1 mr-4 hover:bg-purple-700 hover:text-white text-purple-700 rounded-full border-2">
                ۴۱
              </p>
              <p className="px-2 py-1 mr-4 hover:bg-purple-700 hover:text-white text-purple-700 rounded-full border-2">
                ۴۲
              </p>
              <p className="px-2 py-1 mr-4 hover:bg-purple-700 hover:text-white text-purple-700 rounded-full border-2">
                ۴۳
              </p>
              <p className="px-2 py-1 mr-4 hover:bg-purple-700 hover:text-white text-purple-700 rounded-full border-2">
                ۴۴
              </p>
            </div>
            <div className="flex items-center">
              <p className=" font-BYekanBold ">رنگ های موجود :</p>
              <p className="w-5 h-5 hover:scale-125 transition-all mr-4 bg-white rounded-full border-[1px] border-black"></p>
              <p className="w-5 h-5 hover:scale-125 transition-all mr-4 bg-black rounded-full border-black border-[1px] "></p>
              <p className="w-5 h-5 hover:scale-125 transition-all mr-4 bg-gray-400 rounded-full border-black border-[1px]"></p>
            </div>
            <div className="flex items-center">
              <AddToFavorites />
              <div className="mr-4">افزودن به علاقه مندی ها</div>
            </div>
            <AddToShoppingCart />
            <hr className="border-slate-400" />
            <div className="flex justify-evenly">
              <div className="flex flex-col justify-center items-center">
                <CiDeliveryTruck className="w-20 h-20 text-orange-500" />
                <p>تحویل سریع و آسان</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <LiaCertificateSolid className="w-20 h-20 text-green-500"/>
                <p>ضمانت اصل بودن کالا</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <MdHighQuality className="w-20 h-20 text-yellow-200" />
                <p>تضمین کیفیت</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto">
        <Explanation/>
      </div>
      <div className="w-11/12 mx-auto">
        <div className="font-BYekanBold text-xl my-7">محصولات مشابه</div>
        <div className="w-full h-96">
                <SimillarProducts/>
        </div>
      </div>
    </div>
  );
}

export default page;
