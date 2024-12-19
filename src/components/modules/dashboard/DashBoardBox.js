import React from 'react'

export default function DashBoardBox({title,number,icon}) {
  return (
    <div className='w-4/5 p-4 border border-violet-600 text-violet-800 hover:shadow-md hover:shadow-violet-500 hover:scale-105 duration-200 hover:cursor-pointer'>
        <div className='flex justify-center gap-2'>
            {icon}
            <div className='font-BYekanBold'>{title}</div>
        </div>
        <div className='flex justify-evenly'>
            <div>تعداد {title} ها</div>
            <div>{number}</div>
        </div>
      
    </div>
  )
}
