import React from 'react'
import { useState } from 'react';

export default function SMS() {
    const [otpCode, setOtpCode] = useState("")

    const signupWithPassword = ()=>{

    }

  return (
    <div className="absolute flex flex-col px-2 py-4 justify-evenly  w-80 h-[420px] bg-white shadow-xl shadow-black top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <RTL>
            <TextField

              variant="outlined"
              fullWidth
              id="outlined-basic"
              label="کد تایید"
              value={userName}
              onChange={(event) => setOtpCode(event.target.value)}
            />
          </RTL>

         
         
         
         

         
         
            <Button
              onClick={signupWithPassword}
              variant="contained"
              className="font-BYekan text-base bg-sky-500 text-white hover:bg-green-500"
            >
              ثبت نام
            </Button>
        

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
  )
}
