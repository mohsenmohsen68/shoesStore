
import ProductBox from "@/components/modules/ProductBox";
import ServerBTN from "@/components/modules/ServerBTN";
import connectToDB from "@/root/configs/db";
import favoriteModel from "@/root/models/Favorites";
import userModel from "@/root/models/User";
import { verifyAccessToken } from "@/root/util/auth/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { GiBrokenHeartZone } from "react-icons/gi";

async function pages() {
  connectToDB();
  let favorites = [];
  let user = null;
  const token = cookies().get("token");
  if (token) {
    const tokenPayLoad = verifyAccessToken(token.value);
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
    }
  }
  if (user) {
    favorites = await favoriteModel
      .find({ user: user._id })
      .populate("product")
      .lean();
      console.log("fav:",favorites)
  } else {
    redirect("/login");
  }

  return (
    <>
      {favorites.length > 0 ? (
          <div className='w-full p-4 grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1  gap-4 place-items-center'>
          {favorites.map((item) => (
            <div className="flex flex-col gap-2">
            <ProductBox product={JSON.parse(JSON.stringify(item.product))}/>
              <ServerBTN productid={JSON.parse(JSON.stringify(item.product._id))} userid={JSON.parse(JSON.stringify(item.user))}/> 
            </div>
          ))}
          </div>
      ) : (
        <div className='flex flex-col w-full h-[200px] justify-center items-center '>
          <div className='font-BYekanBold text-2xl '>
            لیست علاقه مندی های شما خالی است ...
          </div>
          <GiBrokenHeartZone className=' text-9xl text-red-600' />
        </div>
      )}
    </>
  );
}

export default pages;
