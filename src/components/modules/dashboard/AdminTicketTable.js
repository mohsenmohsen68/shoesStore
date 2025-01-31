"use client";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import toast, { Toaster } from "react-hot-toast";
import * as shamsi from "shamsi-date-converter";
import { BiShow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { deleteTicket, updateTicket } from "@/root/redux/request/Request";
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


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

export default function TicketTable({ datas }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [requestBody, setRequestBody] = useState("");
    const [responseBody, setResponseBody] = useState("");
    const [ID, setID] = useState("");
    const router = useRouter()

    const columns = [
        {
            field: "index",
            headerName: "شماره",
            width: 30,
            headerClassName: "super-app-theme--header",
            renderHeader: (params) => (
                <strong className='font-BYekanBold text-white '>{"شماره "}</strong>
            ),
            renderCell: (params) => (
                <p className='flex justify-center font-BYekan'>{params.row.index}</p>
            )
        },
        {
            field: "title",
            headerName: "عنوان پیام",
            width: 150,
            headerClassName: "super-app-theme--header",
            renderHeader: (params) => (
                <strong className='font-BYekanBold text-white'>{"عنوان پیام "}</strong>
            ),
            renderCell: (params) => (
                <p className='flex justify-center font-BYekan'>{params.row.title}</p>
            )
        },
        {
            field: "requestBody",
            headerName: "متن پیام",
            width: 320,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <div className='flex justify-start font-BYekan'>
                    {params.row.requestBody}
                </div>
            ),

            renderHeader: (params) => (
                <strong className='font-BYekanBold '>{"متن پیام  "}</strong>
            )
        },
        {
            field: "responseBody",
            headerName: "پاسخ پیام",
            width: 350,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <div className='flex justify-start font-BYekan'>
                    {params.row.responseBody}
                </div>
            ),

            renderHeader: (params) => (
                <strong className='font-BYekanBold text-white'>{"پاسخ پیام  "}</strong>
            )
        },
        {
            field: "commentDate",
            headerName: "تاریخ ثبت",
            width: 120,
            headerClassName: "super-app-theme--header",
            renderHeader: (params) => (
                <strong className='font-BYekanBold text-white'>{" تاریخ ثبت "}</strong>
            ),
            renderCell: (params) => (
                <p className='flex justify-center font-BYekan'>
                    {params.row.ticketDate}
                </p>
            )
        },
        {
            field: "view",
            headerName: "مشاهده",
            width: 85,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <div className='flex w-full h-full justify-center items-center font-BYekan '>
                    <BiShow
                        className='text-orange-500 text-2xl'
                        onClick={() => {
                            console.log("params :", params);
                            setTitle(params.row.title);
                            setRequestBody(params.row.requestBody);
                            setResponseBody(params.row.responseBody);
                            setID(params.row._id);
                            handleOpen();
                        }}
                    />
                    <BsTrash
                        className='text-red-500 text-2xl'
                        onClick={() => {
                            Swal.fire({
                                title: "آیا از حذف این تیکت مطمئن هستید؟",
                                showDenyButton: true,
                                showConfirmButton: true,
                                confirmButtonColor: "green",
                                denyButtonColor: "red",
                                confirmButtonText: "بلی",
                                denyButtonText: 'خیر',
                            }).then(async(result) => {
                                if (result.isConfirmed) {
                                    const result = await dispatch(deleteTicket({ id: params.row._id }));
                                    console.log(result);
                                    if (result.payload.status === 200) {
                                        toast.success(
                                            <div className='font-BYekan text-sm'>
                                                تیکت حذف شد ...
                                            </div>,
                                            {
                                                duration: 4000,
                                                position: "top-center"
                                            }
                                        );
                                        router.refresh();
                                    } else {
                                        toast.error(
                                            <div className='font-BYekan text-sm'>
                                                مشکلی رخ داده است ...
                                            </div>,
                                            {
                                                duration: 4000,
                                                position: "top-center"
                                            }
                                        );
                                    }
                                } else if (result.isDenied) {

                                }
                            });

                        }}
                    />
                </div>
            ),

            renderHeader: (params) => (
                <strong className='font-BYekanBold text-white'>{"مشاهده  "}</strong>
            )
        }
    ];
    let rows = [];
    datas.map((item, index) =>
        rows.push({
            index: (index + 1).toLocaleString("fa-IR"),
            title: item.title,
            requestBody: item.requestBody,
            responseBody: item.response,
            ticketDate: shamsi
                .gregorianToJalali(item.date)
                .toLocaleString("fa-ir", { useGrouping: false }),
            _id: item._id
        })
    );

    function generateRandom() {
        var length = 8,
            charset =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    return (
        <div className='w-full h-full p-2 font-BYekan'>
            <Box
                sx={{
                    height: "450px",
                    width: "100%",
                    "& .super-app-theme--header": {
                        backgroundColor: "#2d55ff"
                    }
                }}
            >
                <DataGrid
                    getRowId={(row) => generateRandom()}
                    rows={rows}
                    columns={columns}
                    pagination
                    autoPageSize
                />
            </Box>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style} className='flex flex-col gap-y-2'>
                    <h2 className='font-BYekanBold'>ثبت تیکت جدید</h2>
                    <div className='w-full text-center lg:flex lg:flex-col lg:gap-2'>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='موضوع تیکت'
                            className='w-full'
                        />
                    </div>

                    <div>
                        <textarea
                            cols='30'
                            rows='5'
                            value={requestBody}
                            onChange={(e) => setRequestBody(e.target.value)}
                            placeholder='متن درخواست ...'
                            className='w-full'
                        ></textarea>
                    </div>
                    <div>
                        <textarea
                            cols='30'
                            rows='5'
                            value={responseBody}
                            onChange={(e) => setResponseBody(e.target.value)}
                            placeholder='متن پاسخ ...'
                            className='w-full'
                        ></textarea>
                    </div>
                    <div className='w-full flex justify-between items-center'>
                        <div>
                            <button
                                className='border py-2 px-2 shadow-md bg-red-500 hover:bg-red-400'
                                onClick={handleClose}
                            >
                                انصراف
                            </button>
                            <button
                                className='border py-2 px-2 shadow-md bg-green-500 hover:bg-green-400 ml-2'
                                onClick={async () => {
                                    console.log("resbody : ", responseBody);
                                    const result = await dispatch(
                                        updateTicket({
                                            title,
                                            requestBody,
                                            responseBody,
                                            isChecked: false,
                                            id: ID
                                        })
                                    );
                                    console.log(result);
                                    if (result.payload.status === 200) {
                                        toast.success(
                                            <div className='font-BYekan text-sm'>
                                                تغییرات با موفقیت ثبت گردید...
                                            </div>,
                                            {
                                                duration: 4000,
                                                position: "top-center"
                                            }
                                        );
                                        handleClose();
                                    } else {
                                        toast.error(
                                            <div className='font-BYekan text-sm'>
                                                مشکلی رخ داده است ...
                                            </div>,
                                            {
                                                duration: 4000,
                                                position: "top-center"
                                            }
                                        );
                                    }
                                }}
                            >
                                ثبت
                            </button>
                        </div>
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
