"use client";
import React, { useEffect, useState } from "react";
import StarRate from "./StarRate";
import { useDispatch } from "react-redux";
import { createANewComment } from "@/root/redux/comments/Comments";
import toast, { Toaster } from "react-hot-toast";

export default function CreateComment({ productID, userID }) {
  const [rating, setRating] = useState(5);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
console.log("useruseruser : ", userID)
  const handleRating = (rate) => {
    setRating(rate);
    console.log(rate);
  };

  useEffect(() => {
    if (userID) {
      fetch("/api/auth/me", {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify({ _id: userID })
      })
        .then((res) => res.json())
        .then((data) => {
          setUserName(data.data.userName);
          setEmail(data.data.email);
        });
    }
  }, []);

  const addCommentHandler = async () => {
    const commentBody = {
      commentBody: body,
      score: rating,
      product: productID,
      user: userID,
    };
    if (body.trim() === "") {
      return toast.error(
        <div className='font-BYekan text-sm'>
          نظر نمیتواند خالی باشد ...
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    } else {
      const res = await dispatch(createANewComment(commentBody));
      if (res.payload.status === 201) {
        setBody("");
        return toast.success(
          <div className='font-BYekan text-sm'>
            نظر شما با موفقیت ثبت شد ...
          </div>,
          {
            duration: 4000,
            position: "top-center"
          }
        );
      } else {
        return toast.error(
          <div className='font-BYekan text-sm'>
            در ثبت نظر شما مشکلی به وجود آمده است ...
          </div>,
          {
            duration: 4000,
            position: "top-center"
          }
        );
      }
    }
  };

  return (
    <div className='flex flex-col font-BYekan w-1/2 md:w-full h-fit pr-8 '>
      <div className='text-lg'>دیدگاه خود را بنویسید ...</div>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد، قسمت های مورد نیاز با * نشانه گذاری شده
        اند
      </p>
      <StarRate rate={5} handleRating={handleRating} />
      <div className='flex'>
        <p>دیدگاه شما</p>
        <span className='text-red-400'>*</span>
      </div>
      <textarea
        name='comment'
        id='comment'
        cols='10'
        rows='10'
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className='flex'>
        <p>نام</p>
        <span className='text-red-400'>*</span>
      </div>
      <input
        type='text'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        disabled
      />
      <div className='flex'>
        <p>پست الکترونیکی</p>
      </div>
      <input
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled
      />
      <div className='flex items-center mt-2'>
        <input type='checkbox' id='check' />
        <label htmlFor='check' className='mx-2'>
          {" "}
          برای ذخیره نام و ایمیل تان در ثبت دیدگاه های دیگر، تیک بزنید
        </label>
      </div>
      <button
        disabled={userID ? false : true}
        onClick={addCommentHandler}
        className='p-2 text-white font-BYekan text-lg mt-2 w-40 bg-green-500 rounded-xl hover:bg-green-400'
      >
        ثبت نظر{" "}
      </button>

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
