
import Link from "next/link";
import React from "react";
import * as shamsi from 'shamsi-date-converter';

function RecentTickets({ tickets }) {
  console.log(tickets);
  return (
    <Link href={'/p-user/tickets'}>
    <div className='w-full border border-violet-600 hover:shadow-md hover:shadow-violet-500 hover:scale-105 duration-200 hover:cursor-pointer'>
      <div className='flex p-2 justify-center font-BYekanBold  bg-violet-300'>
        <div>تیکت های اخیر</div>
      </div>
      <div className='p-2 flex flex-col gap-2'>
        {tickets.length > 0 ? (
          tickets.map((item) => <div className={`w-full h-fit flex gap-2 justify-between items-center border-2 p-2 ${item.isChecked ? 'bg-green-500': 'bg-red-500'}`}>
            <div>{item.title}</div>
            <div className="flex flex-col justify-center items-center gap-1">
              <div className=" p-2 rounded-2xl bg-white">{item.isChecked?"مشاهده شده":"مشاهده نشده"}</div>
              <div>{(shamsi.gregorianToJalali(item.date)).toLocaleString('fa-ir', { useGrouping: false })}</div>
            </div>
          </div>)
        ) : (
          <div>تیکتی ثبت نشده است ...</div>
        )}
        
      </div>
    </div>
    </Link>
  );
}

export default RecentTickets;
