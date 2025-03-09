"use client";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import toast, { Toaster } from "react-hot-toast";
import { BiShow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { PiTextboxDuotone } from "react-icons/pi";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { signUpUser, updateUser, deleteUser } from "@/root/redux/users/Users";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
    zIndex: 1,
};
const styleData = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
    zIndex: 1,
};

export default function TicketTable({ datas }) {
    const [open, setOpen] = useState(false);
    const [openData, setOpenData] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenData = () => setOpenData(true);
    const handleCloseData = () => setOpenData(false);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [ID, setID] = useState("");
    const router = useRouter();

    const columns = [
        {
            field: "index",
            headerName: "شماره",
            width: 30,
            headerClassName: "super-app-theme--header",
            headerAlign: "center",
            renderHeader: (params) => (
                <strong className='font-BYekanBold text-white '>{"شماره "}</strong>
            ),
            renderCell: (params) => (
                <p className='flex justify-center font-BYekan'>{params.row.index}</p>
            )
        },
        {
            field: "userName",
            headerName: "نام کاربری",
            width: 150,
            headerClassName: "super-app-theme--header",
            headerAlign: "center",
            renderHeader: (params) => (
                <strong className='font-BYekanBold text-white'>{"نام کاربری "}</strong>
            ),
            renderCell: (params) => (
                <p className='flex justify-center font-BYekan'>{params.row.userName}</p>
            )
        },
        {
            field: "email",
            headerName: "ایمیل",
            width: 250,
            headerClassName: "super-app-theme--header",
            headerAlign: "center",
            renderCell: (params) => (
                <div className='flex justify-start font-BYekan'>{params.row.email}</div>
            ),

            renderHeader: (params) => (
                <strong className='font-BYekanBold text-white'>{"ایمیل"}</strong>
            )
        },
        {
            field: "phoneNumber",
            headerName: "شماره تماس",
            width: 150,
            headerClassName: "super-app-theme--header",
            headerAlign: "center",
            renderCell: (params) => (
                <div className='flex justify-start font-BYekan'>
                    {digitsEnToFa(params.row.phoneNumber)}
                </div>
            ),

            renderHeader: (params) => (
                <strong className='font-BYekanBold text-white'>{"شماره تماس  "}</strong>
            )
        },
        {
            field: "role",
            headerName: "نقش",
            width: 100,
            headerClassName: "super-app-theme--header",
            headerAlign: "center",
            renderHeader: (params) => (
                <strong className='font-BYekanBold text-white'>{" نقش "}</strong>
            ),
            renderCell: (params) => (
                <p className='flex justify-center font-BYekan'>
                    {params.row.role === "ADMIN" ? "کاربر ادمین" : "کاربر عادی"}
                </p>
            )
        },
        {
            field: "view",
            headerName: "عملیات",
            width: 185,
            headerClassName: "super-app-theme--header",
            headerAlign: "center",
            renderCell: (params) => (
                <div className='flex w-full h-full justify-center items-center font-BYekan '>
                    <BiShow
                        className='text-blue-500 text-2xl'
                        onClick={() => {
                            setUserName(params.row.userName);
                            setPhoneNumber(params.row.phoneNumber);
                            setRole(params.row.role);
                            setEmail(params.row.email);
                            handleOpenData();
                        }}
                    />
                    <BsTrash
                        className='text-red-500 text-2xl'
                        onClick={() => {
                            Swal.fire({
                                title: "آیا از حذف این کاربر مطمئن هستید؟",
                                showDenyButton: true,
                                showConfirmButton: true,
                                confirmButtonColor: "green",
                                denyButtonColor: "red",
                                confirmButtonText: "بلی",
                                denyButtonText: "خیر"
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                    const res = await dispatch(
                                        deleteUser({ userID: params.row._id })
                                    );
                                    console.log(res);
                                    if (res.payload.status === 200) {
                                        router.refresh()
                                        return toast.success(
                                            <div className='font-BYekan text-sm'>
                                                کاربر با موفقیت حذف شد .
                                            </div>,
                                            {
                                                duration: 3000,
                                                position: "top-center"
                                            }
                                        );
                                    } else {
                                        return toast.error(
                                            <div className='font-BYekan text-sm'>
                                                در سمت سرور مشکلی رخ داده است.
                                            </div>,
                                            {
                                                duration: 3000,
                                                position: "top-center"
                                            }
                                        );
                                    }
                                } else if (result.isDenied) {
                                }
                            });
                        }}
                    />

                    <PiTextboxDuotone
                        className='text-green-500 text-2xl'
                        onClick={() => {
                            setUserName(params.row.userName);
                            setPhoneNumber(params.row.phoneNumber);
                            setRole(params.row.role);
                            setEmail(params.row.email);
                            setID(params.row._id)
                            setShowPassword(false);
                            handleOpen();
                            const res = dispatch(updateUser({ userID: params.row._id, userName, phoneNumber, email, role }))
                            console.log("res : ", res)
                        }}
                    />
                </div>
            ),

            renderHeader: (params) => (
                <strong className='font-BYekanBold text-white'>{"عملیات"}</strong>
            )
        }
    ];
    let rows = [];
    datas.map((item, index) =>
        rows.push({
            index: (index + 1).toLocaleString("fa-IR"),
            userName: item.userName,
            phoneNumber: item.phoneNumber,
            email: item.email,
            role: item.role,
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
            <div className='w-full flex justify-center mb-2 '>
                <button
                    className='bg-green-400 hover:bg-green-500 p-2 hover:text-white'
                    onClick={() => {
                        setUserName("");
                        setPhoneNumber("");
                        setRole("");
                        setEmail("");
                        setPassword("");
                        setPassword2("");
                        setShowPassword(true);
                        handleOpen();
                    }}
                >
                    افزودن کاربر جدید
                </button>
            </div>
            <Box
                sx={{
                    height: "476px",
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

            <Modal open={open} onClose={handleClose} >
                <Box sx={style} className='flex flex-col gap-y-2'>
                    <h2 className='font-BYekanBold'>
                        {showPassword ? "ثبت کاربر جدید" : "ویرایش کاربر"}
                    </h2>
                    <div className='w-full text-center flex lg:flex-col gap-2 mx-auto'>
                        <input
                            type='text'
                            value={userName}
                            disabled={!showPassword}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder='نام کاربری'
                            className='w-11/12'
                        />
                        <input
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='ایمیل'
                            className='w-11/12'
                        />
                    </div>
                    <div className='w-full text-center flex lg:flex-col gap-2 mx-auto'>
                        <input
                            type='text'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder='شماره تماس'
                            className='w-11/12'
                            disabled={!showPassword}
                        />
                        <select
                            value={role ? role : -1}
                            onChange={(e) => setRole(e.target.value)}
                            className='w-11/12'
                        >
                            <option value='-1' className='font-BYekan'>
                                نقش کاربر را انتخاب کنید
                            </option>
                            <option value='USER' className='font-BYekan'>
                                کاربر عادی
                            </option>
                            <option value='ADMIN' className='font-BYekan'>
                                کاربر ادمین
                            </option>
                        </select>
                    </div>
                    {showPassword && (
                        <div className='w-full text-center flex lg:flex-col gap-2 mx-auto'>
                            <input
                                type='text'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='رمز عبور'
                                className='w-11/12'
                            />
                            <input
                                type='text'
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                placeholder='تکرار رمز عبور'
                                className='w-11/12'
                            />
                        </div>
                    )}

                    <div className='w-full flex justify-end'>
                        <button
                            className='border py-2 px-2 shadow-md bg-red-500 hover:bg-red-400'
                            onClick={() => {
                                setShowPassword(false);
                                handleClose();
                            }}
                        >
                            انصراف
                        </button>
                        <button
                            className='border py-2 px-2 shadow-md bg-green-500 hover:bg-green-400 ml-2'
                            onClick={async () => {
                                if (showPassword && password !== password2) {
                                    return toast.error(
                                        <div className='font-BYekan text-sm'>
                                            رمز  های  عبور  باید  یکسان  باشند ...
                                        </div>,
                                        {
                                            duration: 3000,
                                            position: "top-center"
                                        }
                                    );
                                }
                                console.log('show pass', showPassword, userName, email, password,password2, phoneNumber, role)
                                let res = {}
                                if (showPassword) {
                                    res = await dispatch(signUpUser({ userName, email, password, phoneNumber, role, createdByAdmin: true }))
                                } else {
                                    res = await dispatch(updateUser({ userID: ID, userName, email, phoneNumber, role }))
                                }

                                console.log("result : ", res)
                                if (res.payload.status === 400) {
                                    return toast.error(
                                        <div className='font-BYekan text-sm'>
                                            پست الکترونیکی، شماره تماس یا رمز عبور نامعتبر هستند...
                                        </div>,
                                        {
                                            duration: 3000,
                                            position: "top-center"
                                        }
                                    );
                                } else if (res.payload.status === 422) {
                                    return toast.error(
                                        <div className='font-BYekan text-sm'>
                                            کاربری با این شماره تماس یا پست الکترونیکی قبلا ثبت نام کرده است.
                                        </div>,
                                        {
                                            duration: 3000,
                                            position: "top-center"
                                        }
                                    );
                                } else if (res.payload.status === 201) {
                                    setUserName("");
                                    setPhoneNumber("");
                                    setRole("");
                                    setEmail("");
                                    setPassword("");
                                    setPassword2("");
                                    setShowPassword(false);
                                    handleClose()
                                    router.refresh()
                                    return toast.success(
                                        <div className='font-BYekan text-sm'>
                                            کاربر با موفقیت اضافه شد.
                                        </div>,
                                        {
                                            duration: 3000,
                                            position: "top-center"
                                        }
                                    );

                                } else if (res.payload.status === 200) {
                                    setUserName("");
                                    setPhoneNumber("");
                                    setRole("");
                                    setEmail("");
                                    setPassword("");
                                    setPassword2("");
                                    setShowPassword(false);
                                    handleClose()
                                    router.refresh()
                                    return toast.success(
                                        <div className='font-BYekan text-sm'>
                                            کاربر با موفقیت به روز شد.
                                        </div>,
                                        {
                                            duration: 3000,
                                            position: "top-center"
                                        }
                                    );

                                } else {
                                    if (res.payload.status === 400) {
                                        return toast.error(
                                            <div className='font-BYekan text-sm'>
                                                متاسفانه مشکلی در سمت سرور به وجود آمده است.
                                            </div>,
                                            {
                                                duration: 3000,
                                                position: "top-center"
                                            }
                                        );
                                    }
                                }
                            }}
                        >
                            {showPassword ? "ایجاد کاربر جدید" : "بروز رسانی کاربر"}
                        </button>
                    </div>
                </Box>
            </Modal>
            <Modal open={openData} onClose={handleCloseData}>
                <Box sx={styleData} className='flex flex-col gap-y-2'>
                    <h2 className='font-BYekanBold'>اطلاعات کاربر </h2>
                    <div className='w-full text-start flex flex-col gap-4 p-2 bg-sky-200'>
                        <p>نام کاربری : {userName}</p>
                        <p>ایمیل : {email}</p>
                        <p>شماره تماس : {phoneNumber}</p>
                        <p>نقش : {role === "ADMIN" ? "کاربر ادمین" : "کاربر عادی"}</p>
                    </div>

                    <div className='w-full flex justify-end'>
                        <button
                            className='border py-2 px-2 shadow-md bg-red-500 hover:bg-red-400'
                            onClick={handleCloseData}
                        >
                            بستن
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
        </div >
    );
}
