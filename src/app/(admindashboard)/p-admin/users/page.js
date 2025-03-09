import AdminUsers from '@/components/modules/dashboard/AdminUsers';
import connectToDB from '@/root/configs/db';
import userModel from '@/root/models/User';
import { verifyAccessToken } from '@/root/util/auth/auth';
import { cookies } from 'next/headers';
import React from 'react'

export default async function page() {

  connectToDB();
  let users;
  let user = null;
  const token = cookies().get("token");
  if (token) {
    const tokenPayLoad = verifyAccessToken(token.value);
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
    }
  }
  if (user) {
    users = await userModel.find({});
  } else {
    redirect("/login");
  }


  return (
    <div className='w-full h-[calc(100%-80px)]  '>
      <AdminUsers users={JSON.parse(JSON.stringify(users))} user={JSON.parse(JSON.stringify(user))} />
    </div>
  )
}
