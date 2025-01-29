import React from 'react'
import DataTable from "@/components/modules/DataTable"
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/root/util/auth/auth';
import userModel from '@/root/models/User';
import commentModel from '@/root/models/Comment';
import connectToDB from '@/root/configs/db';

import * as shamsi from 'shamsi-date-converter';

export default async function page() {
  connectToDB();
  let comments = [];
  const neededData = []; 
  let user = null;
  const token = cookies().get("token");
  if (token) {
    const tokenPayLoad = verifyAccessToken(token.value);
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
    }
  }
  if (user) {
    console.log('user .. ',user._id)
    comments = await commentModel.find({ user: user._id }).populate("product", "name").lean();
      console.log("fav:",comments)
      comments.map(item=>{neededData.push({comment: item.commentBody, score:item.score, product:item.product, status: item.status, date: (shamsi.gregorianToJalali(item.date)).toLocaleString('fa-ir', { useGrouping: false }) })})
    } else {
    redirect("/login");
  }


  return (
    <div className='w-full h-[calc(100%-80px)] '>
      <DataTable datas={JSON.parse(JSON.stringify(neededData))}/>
    </div>
  )
}
