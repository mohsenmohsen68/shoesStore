"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { createANewRequest } from "@/root/redux/request/Request";
import toast, { Toaster } from "react-hot-toast";
import TicketTable from "../TicketTable";

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

export default function Tickets({ tickets, user }) {
    console.log("ticketes : ", tickets, "user : ", user);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState("");
    const [requestBody, setRequestBody] = useState("");

    const registerHandler = async () => {
        console.log(title, requestBody);
        if (title === "" || requestBody === "") {
            toast.error(
                <div className='font-BYekan text-sm'>
                    عنوان یا متن تیکت نمی تواند خالی باشد ...
                </div>,
                {
                    duration: 4000,
                    position: "top-center"
                }
            );
        } else {
            const result = await dispatch(
                createANewRequest({ title, requestBody, user: user._id })
            );
            console.log(result);
            if (result.payload.status === 201) {
                toast.success(
                    <div className='font-BYekan text-sm'>
                        تیکت شما با موفقیت ثبت شد ...
                    </div>,
                    {
                        duration: 4000,
                        position: "top-center"
                    }
                );
            } else {
                toast.error(
                    <div className='font-BYekan text-sm'>
                        مشکلی در ثبت تیکت شما رخ داده است ...
                    </div>,
                    {
                        duration: 4000,
                        position: "top-center"
                    }
                );
            }
            setTitle("");
            setRequestBody("");
            handleClose();
        }
    };

    return (
        <div className=' flex justify-center w-full h-full '>
            <div className="flex w-full h-full flex-col items-center gap-y-1">
                <button
                    className='border mt-2 p-4 shadow-md bg-green-500 hover:bg-green-400 hover:text-white w-fit h-fit'
                    onClick={handleOpen}
                >
                    ثبت تیکت جدید
                </button>
                <div className='w-full '>
                    <TicketTable datas={JSON.parse(JSON.stringify(tickets))} />
                </div>
            </div>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style} className='flex flex-col gap-y-2'>
                    <h2 className='font-BYekanBold'>ثبت تیکت جدید</h2>
                    <div className='w-full text-center lg:flex lg:flex-col lg:gap-2'>
                        <input
                            type='text'
                            name=''
                            id=''
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='موضوع تیکت'
                            className='w-full'
                        />
                    </div>

                    <div>
                        <textarea
                            name=''
                            id=''
                            cols='30'
                            rows='10'
                            value={requestBody}
                            onChange={(e) => setRequestBody(e.target.value)}
                            placeholder='متن درخواست ...'
                            className='w-full'
                        ></textarea>
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
                            ثبت
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
