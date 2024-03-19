"use client";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import RTL from "@/components/modules/RTL";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import swal from "sweetalert";
import { validateEmail, validatePhoneNumber, validatePassword, verifyPassword } from "@/root/public/util/auth/auth";
import userModel from "@/root/models/users";

export default function Login() {
  const [isLoginShown, setIsLoginShown] = useState(true);
  const [isPassShown, setIsPassShown] = useState(false);
  const [isCodeBtnShown, setIsCodeBtnShown] = useState(true);
  const [isPassBtnShown, setIsPassBtnShown] = useState(false);
  const [isRegisterShown, setIsRegisterShown] = useState(false);

  const [userName,setUserName] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const signupWithPassword = async () =>{
    const userData = {userName, phoneNumber,email, password}

  if(userName.length <= 2)
  {
    return swal({
      title:'نام کاربری باید حداقل سه کاراکتر داشته باشد ...',
      icon: "error",
      buttons:'تلاش مجدد'
    })
  }

  const IsPhoneValid = validatePhoneNumber(phoneNumber)
  if(!IsPhoneValid){
    return swal({
      title:'شماره همراه نامعتبر است ...',
      icon: "error",
      buttons:'تلاش مجدد'
    })
  }

  const IsEmailValid = validateEmail(email)
if(!IsEmailValid){
  return swal({
    title:'ایمیل نامعتبر است ...',
    icon: "error",
    buttons:'تلاش مجدد'
  })
}
 
  const IsPasswordValid = validatePassword (password)
if(!IsPasswordValid){
  return swal({
    title:'رمز عبور قابل حدس است ...',
    icon: "error",
    buttons:'تلاش مجدد'
  })
}


    const res =await fetch('/api/auth/signup', {
      method:"POST",
      body:JSON.stringify(userData),
      headers:{
        "Content-Type" : "application/json"
      }
    })
    if(res.status === 201){
      swal({
        title:'کاربر با موفقیت ثبت شد ...',
        icon: "success",
        buttons:'ورود به پنل کاربری'
      })
    }else if(res.status === 402){
      swal({
        title:'داده ها نامعتبر هستند ...',
        icon: "failure",
        buttons:'خروج'
      })
    }

  }

  const loginWithPassword = async () =>{
    if(!phoneOrEmail){
      swal({
        message:'ایمیل یا شماره تلفن را وارد کنید ...',
        icon:'error',
        buttons:'تلاش مجدد'
      })
    }
    if(!loginPassword){
      swal({
        message:'رمز عبور را وارد کنید ...',
        icon:'error',
        buttons:'تلاش مجدد'
      })
    }

    const isPhoneOrEmailValid = validateEmail(phoneOrEmail)
    const isLoginPassword = validatePassword(loginPassword)

    if(!isPhoneOrEmailValid){
      swal({
        message:'ایمیل نامعتبر است...',
        icon:'error',
        buttons:'تلاش مجدد'
      })
    }

    if(!isLoginPassword){
      swal({
        message:'رمز عبور اشتباه است ...',
        icon:'error',
        buttons:'تلاش مجدد'
      })
    }

    const myUser = userModel.findOne({phoneOrEmail})

    if(!myUser){
      swal({
        message:'چنین کاربری وجود ندارد ...',
        icon:'error',
        buttons:'تلاش مجدد'
      })
    }

    const verifyIfPasswordIsCorrect  = verifyPassword(loginPassword,user.password)
    if(!verifyIfPasswordIsCorrect){
      swal({
        message:'چنین کاربری وجود ندارد ...',
        icon:'error',
        buttons:'تلاش مجدد'
      })
    }

    const res  =await fetch('/api/auth/signin',{
      method:'POST',
      body:JSON.stringify({password:loginPassword, email:phoneOrEmail}),
      headers:{
        'Content-Type':'aplication/json'
      }
    })
    
    if(res.status === 200){
      swal({
        message:'با موفقیت وارد شدید ...',
        icon:'success',
      })
    }
    

  }

  return (
    <>
      {isLoginShown && (
        <div className="absolute flex flex-col px-2 py-4 space-y-3  w-80 h-[420px] bg-white shadow-xl shadow-black top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <RTL>
            <TextField
              inputProps={{
                style: {
                  fontFamily: "BYekan",
                  direction: "ltr"
                }
              }}
              variant="outlined"
              fullWidth
              id="outlined-basic"
              label="ایمیل / شماره موبایل"
              value={phoneOrEmail}
              onChange={event=>setPhoneOrEmail(event.target.value) }
            />
          </RTL>

          <RTL>
            <TextField
              inputProps={{
                style: {
                  fontFamily: "BYekan",
                  direction: "ltr"
                }
              }}
              fullWidth
              variant="outlined"
              id="outlined-basic"
              label="رمز عبور"
              type="password"
              value={loginPassword}
              onChange={event => setLoginPassword(event.target.value) }
            />
          </RTL>
          <FormControlLabel
            inputProps={{
              style: {
                fontFamily: "BYekan"
              }
            }}
            control={<Checkbox />}
            label="مرا به یاد داشته باش"
          />
          <Button
            variant="contained"
            onClick={loginWithPassword}
            className="font-BYekan text-base bg-sky-500 text-white hover:bg-green-500"
          >
            ورود
          </Button>
          <span className="font-BYekan text-sm">
            رمز عبور را فراموش کرده‌اید؟
          </span>
          <Button
            variant="contained"
            className="font-BYekan text-base bg-sky-500 text-white hover:bg-green-500"
          >
            ورود با کد یکبار مصرف
          </Button>
          <p className="font-BYekan text-sm">آیا حساب کاربری ندارید؟</p>
          <Button
            onClick={() => {
              setIsLoginShown(false);
              setIsRegisterShown(true);
            }}
            className="font-BYekan text-base bg-sky-500 text-white hover:bg-green-500 "
          >
            ثبت نام
          </Button>
        </div>
      )}
      {isRegisterShown && (
        <div className="absolute flex flex-col px-2 py-4 justify-evenly  w-80 h-[420px] bg-white shadow-xl shadow-black top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <RTL>
            <TextField
              inputProps={{
                style: {
                  fontFamily: "BYekan",
                  direction: "ltr"
                }
              }}
              variant="outlined"
              fullWidth
              id="outlined-basic"
              label="نام"
              value={userName}
              onChange={event => setUserName(event.target.value)}
            />
          </RTL>

          <RTL>
            <TextField
              inputProps={{
                style: {
                  fontFamily: "BYekan",
                  direction: "ltr"
                }
              }}
              fullWidth
              variant="outlined"
              id="outlined-basic"
              label="شماره موبایل"
              value={phoneNumber}
              onChange={event => setPhoneNumber(event.target.value)}
            />
          </RTL>

          <RTL>
            <TextField
              inputProps={{
                style: {
                  fontFamily: "BYekan",
                  direction: "ltr"
                }
              }}
              fullWidth
              variant="outlined"
              id="outlined-basic"
              label="ایمیل (دلخواه)"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </RTL>
          {isPassShown && (
            <RTL>
              <TextField
                inputProps={{
                  style: {
                    fontFamily: "BYekan",
                    direction: "ltr"
                  }
                }}
                fullWidth
                variant="outlined"
                id="outlined-basic"
                label="رمز عبور"
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </RTL>
          )}

          {isCodeBtnShown && (
            <Button
              variant="contained"
              className="font-BYekan text-base bg-sky-500 text-white hover:bg-green-500"
            >
              ثبت نام با کد تایید
            </Button>
          )}

          {isCodeBtnShown && (
            <Button
              onClick={() => {
                setIsPassShown(true);
                setIsCodeBtnShown(false);
                setIsPassBtnShown(true)
              }}
              variant="contained"
              className="font-BYekan text-base bg-sky-500 text-white hover:bg-green-500"
            >
              ثبت نام با رمز عبور
            </Button>
          )}
          {isPassBtnShown && (
            <Button
              onClick={signupWithPassword}
              variant="contained"
              className="font-BYekan text-base bg-sky-500 text-white hover:bg-green-500"
            >
              ثبت نام
            </Button>
          )}

          <span
            onClick={() => {
              setIsLoginShown(true);
              setIsRegisterShown(false);
            }}
            className="font-BYekan text-sm hover:cursor-pointer self-center"
          >
            بازگشت به ورود
          </span>
        </div>
      )}
    </>
  );
}
