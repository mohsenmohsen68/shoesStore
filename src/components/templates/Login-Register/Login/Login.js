"use client";
import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import swal from "sweetalert";
import {
  validateEmail,
  validatePhoneNumber,
  validatePassword,
  verifyPassword
} from "@/root/public/util/auth/auth";
import Register from "../Register/Register";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useRouter } from "next/navigation";
import Link from "next/link";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin]
});

let theme = createTheme({});
theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  direction: "rtl",
  palette: {
    salmon: theme.palette.augmentColor({
      color: {
        main: "#FF5733"
      },
      name: "salmon"
    })
  }
});

export default function Login() {
  const router = useRouter();
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const signupWithPassword = async () => {
    // input validations
    if (userName.length <= 2) {
      return swal({
        title: "نام کاربری باید حداقل سه کاراکتر داشته باشد ...",
        icon: "error",
        buttons: "تلاش مجدد"
      });
    }

    const IsPhoneValid = validatePhoneNumber(phoneNumber);
    if (!IsPhoneValid) {
      return swal({
        title: "شماره همراه نامعتبر است ...",
        icon: "error",
        buttons: "تلاش مجدد"
      });
    }

    const IsEmailValid = validateEmail(email);
    if (!IsEmailValid) {
      return swal({
        title: "ایمیل نامعتبر است ...",
        icon: "error",
        buttons: "تلاش مجدد"
      });
    }

    const IsPasswordValid = validatePassword(password);
    if (!IsPasswordValid) {
      return swal({
        title: "رمز عبور قابل حدس است ...",
        icon: "error",
        buttons: "تلاش مجدد"
      });
    }
    const userData = { userName, phoneNumber, email, password };
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.status === 201) {
      swal({
        title: "کاربر با موفقیت ثبت شد ...",
        icon: "success",
        buttons: "ورود به پنل کاربری"
      });
    } else if (res.status === 422) {
      swal({
        title: "کاربر قبلا ثبت نام کرده است ...",
        icon: "error",
        buttons: "خروج"
      });
    }
  };

  const loginWithPassword = async () => {
    if (!phoneOrEmail) {
      return swal({
        title: "ایمیل یا شماره تلفن را وارد کنید ...",
        icon: "error",
        buttons: "تلاش مجدد"
      });
    }
    if (!loginPassword) {
      return swal({
        title: "رمز عبور را وارد کنید ...",
        icon: "error",
        buttons: "تلاش مجدد"
      });
    }

    const isPhoneOrEmailValid = validateEmail(phoneOrEmail);
    const isLoginPassword = validatePassword(loginPassword);

    if (!isPhoneOrEmailValid) {
      return swal({
        title: "ایمیل نامعتبر است...",
        icon: "error",
        buttons: "تلاش مجدد"
      });
    }

    if (!isLoginPassword) {
      return swal({
        title: "رمز عبور اشتباه است ...",
        icon: "error",
        buttons: "تلاش مجدد"
      });
    }

    const res = await fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify({ password: loginPassword, email: phoneOrEmail }),
      headers: {
        "Content-Type": "aplication/json"
      }
    });
    console.log(res);
    if (res.status === 200) {
      return swal({
        title: "با موفقیت وارد شدید ...",
        icon: "success"
      });
    } else if (res.status === 422 || res.status === 419) {
      return swal({
        title: "نام کاربری یا رمز عبور اشتباه است ...",
        icon: "error"
      });
    }
  };

  return (
    <div className='absolute flex flex-col px-2 py-4 space-y-3  w-80 h-[420px] bg-white shadow-xl shadow-black top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
      <div className="flex flex-col gap-2">
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div dir='rtl' className=' flex justify-center items-center '>
            <TextField
              label='شماره همراه/پست الکترونیکی'
              variant='filled'
              inputProps={{
                style: {
                  fontFamily: "BYekan"
                }
              }}
              size='small'
              color='warning'
              value={phoneOrEmail}
              onChange={(event) => setPhoneOrEmail(event.target.value)}
            />
          </div>
          <div dir='rtl' className=' flex justify-center items-center'>
            <TextField
              label='رمز عبور'
              variant='filled'
              inputProps={{
                style: {
                  fontFamily: "BYekan"
                }
              }}
              size='small'
              color='warning'
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
            />
          </div>
        </ThemeProvider>
      </CacheProvider>
      <div className='flex justify-start ms-4'>
        <FormControlLabel
          sx={{
            fontFamily: "BYekan",
            fontSize: "16px"
          }}
          control={
            <Checkbox
              {...label}
              defaultChecked
              sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }}
            />
          }
          label={
            <span style={{ fontSize: "12px", fontFamily: "BYekan" }}>
              {"مرا به یاد داشته باش"}
            </span>
          }
        />
      </div>
      </div>
      <div className='flex flex-col w-full justify-center items-center gap-3'>
        <Button
          className='p-0 w-1/2'
          color='secondary'
          onClick={() => {}}
          variant='contained'
          sx={{
            fontFamily: "BYekan",
            fontSize: "16px"
          }}
        >
          ورود با رمز عبور
        </Button>
        <Button
          className='p-0 w-1/2'
          color='warning'
          onClick={() => {
            setIsPassShown(true);
            setIsCodeBtnShown(false);
            setIsPassBtnShown(true);
          }}
          variant='contained'
          sx={{
            fontFamily: "BYekan",
            fontSize: "16px"
          }}
        >
          ورود با کد تایید
        </Button>
      </div>
      <div className='flex flex-col w-full justify-center items-center gap-3'>
        <p className='font-BYekan text-xs'>
          {" "}
          آیا حساب کاربری ندارید؟{" "}
          {
            <Link href='/register' className='text-green-500'>
              (ثبت نام)
            </Link>
          }
        </p>
        <p className='font-BYekan text-xs'>
          {" "}
          رمز عبور را فراموش کرده‌اید؟{" "}
          {
            <Link href='/forgetpassword' className='text-green-500'>
              (بازیابی رمز)
            </Link>
          }
        </p>
      </div>
      <div className='flex w-full justify-center items-center'>
        <Button
          color='error'
          className='p-0 w-1/2'
          onClick={() => {
            router.replace("/");
          }}
          variant='contained'
          sx={{
            fontFamily: "BYekan",
            fontSize: "16px"
          }}
        >
          بازگشت
        </Button>
      </div>
    </div>
  );
}
