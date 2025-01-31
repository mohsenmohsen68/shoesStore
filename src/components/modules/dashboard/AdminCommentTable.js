"use client";
import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Rating } from "react-simple-star-rating";
import { Box } from "@mui/material";
import { CiCircleCheck } from "react-icons/ci";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import Swal from "sweetalert2"
import { BsTrash } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { deleteComments, updateComments } from "@/root/redux/comments/Comments";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function DataTable({ datas }) {
    console.log("commentsss : ",datas)
    const dispatch = useDispatch()
    const router =useRouter()
         const columns = [
        {
            field: "index",
            headerName: "شماره",
            width: 30,
            headerClassName: 'super-app-theme--header',
            renderHeader: (params) => (
                <strong className="font-BYekanBold text-white ">
                    {'شماره '}

                </strong>
            ),
            renderCell: (params) => (
                <p className="flex justify-center font-BYekan">
                    {params.row.index}
                </p>),

        },
        {
            field: "commentBody",
            headerName: "متن پیام",
            width: 400,
            headerClassName: 'super-app-theme--header',
            renderHeader: (params) => (
                <strong className="font-BYekanBold text-white">
                    {'متن پیام '}

                </strong>
            ),
            renderCell: (params) => (
                <p className="flex justify-center font-BYekan">
                    {params.row.commentBody}
                </p>),
        },
        {
            field: "status",
            headerName: "وضعیت پیام",
            width: 100,
            headerClassName: 'super-app-theme--header',
            renderHeader: (params) => (
                <strong className="font-BYekanBold text-white">
                    {' وضعیت پیام '}

                </strong>
            ),
            renderCell: (params) => (
                <div className="flex w-full h-full justify-center items-center font-BYekan ">
                    {params.row.status === "notAccepted" ? (<MdDoNotDisturbAlt className="text-red-500 text-2xl" />) : (<CiCircleCheck className="text-green-500 text-2xl" />)}
                </div>
            ),
        },
        {
            field: "commentDate",
            headerName: "تاریخ ثبت",
            width: 120,
            headerClassName: 'super-app-theme--header',
            renderHeader: (params) => (
                <strong className="font-BYekanBold text-white">
                    {' تاریخ ثبت '}

                </strong>
            ),
            renderCell: (params) => (
                <p className="flex justify-center font-BYekan">
                    {params.row.commentDate}
                </p>
            ),
        },
        {
            field: "score",
            headerName: "امتیاز",
            width: 120,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <div className="flex justify-start text-white">
                    <Rating readonly size={16} rtl SVGstyle={{ "display": "inline", }} initialValue={params.row.score} />
                </div>
            ),

            renderHeader: (params) => (
                <strong className="font-BYekanBold text-white">
                    {'امتیاز  '}

                </strong>
            ),
        },
        {
            field: "name",
            headerName: "نام محصول",
            width: 170,
            headerClassName: 'super-app-theme--header',
            renderHeader: (params) => (
                <strong className="font-BYekanBold text-white">
                    {' نام محصول '}

                </strong>
            ),
            renderCell: (params) => (
                <p className="flex justify-start font-BYekan">
                    {params.row.name}
                </p>
            ),
        },
        {
            field: "view",
            headerName: "عملیات",
            width: 115,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <div className="flex w-full h-full justify-center items-center font-BYekan ">
                {console.log("parrramas : ", params)}
                    <BiShow className="text-blue-500 text-2xl" onClick={() => {
                        Swal.fire({
                            title: "متن پیام",
                            text: params.row.commentBody,
                            icon: "success",
                            confirmButtonColor: "#0BDA51",
                            confirmButtonText: "فهمیدم",
                            closeOnConfirm: true
                        });
                    }} />
                    <BsTrash className="text-red-500 text-2xl" onClick={() => {
                        Swal.fire({
                            title: "آیا از حذف این پیام مطمئن هستید؟",
                            showDenyButton: true,
                            showConfirmButton: true,
                            confirmButtonColor: "green",
                            denyButtonColor: "red",
                            confirmButtonText: "بلی",
                            denyButtonText: 'خیر',
                        }).then(async(result) => {
                            if (result.isConfirmed) {
                                const result = await dispatch(deleteComments({ commentID: params.row.commentID, productID:params.row.productID }));
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

                    }} />
                    <IoMdCheckmarkCircleOutline className="text-green-500 text-2xl" onClick={() => {
                        Swal.fire({
                            title: "متن پیام",
                            text: params.row.commentBody,
                            icon: "success",
                            confirmButtonColor: "#0BDA51",
                            confirmButtonText: "تایید پیام",
                            closeOnConfirm: true,
                            showDenyButton: true,
                            denyButtonColor: "red",
                            denyButtonText: 'عدم تایید',
                        }).then(async(result) => {
                            if (result.isConfirmed) {
                                const result = await dispatch(updateComments({ commentID: params.row.commentID, status:"isAccepted" }));
                                console.log(result);
                                if (result.payload.status === 200) {
                                    toast.success(
                                        <div className='font-BYekan text-sm'>
                                            پیام تایید شد ...
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
                                const result = await dispatch(updateComments({ commentID: params.row.commentID, status:"notAccepted" }));
                                console.log(result);
                                if (result.payload.status === 200) {
                                    toast.success(
                                        <div className='font-BYekan text-sm'>
                                            پیام تایید نشد ...
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
                            }
                        });;
                    }}/>
                </div>
            ),

            renderHeader: (params) => (
                <strong className="font-BYekanBold text-white">
                    {'عملیات'}

                </strong>
            ),
        },
    ];
    let rows = [];
    datas.map((item, index) =>
        rows.push({
            index: (index + 1).toLocaleString('fa-IR'),
            commentBody: item.comment,
            score: item.score,
            commentID : item.commentID,
            commentDate: item.date,
            name: item.product.name,
            productID : item.product._id,
            status: item.status,
        })
    );

    function generateRandom() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
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
                    height: '550px',
                    width: '100%',
                    '& .super-app-theme--header': {
                        backgroundColor: '#2d55ff',
                    },
                }}
            >
                <DataGrid getRowId={(row) => generateRandom()} rows={rows} columns={columns} pagination autoPageSize />
            </Box>
        </div>
    );
}
