import { createANewProduct } from '@/root/redux/products/Products';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import AdminProductTable from './AdminProductTable';

export default function AdminProducts({ products, user }) {
    console.log("products : ", products, "user : ", user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [suitableFor, setSuitableFor] = useState("");
    const [count, setCount] = useState("");
    const [wholeScore, setWholeScore] = useState(5);
    const [shoesmodel, setShoesmodel] = useState("");

    const registerHandler = async () => {
        if (
            name === "" ||
            price === "" ||
            suitableFor === "" ||
            count === "" ||
            wholeScore === "" ||
            shoesmodel === ""
        ) {
            toast.error(
                <div className='font-BYekan text-sm'>
                    نام، قیمت، تعداد یا مدل کفش نمیتواند خالی باشد ...
                </div>,
                {
                    duration: 4000,
                    position: "top-center"
                }
            );
        } else {
            const result = await dispatch(
                createANewProduct({ userName, phoneNumber, email, role, password })
            );
            console.log(result);
            if (result.payload.status === 201) {
                toast.success(
                    <div className='font-BYekan text-sm'>محصول جدید اضافه شد ...</div>,
                    {
                        duration: 4000,
                        position: "top-center"
                    }
                );
            } else {
                toast.error(
                    <div className='font-BYekan text-sm'>
                        مشکلی در ثبت کاربر جدید رخ داده است ...
                    </div>,
                    {
                        duration: 4000,
                        position: "top-center"
                    }
                );
            }

            setName("")
            setPrice("")
            setSuitableFor("")
            setCount("")
            setWholeScore(0)
            setShoesmodel("")
        }
    };

    return (
        <div className=' flex justify-center w-full h-full '>
            <div className='flex w-full h-full flex-col items-center gap-y-1'>
                <div className='w-full '>
                    <AdminProductTable datas={JSON.parse(JSON.stringify(products))} />
                </div>
            </div>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style} className='flex flex-col gap-y-2'>
                    <h2 className='font-BYekanBold'>ثبت کاربر جدید</h2>
                    <div className='w-full text-center lg:flex lg:flex-col lg:gap-2'>
                        <input
                            type='text'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder='نام کاربری'
                            className='w-full'
                        />
                        <input
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='ایمیل'
                            className='w-full'
                        />
                    </div>
                    <div className='w-full text-center lg:flex lg:flex-col lg:gap-2'>
                        <input
                            type='text'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder='شماره تماس'
                            className='w-full'
                        />
                        <select value={-1} onChange={e => setRole(e.target.value)}>
                            <option value='-1'>نقش کاربر را انتخاب کنید</option>
                            <option value='USER'>
                                کاربر عادی
                            </option>
                            <option value='ADMIN'>
                                کاربر ادمین
                            </option>
                        </select>
                    </div>
                    <div className='w-full text-center lg:flex lg:flex-col lg:gap-2'>
                        <input
                            type='text'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='رمز عبور'
                            className='w-full'
                        />
                        <input
                            type='text'
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            placeholder='تکرار رمز عبور'
                            className='w-full'
                        />
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
                            ایجاد کاربر جدید
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
