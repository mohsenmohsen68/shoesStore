"use client";
import { createANewRequest } from "@/root/redux/request/Request";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

function ContactusForm({ userID }) {
  console.log("userID", userID);

  
  const [request, setRequest] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const requestHandler = async (e) => {
    e.preventDefault();
    if (!title.trim() || !request.trim()) {
      return toast.error(
        <div className='font-BYekan text-sm'>
          درخواست و شماره تلفن را حتما باید وارد کنید ...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
    if(userID){
      const res = await dispatch(
        createANewRequest({
          title,
          requestBody: request,
          response: "",
          user: userID
        })
      );
      console.log("resssss", res);
      if (res.payload.status === 201) {
        setTitle("")
        setRequest("");
        return toast.success(
          <div className='font-BYekan text-sm'>
            درخواست شما با موفقیت ثبت شد ...
          </div>,
          {
            duration: 4000,
            position: "top-center"
          }
        );
      } else {
        setTitle("")
        setRequest("");
        return toast.error(
          <div className='font-BYekan text-sm'>
            مشکلی برای ثبت درخواست شما رخ داده است ...
          </div>,
          {
            duration: 4000,
            position: "top-center"
          }
        );
      }
    }else{
      return toast.error(
        <div className='font-BYekan text-sm'>
          برای ثبت درخواست حتما باید در سایت ثبت نام کنید ...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
  };
  return (
    <div className='flex flex-col gap-2 justify-center items-center p-4 shadow-lg mx-4 dark:shadow-md dark:bg-slate-800 dark:shadow-slate-500 '>
      <div className='font-BYekan text-sm'> فرم تماس با ما </div>
      <div className='font-BYekan text-xl'>
        برای تماس با ما فرم زیر را پر کنید ...
      </div>
      <div className='flex flex-col w-full justify-start px-2 font-BYekan'>
       
        <input
          className='w-full'
          type='text'
          placeholder="عنوان درخواست"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className='flex flex-col w-full justify-start px-2 font-BYekan'>
        <textarea
        placeholder="متن درخواست"
          rows={4}
          className='w-full'
          type='text'
          value={request}
          onChange={(e) => setRequest(e.target.value)}
        />
      </div>
      <div className=' w-full flex justify-center'>
        <button
          className='w-full p-2 flex justify-center items-center bg-green-500 hover:bg-green-400 font-BYekan text-white font-bold mx-2'
          onClick={(e) => requestHandler(e)}
        >
          ثبت درخواست
        </button>
      </div>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white"
            }
          },
          error: {
            style: {
              background: "red",
              color: "white"
            }
          }
        }}
      />
    </div>
  );
}

export default ContactusForm;
