import React from "react";
import Register from "@/components/templates/Login-Register/Register/Register";
import connectToDB from "@/root/configs/db";
import { verifyAccessToken } from "@/root/util/auth/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'صفحه ثبت نام',
  description: 'Generated by Next.js',
}

export default async function page() {
  let user = null;
  connectToDB();
  const token = cookies().get("token");
  if (token) {
    const tokenPayLoad = verifyAccessToken(token.value);
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
      if(user){
        redirect('/')
      }
    }
  }
  return (
    <div className="relative w-full h-dvh  flex">
      <img src="/img/login.jpg" className="w-full h-full" alt="login image" />
      <div className="absolute w-1/2 md:w-full left-0">
        <div className="relative  h-dvh bg-black opacity-50 ">
        </div>
          <Register />
      </div>
    </div>
  );
}
