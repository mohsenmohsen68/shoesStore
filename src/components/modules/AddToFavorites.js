"use client"
import React, { useState } from 'react'
import { GoHeartFill } from "react-icons/go";

function AddToFavorites() {
    const [addToFav,setAddToFav] = useState(false)
  return (
    <GoHeartFill className={`${addToFav?'text-red-700':'text-slate-400'} hover:cursor-pointer text-2xl`} onClick={()=>setAddToFav(prev => !prev)}/>
  )
}

export default AddToFavorites
