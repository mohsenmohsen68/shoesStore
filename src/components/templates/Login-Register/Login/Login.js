"use client";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import RTL from "@/components/modules/RTL";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

export default function Login() {
  const [isLoginShown, setIsLoginShown] = useState(true);
  const [isPassShown, setIsPassShown] = useState(false);
  const [isCodeBtnShown, setIsCodeBtnShown] = useState(true);
  const [isPassBtnShown, setIsPassBtnShown] = useState(false);
  const [isRegisterShown, setIsRegisterShown] = useState(false);

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
              onClick={() => {
              }}
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
