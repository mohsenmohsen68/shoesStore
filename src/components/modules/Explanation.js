"use client";
import React, { useState } from "react";
import CreateComment from "./CreateComment";
import Image from "next/image";

function explanation({product,children, userID}) {
  const [explain, setExplain] = useState(true);
  const [moreInfo, setMoreInfo] = useState(false);
  const [comments, setComments] = useState(false);
  return (
    <div>
      <div className='flex justify-center gap-2 '>
        <button
          className={`${explain ? "bg-gray-700 text-white" : "bg-white"} font-BYekan border border-gray-700 hover:bg-gray-700 hover:text-white rounded-full p-2`}
          onClick={() => {
            setExplain(true);
            setComments(false);
            setMoreInfo(false);
          }}
        >
          توضیحات
        </button>
        <button
          className={`${moreInfo ? "bg-gray-700 text-white" : "bg-white"} font-BYekan border border-gray-700 hover:bg-gray-700 hover:text-white rounded-full p-2`}
          onClick={() => {
            setExplain(false);
            setComments(false);
            setMoreInfo(true);
          }}
        >
          اطلاعات بیشتر
        </button>
        <button
          className={`${comments ? "bg-gray-700 text-white" : "bg-white"} font-BYekan border border-gray-700 hover:bg-gray-700 hover:text-white rounded-full p-2`}
          onClick={() => {
            setExplain(false);
            setComments(true);
            setMoreInfo(false);
          }}
        >
          نظرات کاربران
        </button>
      </div>

      {explain && (
        <div>
          <div className="font-BYekan text-2xl">درباره محصول</div>
          <p className="font-BYekan">
            {product.longDesc}
          </p>
          <div className="flex justify-center">
            <Image src={'/img/banner2.jpg'} width={600} height={500} />
          </div>
        </div>
      )}
      {moreInfo && (
        <div className='flex flex-col font-BYekan'>
         
          <hr className='w-full my-2' />
          <div className='flex justify-between p-4 w-full'>
            <div>مناسب برای</div>
            <div>{product.suitableFor}</div>
          </div>
          <hr className='w-full my-2' />
          <div className='flex justify-between p-4 w-full'>
            <div>سایز</div>
            <div className="flex">
            {product.size.map(item=>(<div >-{item.toLocaleString("fa-ir")}</div>))}

            </div>
          </div>
          <hr className='w-full my-2' />
          <div className='flex justify-between p-4 w-full'>
            <div>رنگ</div>
            <div>مشکی</div>
          </div>
          <hr className='w-full my-2' />
          <div className='flex justify-between p-4 w-full'>
            <div>جنس</div>
            <div>چرم</div>
          </div>
          <hr className='w-full my-2' />
          <div className='flex justify-between p-4 w-full'>
            <div>نوع</div>
            <div>کالج</div>
          </div>
          <hr className='w-full my-2' />
        </div>
      )}
      {comments && (
        <div className=' mt-9 flex h-[600px] '>
          {/* server component */}
          {children}
          {/* client component */}
          <CreateComment productID={product._id} userID={userID}/>
        </div>
      )}
    </div>
  );
}

export default explanation;
