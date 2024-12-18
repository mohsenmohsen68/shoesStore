import Map from "@/components/Map";
import BreadCrumb from "@/components/modules/BreadCrumb";
import ContactusForm from "@/components/modules/ContactusForm";
import Information from "@/components/modules/Information";
import userModel from "@/root/models/User";
import { verifyAccessToken } from "@/root/util/auth/auth";
import { cookies } from "next/headers";
import React from "react";

async function page() {
  let user = null;
  const token = cookies().get("token");
  if (token) {
    const tokenPayLoad = verifyAccessToken(token.value);
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
      console.log("ussser : ", user);
    }
  }
  return (
    <div className='mt-28 mb-4'>
      <div className='mb-4'>
        <BreadCrumb title={"تماس با ما "} />
      </div>
      <div className='flex w-full items-center gap-4 p-4 mb-4'>
        <div className='w-1/2 h-96 bg-red-500 relative flex justify-center'>
          <Map long={35.672534} lat={51.349217}/>
          <div className='w-3/4 h-1/2 absolute top-[calc(70%)] gap-2 bg-white shadow-lg flex flex-col justify-center items-center'>
            <div className='text-2xl'>آدرس تولیدی </div>
            <div className='text-lg'>
              {" "}
              پل ستارخان - بزرگراه شیخ فضل اله نوری{" "}
            </div>
          </div>
        </div>
        <div className='w-1/2 h-96 bg-red-500 relative flex justify-center'>
          <Map long={35.708590} lat={51.390032}/>
          <div className='w-3/4 h-1/2 absolute top-[calc(70%)] gap-2 bg-white shadow-lg flex flex-col justify-center items-center'>
            <div className='text-2xl'>آدرس فروشگاه </div>
            <div className='text-lg'>
              {" "}
              ضلع شرقی بیمارستان امام خمینی - بلوار کشاورز- قریب{" "}
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full items-center mt-24'>
        <div className='w-1/2'>
          <Information />
        </div>
        <div className='w-1/2'>
          <ContactusForm userID={JSON.parse(JSON.stringify(user._id))} />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default page;
