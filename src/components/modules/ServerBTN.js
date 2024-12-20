"use client"
import { deleteFavorite } from '@/root/redux/favorites/Favorites'
import React from 'react'
import { useDispatch } from 'react-redux'
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation';

function ServerBTN({userid,productid}) {
    const router = useRouter()
    const dispatch = useDispatch()
    const clickHandler = async()=>{
        const res = await dispatch(deleteFavorite({user:userid, product: productid}))
        if (res.payload.status === 200) {
            toast.success(
              <div className='font-BYekan text-sm'>علاقه مندی با موفقیت حذف شد ...</div>,
              {
                duration: 4000,
                position: "top-center"
              }
              );
              router.refresh()
          } else {
            return toast.error(
              <div className='font-BYekan text-sm'>
               مشکلی در حذف علاقه مندی رخ داده است ...
              </div>,
              {
                duration: 4000,
                position: "top-center"
              }
            );
          }
    }
  return (
    <div className='w-full'>
    <button className='bg-red-600 w-full text-white hover:bg-red-500 p-2 rounded-lg' onClick={()=>clickHandler()}>
    حذف از علاقه مندی
  </button>
  <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white"
            }
          },
          error: {
            style: {
              background: "red",
              color: "white"
            }
          }
        }}
      />
    </div>
  )
}

export default ServerBTN
