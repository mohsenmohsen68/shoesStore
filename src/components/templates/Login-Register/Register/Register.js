"use client";
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { createANewUser } from "@/redux/users/Users";
import toast, { Toaster } from "react-hot-toast";

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

export default function Register() {
  const router = useRouter();
  const [isPassShown, setIsPassShown] = React.useState(false);
  const [isCodeBtnShown, setIsCodeBtnShown] = useState(true);
  const [isPassBtnShown, setIsPassBtnShown] = useState(false);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const signupWithPassword = async () => {
    const body = { userName, email, password, phoneNumber };

    //front end validation
    if (!userName.trim()) {
      return toast.error(
        <div className='font-BYekan text-sm'>نام کاربری را وارد کنید ...</div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
    if (!phoneNumber.trim()) {
      return toast.error(
        <div className='font-BYekan text-sm'>شماره تلفن را وارد کنید...</div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
    if (!password.trim()) {
      return toast.error(
        <div className='font-BYekan text-sm'>رمز عبور را وارد کنید...</div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }

    const userCreationResponse = await dispatch(createANewUser(body));
    if (userCreationResponse.payload.status === 201) {
      toast.success(
        <div className='font-BYekan text-sm'>کاربر جدید اضافه شد ...</div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
      setEmail("");
      setUserName("");
      setPassword("");
      setPhoneNumber("");
    } else if (userCreationResponse.payload.status === 422) {
      toast.error(
        <div className='  font-BYekan text-sm flex justify-center'>
          کاربری با این مشخصات قبلا ثبت نام کرده است...{" "}
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    } else if (userCreationResponse.payload.status === 400) {
      toast.error(
        <div className='  font-BYekan text-sm flex justify-center'>
          پست الکترونیک یا شماره تلفن نامعتبر است...{" "}
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    } else {
      toast.error(
        <div className='  font-BYekan text-sm flex justify-center'>
          مشکلی در سمت سرور به وجود آمده است...{" "}
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
  };

  return (
    <div className='absolute flex flex-col px-2 py-4 justify-evenly  w-80 h-[420px] bg-white shadow-xl shadow-black top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div dir='rtl' className=' flex justify-center items-center '>
            <TextField
              label='نام کاربری'
              variant='filled'
              inputProps={{
                style: {
                  fontFamily: "BYekan"
                }
              }}
              size='small'
              color='warning'
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div className=' flex justify-center items-center '>
            <TextField
              dir='ltr'
              label='شماره همراه'
              variant='filled'
              inputProps={{
                style: {
                  fontFamily: "BYekan"
                }
              }}
              size='small'
              color='warning'
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>
          <div dir='rtl' className=' flex justify-center items-center '>
            <TextField
              label='پست الکترونیکی'
              variant='filled'
              inputProps={{
                style: {
                  fontFamily: "BYekan"
                }
              }}
              size='small'
              color='warning'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {isPassShown && (
            <div dir='rtl' className=' flex justify-center items-center '>
              <TextField
                label='رمز عبور'
                type='password'
                variant='filled'
                inputProps={{
                  style: {
                    fontFamily: "BYekan"
                  }
                }}
                size='small'
                color='warning'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          )}
        </ThemeProvider>
      </CacheProvider>

      {isCodeBtnShown && (
        <Button
          className='p-0 w-1/2 font-BYekan text-sm hover:cursor-pointer self-center'
          variant='contained'
          color='warning'
          sx={{
            fontFamily: "BYekan",
            fontSize: "16px"
          }}
        >
          ثبت نام با کد تایید
        </Button>
      )}

      {isCodeBtnShown && (
        <Button
          className='p-0 w-1/2 font-BYekan text-sm hover:cursor-pointer self-center'
          color='secondary'
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
          ثبت نام با رمز عبور
        </Button>
      )}
      {isPassBtnShown && (
        <Button
          className='p-0 w-1/2 font-BYekan text-sm hover:cursor-pointer self-center'
          color='success'
          onClick={signupWithPassword}
          variant='contained'
          sx={{
            fontFamily: "BYekan",
            fontSize: "16px"
          }}
        >
          ثبت نام
        </Button>
      )}
      <div className='flex w-full justify-center'>
        <p className='font-BYekan text-xs'>
          {" "}
          آیا ثبت نام کرده اید؟{" "}
          {
            <Link href='/login' className='text-green-500'>
              (ورود)
            </Link>
          }
        </p>
      </div>

      <Button
        color='error'
        className='p-0 w-1/2 font-BYekan text-sm hover:cursor-pointer self-center'
        variant='contained'
        sx={{
          fontFamily: "BYekan",
          fontSize: "16px"
        }}
        onClick={() => {
          router.push("/");
        }}
      >
        بازگشت
      </Button>
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
