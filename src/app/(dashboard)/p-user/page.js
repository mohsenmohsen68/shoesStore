import DashBoardBox from '@/components/modules/dashboard/DashBoardBox'
import React from 'react'
import { SlBasketLoaded } from "react-icons/sl";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaRegComments } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import RecentOrders from '@/components/modules/dashboard/RecentOrders';
import RecentTickets from '@/components/modules/dashboard/RecentTickets';
import { cookies } from 'next/headers';
import userModel from '@/root/models/User';
import connectToDB from '@/root/configs/db';
import { verifyAccessToken } from '@/root/util/auth/auth';
import requestModel from '@/root/models/Requests';
import commentModel from '@/root/models/Comment';
import favoriteModel from '@/root/models/Favorites';
import Link from 'next/link';

async function page() {


  connectToDB();
  let tickets = [];
  let comments = [];
  let favorites = [];
  let orders = []

  let user = null;
  const token = cookies().get("token");
  if (token) {
    const tokenPayLoad = verifyAccessToken(token.value);
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
    }
  }
  if (user) {
    console.log('user .. ', user._id)
    tickets = await requestModel.find({ user: user._id }).sort({_id:-1}).limit(3);
    comments = await commentModel.find({ user: user._id });
    favorites = await favoriteModel.find({ user: user._id });
    console.log("tic:", tickets)
    console.log("com:", comments)
    console.log("fav:", favorites)
  } else {
    redirect("/login");
  }

  return (
    <div className='flex flex-col h-[calc(100%-80px)]'>

      <div className='grid gap-y-2 grid-cols-3 sm:grid-cols-1 md:grid-cols-2 justify-center p-2'>
        <Link href={'/p-user/orders'}>
        <DashBoardBox title={'سفارش'} number={(4).toLocaleString("fa-IR")} icon={<SlBasketLoaded className='text-green-400 text-2xl' />} />
        </Link>
        <Link href={'/p-user/tickets'}>
        <DashBoardBox title={'تیکت'} number={(tickets.length).toLocaleString("fa-IR")} icon={<MdOutlineSupportAgent className='text-orange-400 text-2xl' />} />
        </Link>
        <Link href={'/p-user/comments'}>
        <DashBoardBox title={'کامنت'} number={(comments.length).toLocaleString("fa-IR")} icon={<FaRegComments className='text-sky-400 text-2xl' />} />
        </Link>
        <Link href={'/p-user/favorites'}>
        <DashBoardBox title={'علاقه مندی'} number={(favorites.length).toLocaleString("fa-IR")} icon={<GrFavorite className='text-red-600 text-2xl' />} />
        </Link>
      </div>
      <div className='grid gap-4 grid-cols-2 md:grid-cols-1 justify-center p-3'>
        <RecentOrders />
        <RecentTickets tickets={JSON.parse(JSON.stringify(tickets))}/>
      </div>
    </div>
  )
}

export default page
