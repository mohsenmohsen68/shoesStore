"use client";
import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import NumberToPersianWord from "number_to_persian_word";
import { validatePhoneNumber, validatePassword } from "@/root/util/auth/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/users/Users";
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

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [codeIsSent, setCodeIsSent] = useState(false);
  const [code, setCode] = useState("");

  const loginWithPhoneNumber = async () => {
    if (!phone) {
      return toast.error(
        <div className='font-BYekan text-sm'>شماره تلفن را وارد کنید ...</div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
    const isPhoneValid = validatePhoneNumber(phone);
    if (!isPhoneValid) {
      return toast.error(
        <div className='font-BYekan text-sm'>شماره تلفن نامعتبر است...</div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
    const userBody = { phoneNumber: phone };

    const res = await fetch("/api/sms/login/send", {
      method: "POST",
      body: JSON.stringify(userBody),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.status === 500) {
      return toast.error(
        <div className='font-BYekan text-sm'>
          شماره تلفن معتبری را وارد کنید ...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    } else if (res.status === 201) {
      setCodeIsSent(true);
      return toast.success(
        <div className='font-BYekan text-sm'>
          کد تایید به این شماره ارسال شد ...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    } else if (res.status === 400) {
      return toast.error(
        <div className='font-BYekan text-sm'>
          کاربری با این شماره ثبت نام نکرده است...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
  };

  const verifyCode = async () => {
    const body = { phoneNumber: phone, code };
    console.log("phone and codes : ", phone, code);
    const res = await fetch("/api/sms/login/verify", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (res.status === 200) {
      router.push("/");
      router.refresh();
      return toast.success(
        <div className='font-BYekan text-sm'> با موفقیت وارد شدید...</div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    } else if (res.status === 409) {
      return toast.error(
        <div className='font-BYekan text-sm'>
          کد وارد شده صحیح نمی باشد ...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    } else if (res.status === 410) {
      return toast.error(
        <div className='font-BYekan text-sm'>
          کد وارد شده منقضی شده است ...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
  };

  const loginWithPassword = async () => {
    if (!phone) {
      return toast.error(
        <div className='font-BYekan text-sm'>
          ایمیل یا شماره تلفن را وارد کنید ...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
    if (!loginPassword) {
      return toast.error(
        <div className='font-BYekan text-sm'>رمز عبور را وارد کنید ...</div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }

    const isPhoneValid = validatePhoneNumber(phone);
    const isLoginPassword = validatePassword(loginPassword);

    if (!isPhoneValid) {
      return toast.error(
        <div className='font-BYekan text-sm'>شماره تلفن نامعتبر است...</div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }

    const userBody = { phoneNumber: phone, password: loginPassword };
    const response = await dispatch(loginUser(userBody));
    console.log("response : ", response);

    if (response.payload.status === 200) {
      toast.success(
        <div className='font-BYekan text-sm'>با موفقیت وارد شدید ...</div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
      router.push("/");
      router.refresh();
    } else if (response.payload.status === 422) {
      return toast.error(
        <div className='font-BYekan text-sm'>
          شماره تلفن یا رمز عبور اشتباه است ...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
    if (response.payload.status === 409) {
      return toast.error(
        <div className='font-BYekan text-sm'>
          رمز عبور یا شماره تماس نامعتبر است ...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
  };

  return (
    <div className='absolute flex flex-col justify-center items-center px-2 py-4 space-y-3  w-80 h-[420px] bg-white shadow-xl shadow-black top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
      <div className='flex flex-col gap-2'>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            {!codeIsSent && (
              <div dir='rtl' className=' flex justify-center items-center '>
                <TextField
                  label='شماره همراه'
                  variant='filled'
                  inputProps={{
                    style: {
                      fontFamily: "BYekan"
                    }
                  }}
                  size='small'
                  color='warning'
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            )}
            {isPasswordShown && !codeIsSent && (
              <div dir='rtl' className=' flex justify-center items-center'>
                <TextField
                  type='password'
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
            )}
            {codeIsSent && (
              <div className='flex flex-col'>
                <div className=" text-center">
                  <p className='font-BYekan text-xs'>
                    کد ارسالی به شماره همراه
                  </p>
                  <p className='font-BYekan text-sm'>
                    {NumberToPersianWord.convertEnToPe(phone)}
                  </p>
                  <p className='font-BYekan text-xs mb-4'>
                    را وارد کنید
                  </p>
                </div>
                <div dir='rtl' className=' flex justify-center items-center '>
                  <TextField
                    label='کد ارسالی'
                    variant='filled'
                    inputProps={{
                      style: {
                        fontFamily: "BYekan"
                      }
                    }}
                    size='small'
                    color='warning'
                    onChange={(event) => {
                      setCode(event.target.value);
                    }}
                  />
                </div>
                <Button
                  onClick={verifyCode}
                  className='p-0 w-1/2 font-BYekan text-sm hover:cursor-pointer self-center mb-2'
                  variant='contained'
                  color='success'
                  sx={{
                    fontFamily: "BYekan",
                    fontSize: "16px",
                    marginBottom: "4px",
                    marginTop: "8px"
                  }}
                >
                  تایید
                </Button>
                <Button
                  onClick={() => {
                    setCodeIsSent(false);
                  }}
                  className='p-0 w-1/2 font-BYekan text-sm hover:cursor-pointer self-center mb-2'
                  variant='contained'
                  color='error'
                  sx={{
                    fontFamily: "BYekan",
                    fontSize: "16px",
                    marginBottom: "4px"
                  }}
                >
                  بازگشت
                </Button>
              </div>
            )}
          </ThemeProvider>
        </CacheProvider>
        {!codeIsSent && (
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
        )}
      </div>
      {!codeIsSent && (
        <div className='flex flex-col w-full justify-center items-center gap-3'>
          {!isPasswordShown && (
            <Button
              className='p-0 w-1/2'
              color='secondary'
              onClick={() => {
                setIsPasswordShown(true);
              }}
              variant='contained'
              sx={{
                fontFamily: "BYekan",
                fontSize: "16px"
              }}
            >
              ورود با رمز عبور
            </Button>
          )}
          {isPasswordShown && (
            <Button
              className='p-0 w-1/2'
              color='secondary'
              onClick={() => {
                loginWithPassword();
              }}
              variant='contained'
              sx={{
                fontFamily: "BYekan",
                fontSize: "16px"
              }}
            >
              ورود{" "}
            </Button>
          )}
          <Button
            className='p-0 w-1/2'
            color='warning'
            onClick={() => {
              loginWithPhoneNumber();
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
      )}
      {!codeIsSent && (
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
      )}
      {!codeIsSent && (
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
      )}
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
