import BreadCrumb from "@/components/modules/BreadCrumb";
import ProductSwiper from "@/components/modules/ProductSwiper/ProductSwiper";
import React from "react";
import AddToShoppingCart from "@/components/modules/AddToShoppingCart";
import AddToFavorites from "@/components/modules/AddToFavorites";
import { CiDeliveryTruck } from "react-icons/ci";
import { LiaCertificateSolid } from "react-icons/lia";
import { MdHighQuality } from "react-icons/md";
import Explanation from "@/components/modules/Explanation";
import productModel from "@/root/models/Product";
import connectToDB from "@/root/configs/db";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/root/util/auth/auth";
import userModel from "@/root/models/User";
import CommentsWrapper from "@/components/modules/CommentsWrapper";
import SimillarProducts from "@/components/modules/SimillarProducts";

export default async function page({ params }) {
  connectToDB();
  let user = null;
  const token = cookies().get("token");
  if (token) {
    const tokenPayLoad = verifyAccessToken(token.value);
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
      // console.log("u/ssser : ", user);
    }
  }
  const id = params.product;
  console.log('ddddddd : ',id)
  const response = await productModel.findOne({ _id: id });
  const allProducts = await productModel.find({})
  console.log("ggg", response,"zzz : ", allProducts)

  return (
    <div className='w-full flex flex-col gap-4 my-9'>
      <div className='w-11/12 flex mt-24 gap-4 mx-auto '>
        <div className='w-2/5 h-[500px] '>
          <ProductSwiper />
        </div>
        <div className='w-3/5 flex flex-col'>
          <div className='flex w-full'>
            <div className='w-11/12 m-0'>
              <BreadCrumb titles={id} />
            </div>
            <div className='w-1/12 flex bg-slate-100 rounded-lg m-0 justify-evenly items-center'>
              <div>
                <svg
                  className='w-4 h-4 text-gray-800 dark:text-white hover:cursor-pointer'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m9 5 7 7-7 7'
                  />
                </svg>
              </div>
              <div>
                <svg
                  className='w-4 h-4 text-gray-800 dark:text-white hover:cursor-pointer'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m15 19-7-7 7-7'
                  />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <p className='text-2xl font-BYekan mr-2 mt-4'>
              کفش {response.name}
            </p>
          </div>
          <div className='flex justify-start mt-4 items-center'>
            <p className='font-BYekan'> دیدگاه کاربران:</p>
            {new Array(response.wholeScore).fill(0).map(() => (
              <FaStar className='m-0 p-o text-yellow-400' />
            ))}
            {new Array(5 - response.wholeScore).fill(0).map(() => (
              <FaRegStar className='m-0 p-o text-yellow-400' />
            ))}
          </div>
          <div>
            <div className='mr-2 mt-4'>
              <p className='font-BYekanBold'>
                {response.price.toLocaleString("fa-ir")} تومان
              </p>
            </div>
            <div>
              <p className='p-4 text-base font-BYekan text-justify'>
                {response.shortDesc}
              </p>
            </div>
          </div>
          <hr className=' border-slate-400' />
          <div className='mr-4 mt-4'>
            <div className='font-BYekan'>
              {" "}
              <span className='font-BYekanBold'>شناسه محصول :</span> {id}{" "}
            </div>
            <div className='font-BYekan'>
              <span className='font-BYekanBold'>دسته :</span>
              {response.category?.map((item) => `${item}, `)}
            </div>
            <div className='font-BYekan'>
              <span className='font-BYekanBold'>برچسب :</span>
              {response.tags?.map((item) => `${item}, `)}
            </div>
            <div className='font-BYekan'>
              <span className='font-BYekanBold'>اشتراک گذاری : </span>
              <IoLogoInstagram className='text-red-600 text-xl inline' />
            </div>

            <div></div>
          </div>
          <hr className=' border-slate-400' />
          <div className='flex flex-col gap-4 mt-4 pr-4'>
            <p className='text-green-800-800 font-BYekanBold '>
              تعداد کالای موجود :
              {response.count > 0
                ? response.count.toLocaleString("fa-ir")
                : "موجودی این محصول به اتمام رسیده است ..."}
            </p>
            <div className='flex items-center'>
              <p className=' font-BYekanBold '>سایز های موجود :</p>
              {response.size.map((item) => (
                <p className='px-2 py-1 mr-4 hover:bg-purple-700 hover:text-white text-purple-700 rounded-full border-2'>
                  {item}
                </p>
              ))}
            </div>
            <div className='flex items-center'>
              <p className=' font-BYekanBold '>رنگ های موجود :</p>
              {response.color.map((item) => (
                <p
                  className={`w-5 h-5 hover:scale-125 transition-all mr-4 ${item} rounded-full border-[1px] border-black`}
                ></p>
              ))}
            </div>
            <div className='flex items-center'>
               <AddToFavorites userID={user._id} productID={response._id}/>
              <div className='mr-4 font-BYekan'>افزودن به علاقه مندی ها</div>
            </div>
            <AddToShoppingCart />
            <hr className='border-slate-400' />
            <div className='flex justify-evenly'>
              <div className='flex flex-col justify-center items-center'>
                <CiDeliveryTruck className='w-20 h-20 text-orange-500' />
                <p>تحویل سریع و آسان</p>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <LiaCertificateSolid className='w-20 h-20 text-green-500' />
                <p>ضمانت اصل بودن کالا</p>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <MdHighQuality className='w-20 h-20 text-yellow-200' />
                <p>تضمین کیفیت</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-11/12 mx-auto'>
        <Explanation product={JSON.parse(JSON.stringify(response))}>
          {/* server component passed into client component */}
          <CommentsWrapper
            productComments={JSON.parse(JSON.stringify(response.comments))}
          />
        </Explanation>
      </div>
      <div className='w-11/12 mx-auto'>
        <div className='font-BYekanBold text-xl my-7'>محصولات مشابه</div>
        <div className='w-full h-96'>
          <SimillarProducts products={JSON.parse(JSON.stringify(allProducts))} filter={response.suitableFor} />
        </div>
      </div>
    </div>
  );
}
