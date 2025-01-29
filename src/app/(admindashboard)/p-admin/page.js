import DashBoardBox from "@/components/modules/dashboard/DashBoardBox";
import React from "react";
import { SlBasketLoaded } from "react-icons/sl";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaRegComments } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import GrowthRate from "@/components/templates/charts/GrowthRate";
import UsersGrowth from "@/components/templates/charts/UsersGrowth";
import { cookies } from "next/headers";
import userModel from "@/root/models/User";
import connectToDB from "@/root/configs/db";
import { verifyAccessToken } from "@/root/util/auth/auth";
import requestModel from "@/root/models/Requests";
import commentModel from "@/root/models/Comment";
import favoriteModel from "@/root/models/Favorites";
import Link from "next/link";

async function page() {
  connectToDB();
  let tickets = [];
  let comments = [];
  let favorites = [];
  let orders = [];

  let user = null;
  const token = cookies().get("token");
  if (token) {
    const tokenPayLoad = verifyAccessToken(token.value);
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
    }
  }
  if (user) {
    console.log("user .. ", user._id);
    tickets = await requestModel.find({});
    comments = await commentModel.find({});
    favorites = await favoriteModel.find({});
  } else {
    redirect("/login");
  }

  return (
    <div className='flex flex-col h-[calc(100%-80px)]'>
      <div className='grid gap-y-2 grid-cols-3 sm:grid-cols-1 md:grid-cols-2 justify-center p-2'>
        <Link href={"/p-user/orders"}>
          <DashBoardBox
            title={"سفارش"}
            number={(4).toLocaleString("fa-IR")}
            icon={<SlBasketLoaded className='text-green-400 text-2xl' />}
          />
        </Link>
        <Link href={"/p-user/tickets"}>
          <DashBoardBox
            title={"تیکت"}
            number={tickets.length.toLocaleString("fa-IR")}
            icon={
              <MdOutlineSupportAgent className='text-orange-400 text-2xl' />
            }
          />
        </Link>
        <Link href={"/p-user/comments"}>
          <DashBoardBox
            title={"کامنت"}
            number={comments.length.toLocaleString("fa-IR")}
            icon={<FaRegComments className='text-sky-400 text-2xl' />}
          />
        </Link>
        <Link href={"/p-user/favorites"}>
          <DashBoardBox
            title={"علاقه مندی"}
            number={favorites.length.toLocaleString("fa-IR")}
            icon={<GrFavorite className='text-red-600 text-2xl' />}
          />
        </Link>
      </div>
      <div className='grid gap-4 grid-cols-2 md:grid-cols-1 justify-center p-3 '>
        <div className="bg-yellow-200">
            نرخ رشد میزان کاربران
        <UsersGrowth />
        </div>
        <div className="bg-blue-200">
            میزان رشد فروش
        <GrowthRate />
        </div>
      </div>
    </div>
  );
}

export default page;
