"use client";
import React, { useState } from "react";
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
import { deleteArticles, updateArticles } from "@/root/redux/articles/Articles";
import ArticlePreviewHandler from "../ArticlePreviewHandler/ArticlePreviewHandler";



export default function DataTable({ datas }) {
    console.log(" datassss: ", datas)
    const [showPreview, setShowPreview] = useState(false)
    const [rowData, setRowData] = useState({})
    const dispatch = useDispatch()
    const router = useRouter()

    const onReturn = ()=>{
        setShowPreview(false)
        console.log("ccccccc")
    }
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
            field: "title",
            headerName: "عنوان مقاله",
            width: 400,
            headerClassName: 'super-app-theme--header',
            renderHeader: (params) => (
                <strong className="font-BYekanBold text-white">
                    {'عنوان مقاله'}
                </strong>
            ),
            renderCell: (params) => (
                <p className="flex justify-center font-BYekan">
                    {params.row.title}
                </p>),
        },
        {
            field: "status",
            headerName: "وضعیت مقاله",
            width: 100,
            headerClassName: 'super-app-theme--header',
            renderHeader: (params) => (
                <strong className="font-BYekanBold text-white">
                    {' وضعیت مقاله '}
                </strong>
            ),
            renderCell: (params) => (
                <div className="flex w-full h-full justify-center items-center font-BYekan ">
                    {params.row.status === "notAccepted" ? (<MdDoNotDisturbAlt className="text-red-500 text-2xl" />) : (<CiCircleCheck className="text-green-500 text-2xl" />)}
                </div>
            ),
        },
        {
            field: "articleDate",
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
                    {params.row.date}
                </p>
            )
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
                        setRowData(params.row.articleBody)
                        setShowPreview(true)
                    }} />
                    <BsTrash className="text-red-500 text-2xl" onClick={() => {
                        Swal.fire({
                            title: "آیا از حذف این مقاله مطمئن هستید؟",
                            showDenyButton: true,
                            showConfirmButton: true,
                            confirmButtonColor: "green",
                            denyButtonColor: "red",
                            confirmButtonText: "بلی",
                            denyButtonText: 'خیر',
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                console.log("paramsrow : ", params.row)
                                const result = await dispatch(deleteArticles(params.row.articleID ));
                                console.log(result);
                                if (result.payload.status === 200) {
                                    toast.success(
                                        <div className='font-BYekan text-sm'>
                                            مقاله حذف شد ...
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
                    {params.row.status === "notAccepted" && <IoMdCheckmarkCircleOutline className="text-green-500 text-2xl" onClick={() => {
                        Swal.fire({
                            title: "آیا از نمایش مقاله در سایت اطمینان دارید؟",
                            text: params.row.commentBody,
                            icon: "success",
                            confirmButtonColor: "#0BDA51",
                            confirmButtonText: "بلی",
                            closeOnConfirm: true,
                            showDenyButton: true,
                            denyButtonColor: "red",
                            denyButtonText: 'خیر',
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                const body = {
                                    _id:params.row.articleID,
                                    status: "Accepted",
                                    img: params.row.img, 
                                    articleBody: params.row.articleBody, 
                                    title: params.row.title, 
                                    date: params.row.date, 
                                }
                               const result = await dispatch(updateArticles(body))
                               if (result.payload.status === 200) {
                                toast.success(
                                    <div className='font-BYekan text-sm'>
                                        مقاله نشان داده خواهد شد ...
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
                    }} />}
                    {params.row.status === "Accepted" && <MdDoNotDisturbAlt className="text-red-500 text-2xl" onClick={() => {
                        Swal.fire({
                            title: "آیا از نشان ندادن مقاله در سایت اطمینان دارید؟",
                            text: params.row.commentBody,
                            icon: "success",
                            confirmButtonColor: "#0BDA51",
                            confirmButtonText: "بلی",
                            closeOnConfirm: true,
                            showDenyButton: true,
                            denyButtonColor: "red",
                            denyButtonText: 'خیر',
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                const body = {
                                    _id:params.row.articleID,
                                    status: "notAccepted",
                                    img: params.row.img, 
                                    articleBody: params.row.articleBody, 
                                    title: params.row.title, 
                                    date: params.row.date, 
                                }
                               const result = await dispatch(updateArticles(body))
                               if (result.payload.status === 200) {
                                toast.success(
                                    <div className='font-BYekan text-sm'>
                                        مقاله نشان داده نخواهد شد ...
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
                        });;
                    }} />}
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
            articleBody: item.articleBody,
            articleDate: item.date,
            title: item.title,
            status: item.status,
            articleID : item.articleID
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
            {!showPreview && <Box
                sx={{
                    height: '550px',
                    width: '100%',
                    '& .super-app-theme--header': {
                        backgroundColor: '#2d55ff',
                    },
                }}
            >
                <DataGrid getRowId={(row) => generateRandom()} rows={rows} columns={columns} pagination autoPageSize />
            </Box>}

            {showPreview && <div className="w-full">
                <ArticlePreviewHandler data={rowData} returnHandler={onReturn}/>
                <button className="w-full bg-green-400 p-2 hover:bg-green-300 hover:text-white" onClick={()=>setShowPreview(false)}>بازگشت</button>
                </div>}
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
