"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BsTrash } from "react-icons/bs";

export default function ShoppingCart() {
  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    let total = 0
    cartData.forEach(item => {
      total = total + item.price * item.count
    })
    setTotalPrice(total)
    setCart(cartData)
  }, [])
  useEffect(() => {

    let total = 0
    cart.forEach(item => {
      total = total + item.price * item.count
    })
    setTotalPrice(total)
  }, [cart])

  const addHandler = (item) => {
    let newCart = []
    cart.forEach(cartItem => {
      if (cartItem.id === item.id) {
        let newOBJ = { id: item.id, count: item.count + 1, price: item.price, img: item.img, name: item.name }
        newCart.push(newOBJ)
      } else {
        newCart.push(cartItem)
      }
    })
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }
  const removeHandler = (item) => {
    let newCart = []
    cart.forEach(cartItem => {
      if (cartItem.id === item.id && cartItem.count > 1) {
        let newOBJ = { id: item.id, count: item.count - 1, price: item.price, img: item.img, name: item.name }
        newCart.push(newOBJ)
      } else {
        newCart.push(cartItem)
      }
    })
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const removePurchase = (item) => {
    const newCart = cart.filter(myitems => myitems.id !== item.id)
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  return (
    <div className='w-full flex gap-x-2 px-5 py-3'>
      <div className="w-3/4  flex flex-col gap-2">
        <h1 className="font-BYekanBold mb-2">سبد خرید شما : {(cart.length).toLocaleString("fa-IR")} مرسوله</h1>
        {cart.map(item => <div className=' w-full border border-green-400 rounded-md p-2'>
          <div className='flex w-full'>
            <div className="w-11/12 flex">
              <div className="ml-4">
                <Image src={item.img} width={100} height={200} alt="shoes picture" />
              </div>
              <div className="flex flex-col">
                <div className="font-BYekanBold">{item.name}</div>
                <div>قیمت : {(item.price).toLocaleString("fa-IR")} تومان</div>
                <div>تعداد : {(item.count).toLocaleString("fa-IR")} عدد</div>
                <div className="flex">
                  <button className="border border-green-400 flex justify-center items-center px-2 py-1 rounded-r-md hover:bg-green-400 hover:text-white" onClick={() => addHandler(item)}>+</button>
                  <div className="border border-green-400 flex justify-center items-center px-2 py-1">{(item.count).toLocaleString("fa-IR")}</div>
                  <button className="border border-green-400 flex justify-center items-center px-2 py-1 rounded-l-md hover:bg-green-400 hover:text-white" onClick={() => removeHandler(item)}>-</button>
                </div>
              </div>
            </div>
            <div className="w-1/12 flex justify-end items-center">
              <BsTrash className="text-red-500 text-2xl" onClick={() => removePurchase(item)} />
            </div>

          </div>
        </div>)}
      </div>
      <div className="flex flex-col  gap-2 w-1/4">
        <h1 className="font-BYekanBold mb-2">مجموع پرداختی شما</h1>
        <div className=" border border-red-500 rounded-md p-4 h-fit">
          <div className='flex flex-col gap-2'>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div>تعداد محصول</div>
                <div>{(cart.length).toLocaleString("fa-IR")}</div>
              </div>
              <div className="flex justify-between">
                <div>مجموع قیمت</div>
                <div>{(totalPrice).toLocaleString("fa-IR")}</div>
              </div>
            </div>
            <button className="bg-green-400 w-full rounded-md hover:bg-white hover:text-green-400 p-2 hover:border hover:border-green-400 hover:font-BYekanBold">تایید و تکمیل سفارش</button>
            <div className="font-BYekan text-sm text-gray-400">
              هزینه این سفارش هنوز پرداخت نشده‌ و در صورت اتمام موجودی، کالاها از سبد حذف می‌شوند
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
