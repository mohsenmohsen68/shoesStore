"use client";
import { updateUser } from "@/redux/users/Users";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { updatePassword } from "@/root/redux/users/Users";

export default function ProfileSetting() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [lastUserName, setLastUserName] = useState("");
  const [lastPhoneNumber, setLastPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState(0);
  const [passVisible, setPassVisible] = useState(false);
  const [passVisible1, setPassVisible1] = useState(false);
  const [passVisible2, setPassVisible2] = useState(false);
  const [lastPass, setLastPass] = useState("");
  const [newPass1, setNewPass1] = useState("");
  const [newPass2, setNewPass2] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/auth/me")
        .then((res) => res.json())
        .then((data) => data);
      console.log(res);
      setUserName(res.data.userName);
      setPhoneNumber(res.data.phoneNumber);
      setRole(res.data.role)
      setLastUserName(res.data.userName);
      setLastPhoneNumber(res.data.phoneNumber);
      setEmail(res.data.email);
      setId(res.data._id);
    };
    getUser();
  }, []);

  const changeInfoHandler = async () => {
    const hasUserNameChanged = lastUserName !== userName;
    const hasPhoneNumberChanged = lastPhoneNumber !== phoneNumber;
    const body = {
      userName,
      phoneNumber,
      role,
      email,
      id,
      hasUserNameChanged,
      hasPhoneNumberChanged
    };
    const res = await dispatch(updateUser(body));
    console.log("res : ", res);
    if (res.payload.status === 400) {
      return toast.error(
        <div className='font-BYekan text-sm'>{res.payload.message}</div>,
        {
          duration: 3000,
          position: "top-center"
        }
      );
    } else if (res.payload.status === 422) {
      return toast.error(
        <div className='font-BYekan text-sm'>{res.payload.message}</div>,
        {
          duration: 3000,
          position: "top-center"
        }
      );
    } else if (res.payload.status === 200) {
      toast.success(
        <div className='font-BYekan text-sm'>تغییرات با موفقیت اعمال شد.</div>,
        {
          duration: 3000,
          position: "top-center"
        }
      );
      router.refresh();
    }
  };

const changePasswordHandler = async() => {
  console.log(lastPass, newPass1, newPass2,id)
  if(newPass1 !== newPass2){
    return toast.error(
      <div className='font-BYekan text-sm'>پسوردهای جدید با یکدیگر مطابقت ندارند ...</div>,
      {
        duration: 3000,
        position: "top-center"
      }
    ); 
  }
  const body = {lastPass, newPass1, newPass2, id}
  const res = await dispatch(updatePassword(body))
  console.log("res :::" ,res)
  if(res.payload.status === 200){
    setLastPass('')
    setNewPass1('')
    setNewPass2('')
    return toast.success(
      <div className='font-BYekan text-sm'>پسوردهای جدید با موفقیت تغییر کرد ...</div>,
      {
        duration: 3000,
        position: "top-center"
      }
    ); 
  }else{
    return toast.error(
      <div className='font-BYekan text-sm'>پسورد وارد شده اشتباه است ...</div>,
      {
        duration: 3000,
        position: "top-center"
      }
    ); 
  }
}

  return (
    <div>
      <div className='flex flex-col gap-2 p-4 w-full'>
        <h1>تغییر مشخصات</h1>
        <div className='flex'>
          <input
            type='text'
            className='inline'
            placeholder='نام کاربری'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className='flex'>
          <input
            type='text'
            className='text'
            placeholder='شماره تلفن همراه'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className='flex'>
          <input
            type='text'
            className='text'
            placeholder='پست الکترونیکی'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex justify-start'>
          <button
            className='border py-2 px-2 shadow-md bg-green-500 hover:bg-green-400'
            onClick={() => {
              changeInfoHandler();
            }}
          >
            تغییر مشخصات
          </button>
        </div>
      </div>
      <hr />
      <div className='flex flex-col gap-2 p-4 w-full'>
        <h1>تغییر رمز عبور</h1>
        <div className='flex border justify-start w-fit items-center px-2'>
          <input
            type={passVisible ? "text" : "password"}
            className='border-none focus:outline-none focus:ring-0'
            placeholder='رمز عبور قبلی'
            value={lastPass}
            onChange={(e) => setLastPass(e.target.value)}
          />
          {!passVisible && (
            <FaRegEye
              className='text-xl'
              onClick={() => setPassVisible(true)}
            />
          )}
          {passVisible && (
            <FaRegEyeSlash
              className='text-xl'
              onClick={() => setPassVisible(false)}
            />
          )}
        </div>
        <div className='flex gap-2'>
          <div className='flex border justify-start w-fit items-center px-2'>
            <input
              type={passVisible1 ? "text" : "password"}
              className='border-none focus:outline-none focus:ring-0'
              placeholder='رمز عبور جدید'
              value={newPass1}
              onChange={(e) => setNewPass1(e.target.value)}
            />
            {!passVisible1 && (
              <FaRegEye
                className='text-xl'
                onClick={() => setPassVisible1(true)}
              />
            )}
            {passVisible1 && (
              <FaRegEyeSlash
                className='text-xl'
                onClick={() => setPassVisible1(false)}
              />
            )}
          </div>
          <div className='flex border justify-start w-fit items-center px-2'>
            <input
              type={passVisible2 ? "text" : "password"}
              className='border-none focus:outline-none focus:ring-0'
              placeholder='تکرار رمز عبور جدید'
              value={newPass2}
              onChange={(e) => setNewPass2(e.target.value)}
            />
            {!passVisible2 && (
              <FaRegEye
                className='text-xl'
                onClick={() => setPassVisible2(true)}
              />
            )}
            {passVisible2 && (
              <FaRegEyeSlash
                className='text-xl'
                onClick={() => setPassVisible2(false)}
              />
            )}
          </div>
        </div>
        <div className='flex justify-start'>
          <button className='border py-2 px-2 shadow-md bg-green-500 hover:bg-green-400' onClick={()=>changePasswordHandler()}>
            تغییر رمز عبور
          </button>
        </div>
      </div>
      <hr />
      <div className='flex flex-col px-4 w-full'>
        <h1>تغییر عکس پروفایل</h1>
        <div className='flex justify-center items-center w-full mb-2'>
          <label
            htmlFor='myfile'
            className='p-4 border-dashed border-green-700 border-2 bg-green-500 hover:bg-green-400'
          >
            انتخاب عکس{" "}
          </label>
          <input
            type='file'
            name='profileImg'
            id='myfile'
            accept='image/png, image/jpeg'
            className='hidden'
          />
        </div>
      </div>
      <hr />
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
