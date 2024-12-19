import React from 'react'

function RecentOrders() {
  return (
    <div className='w-full border border-violet-600 hover:shadow-md hover:shadow-violet-500 hover:scale-105 duration-200 hover:cursor-pointer'>
        <div className='flex p-2 justify-between font-BYekanBold  bg-violet-300'>
           <div>سفارش های اخیر</div>
           <div>همه سفارش ها ...</div>
        </div>
        <div className='p-2'>
      سفارشی ثبت نشده است ...

        </div>
    </div>
  )
}

export default RecentOrders
