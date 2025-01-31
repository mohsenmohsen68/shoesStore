import AdminTickets from '@/components/modules/dashboard/AdminTickets';
import connectToDB from '@/root/configs/db';
import requestModel from '@/root/models/Requests';
import userModel from '@/root/models/User';
import { verifyAccessToken } from '@/root/util/auth/auth';
import { cookies } from 'next/headers';
import React from 'react'

export default async function page() {

  connectToDB();
  let tickets = [];
  let user = null;
  const token = cookies().get("token");
  if (token) {
    const tokenPayLoad = verifyAccessToken(token.value);
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
    }
  }
  if (user) {
    tickets = await requestModel.find({  });
       } else {
    redirect("/login");
  }


  return (
    <div className='w-full h-[calc(100%-80px)]  '>
      <AdminTickets tickets={JSON.parse(JSON.stringify(tickets))} user={JSON.parse(JSON.stringify(user))}/>
    </div>
  )
}
