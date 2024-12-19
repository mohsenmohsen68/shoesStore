import React from 'react'

function RecentTickets() {
  return (
    <div className='w-full border border-violet-600 hover:shadow-md hover:shadow-violet-500 hover:scale-105 duration-200 hover:cursor-pointer'>
        <div className='flex p-2 justify-between font-BYekanBold  bg-violet-300'>
           <div>تیکت های اخیر</div>
           <div>همه تیکت ها ...</div>
        </div>
        <div className='p-2'>
      تیکتی ثبت نشده است ...

        </div>
    </div>
  )
}

export default RecentTickets
