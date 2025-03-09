import BreadCrumb from "@/components/modules/BreadCrumb";
import ProductBox from "@/components/modules/ProductBox";
import connectToDB from "@/root/configs/db";
import favoriteModel from "@/root/models/Favorites";
import userModel from "@/root/models/User";
import { verifyAccessToken } from "@/root/util/auth/auth";
import { cookies } from "next/headers";
import React from "react";
import { GiBrokenHeartZone } from "react-icons/gi";

async function pages() {
  connectToDB()
  let favorites = [];
  let user = null;
  const token = cookies().get("token");
  if (token) {
    const tokenPayLoad = verifyAccessToken(token.value);
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
      console.log("ussser : ", user);
    }
  }
  if (user) {
    favorites = await favoriteModel
      .find({ user: user._id })
      .populate("product")
      .lean();
    console.log("-----", favorites);
  }else{
    favorites = []
  }

  return (
    <div className='mt-28 mb-4'>
      <BreadCrumb titles={"علاقه مندی ها"} />
      {favorites.length > 0 ? (
        <div className='my-4 p-4 place-items-center grid gap-x-4 gap-y-8 grid-cols-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {favorites.map((item) => (
            <ProductBox product={JSON.parse(JSON.stringify(item.product))} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col w-full h-[200px] justify-center items-center '>
          <div className="font-BYekanBold text-2xl ">لیست علاقه مندی های شما خالی است ...</div>
          <GiBrokenHeartZone className=' text-9xl text-red-600' />
        </div>
      )}
    </div>
  );
}

export default pages;
