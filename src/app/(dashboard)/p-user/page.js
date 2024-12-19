import DashBoardBox from '@/components/modules/dashboard/DashBoardBox'
import React from 'react'
import { SlBasketLoaded } from "react-icons/sl";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaRegComments } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import RecentOrders from '@/components/modules/dashboard/RecentOrders';
import RecentTickets from '@/components/modules/dashboard/RecentTickets';

function page() {
  return (
    <div className='flex flex-col gapy-4'>

    <div className='grid gap-y-4 grid-cols-3 sm:grid-cols-1 md:grid-cols-2 justify-center p-8'>
        <DashBoardBox title={'سفارش'} number={(4).toLocaleString("fa-IR")} icon={<SlBasketLoaded className='text-green-400 text-2xl'/>}/>
      <DashBoardBox title={'تیکت'} number={(2).toLocaleString("fa-IR")} icon={<MdOutlineSupportAgent className='text-orange-400 text-2xl'/>}/>
      <DashBoardBox title={'کامنت'} number={(7).toLocaleString("fa-IR")} icon={<FaRegComments className='text-sky-400 text-2xl'/>}/>
      <DashBoardBox title={'علاقه مندی'} number={(9).toLocaleString("fa-IR")} icon={<GrFavorite className='text-red-600 text-2xl'/>}/> 
    </div>
    <div className='grid gap-4 grid-cols-2 md:grid-cols-1 justify-center p-8'>
        <RecentOrders/>
        <RecentTickets/>
    </div>
    </div>
  )
}

export default page
