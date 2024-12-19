"use client";
import { createANewRequest } from "@/root/redux/request/Request";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

function ContactusForm({ userID }) {
  console.log("userID", userID);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [request, setRequest] = useState("");
  const dispatch = useDispatch();

  const requestHandler = async (e) => {
    e.preventDefault();
    console.log(name, email, phone, company, request);
    if (!phone.trim() || !request.trim()) {
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
    const res = await dispatch(
      createANewRequest({
        name,
        email,
        phoneNumber: phone,
        company,
        requestBody: request,
        response: "",
        user: userID
      })
    );
    console.log("resssss", res);
    if (res.payload.status === 201) {
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
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
  };
  return (
    <div className='flex flex-col gap-2 justify-center items-center p-4 shadow-lg mx-4 '>
      <div className='font-BYekan text-sm'> فرم تماس با ما </div>
      <div className='font-BYekan text-xl'>
        برای تمای با ما فرم زیر را پر کنید ...
      </div>
      <div className='flex w-full'>
        <div className='flex flex-col w-1/2 mx-2 font-BYekan'>
          <p>نام و نام خانوادگی</p>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex flex-col w-1/2 mx-2 font-BYekan'>
          <p>آدرس ایمیل</p>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className='flex w-full'>
        <div className='flex flex-col w-1/2 mx-2 font-BYekan'>
          <p>شماره تماس</p>
          <input
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className='flex flex-col w-1/2 mx-2 font-BYekan'>
          <p>نام شرکت</p>
          <input
            type='text'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>

      <div className='flex flex-col w-full justify-start px-2 font-BYekan'>
        <p>درخواست</p>
        <textarea
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