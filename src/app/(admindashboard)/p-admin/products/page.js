import React from 'react'
import connectToDB from '@/root/configs/db';
import userModel from '@/root/models/User';
import { verifyAccessToken } from '@/root/util/auth/auth';
import { cookies } from 'next/headers';
import productModel from '@/root/models/Product';

async function page() {


    connectToDB();
    let products;
    let user = null;
    const token = cookies().get("token");
    if (token) {
      const tokenPayLoad = verifyAccessToken(token.value);
      if (tokenPayLoad) {
        user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
      }
    }
    if (user) {
      products = await productModel.find({});
    } else {
      redirect("/login");
    }



    return (
        <div className='w-full h-[calc(100%-80px)]  '>
      <AdminProducts products={JSON.parse(JSON.stringify(products))} user={JSON.parse(JSON.stringify(user))} />
    </div>
    )
}

export default page
