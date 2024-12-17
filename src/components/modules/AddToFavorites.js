"use client"
import { createANewFavorite, deleteFavorite } from '@/root/redux/favorites/Favorites';
import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useDispatch } from 'react-redux';

function AddToFavorites({ userID, productID }) {
  console.log('user and products on client :  ', userID, productID)
  if(!userID){
    return toast.error(
      <div className='font-BYekan text-sm'>
       برای افزودن علاقه مندی باید لاگین کنید ...
      </div>,
      {
        duration: 4000,
        position: "top-center"
      }
    );
  }
  const dispatch = useDispatch()

  const deleteFavoriteList = async (userID, productID) => {
    console.log('delete is called :')
    setHeartFill(false)
    const res = await dispatch(deleteFavorite({ user: userID, product: productID }))
    console.log("redux response : ", res)
    if (res.payload.status === 200) {
      return toast.success(
        <div className='font-BYekan text-sm'>
          این محصول با موفقیت از لیست علاقه مندی ها حذف شد ...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    } else {
      return toast.error(
        <div className='font-BYekan text-sm'>
          این محصول در لیست علاقه مندی ها وجود ندارد...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
  }

  const addToFavoriteList = async (userID, productID) => {
    console.log('add is called :')
    setHeartFill(true)
    const res = await dispatch(createANewFavorite({ user: userID, product: productID }))
    console.log("redux response : ", res)
    if (res.payload.status === 201) {
      return toast.success(
        <div className='font-BYekan text-sm'>
          این محصول با موفقیت به لیست علاقه مندی ها اضافه شد ...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    } else {
      return toast.error(
        <div className='font-BYekan text-sm'>
          این محصول در لیست علاقه مندی ها وجود دارد...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
  }
  const [heartfill, setHeartFill] = useState(false);
  return (
    <>
      {heartfill ? (
        <GoHeartFill onClick={() => deleteFavoriteList(userID, productID)} className=" text-red-600 text-2xl " />
      ) : (
        <GoHeart onClick={() => addToFavoriteList(userID, productID)} className=" text-gray-500 text-2xl " />
      )}
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
    </>
  )
}

export default AddToFavorites
