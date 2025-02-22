"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import AdminUserTable from "@/components/modules/dashboard/AdminUserTable";
import { addNewUser } from "@/root/redux/users/Users";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2
};

export default function AdminTickets({ users, user }) {
  console.log("users : ", users, "user : ", user);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const registerHandler = async () => {
    if (
      role === "" ||
      phoneNumber === "" ||
      userName === "" ||
      password === ""
    ) {
      toast.error(
        <div className='font-BYekan text-sm'>
          نقش، نام کاربری یا شماره تماس نمی تواند خالی باشد ...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    } else {
      const result = await dispatch(
        addNewUser({ userName, phoneNumber, email, role, password })
      );
      console.log(result);
      if (result.payload.status === 201) {
        toast.success(
          <div className='font-BYekan text-sm'>کاربر جدید اضافه شد ...</div>,
          {
            duration: 4000,
            position: "top-center"
          }
        );
      } else {
        toast.error(
          <div className='font-BYekan text-sm'>
            مشکلی در ثبت کاربر جدید رخ داده است ...
          </div>,
          {
            duration: 4000,
            position: "top-center"
          }
        );
      }

      setUserName("");
      setPhoneNumber("");
      setEmail("");
      setRole("");
      setPassword("");
    }
  };

  return (
    <div className=' flex justify-center w-full h-full '>
      <div className='flex w-full h-full flex-col items-center gap-y-1'>
        <div className='w-full '>
          <AdminUserTable datas={JSON.parse(JSON.stringify(users))} />
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className='flex flex-col gap-y-2'>
          <h2 className='font-BYekanBold'>ثبت کاربر جدید</h2>
          <div className='w-full text-center lg:flex lg:flex-col lg:gap-2'>
            <input
              type='text'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder='نام کاربری'
              className='w-full'
            />
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='ایمیل'
              className='w-full'
            />
          </div>
          <div className='w-full text-center lg:flex lg:flex-col lg:gap-2'>
            <input
              type='text'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='شماره تماس'
              className='w-full'
            />
            <select value={-1} onChange={e=>setRole(e.target.value)}>
              <option value='-1'>نقش کاربر را انتخاب کنید</option>
              <option value='USER'>
                کاربر عادی
              </option>
              <option value='ADMIN'>
                کاربر ادمین
              </option>
            </select>
          </div>
          <div className='w-full text-center lg:flex lg:flex-col lg:gap-2'>
            <input
              type='text'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='رمز عبور'
              className='w-full'
            />
            <input
              type='text'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder='تکرار رمز عبور'
              className='w-full'
            />
          </div>

          <div className='w-full flex justify-end'>
            <button
              className='border py-2 px-2 shadow-md bg-red-500 hover:bg-red-400'
              onClick={handleClose}
            >
              انصراف
            </button>
            <button
              className='border py-2 px-2 shadow-md bg-green-500 hover:bg-green-400 ml-2'
              onClick={registerHandler}
            >
              ایجاد کاربر جدید
            </button>
          </div>
        </Box>
      </Modal>
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
