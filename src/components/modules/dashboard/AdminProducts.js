"use client"
import { createANewProduct } from '@/root/redux/products/Products';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import AdminProductTable from './AdminProductTable';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import InputColor from "react-input-color";

import toast, { Toaster } from "react-hot-toast";

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
  height: "80%",
  overflow: "auto"
};

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
  const [shoesModel, setShoesModel] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [img, setImg] = useState([]);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState("");
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState("");

  const registerHandler = async () => {
    const res = await dispatch(
      createANewProduct({
        name,
        price,
        suitableFor,
        count,
        wholeScore,
        shoesmodel: shoesModel,
        shortDesc,
        longDesc,
        img,
        tags,
        size: sizes,
        color: colors
      })
    );
    console.log("result : ", res);
    if (res.payload.status === 201) {
      toast.success(
        <div className='font-BYekan text-sm'>
          محصول با موفقیت اضافه شد...{" "}
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
      handleClose()
      router.refresh()
    } else {
      toast.error(
        <div className='font-BYekan text-sm'>
          تمام فیلد ها را باید پر کنید...{" "}
        </div>,
        {
          duration: 4000,
          position: "top-center"
        }
      );
    }
  }


  return (
    <div className=' flex justify-center w-full h-full '>
      <div className='flex w-full h-full flex-col items-center '>
        <div className='w-full flex justify-center my-1  '>
          <button
            className='bg-green-400 hover:bg-green-500 p-2 hover:text-white'
            onClick={() => {
              setName("");
              setPrice("");
              setSuitableFor("");
              setCount("");
              setWholeScore("");
              setShoesModel("");
              handleOpen();
            }}
          >
            افزودن کالای جدید
          </button>
        </div>
        <div className='w-full '>
          <AdminProductTable datas={JSON.parse(JSON.stringify(products))} />
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className='flex flex-col gap-y-2'>
          <h2 className='font-BYekanBold'>ثبت محصول جدید</h2>
          <div className='w-full text-center flex lg:flex-col gap-2 mx-auto'>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='نام محصول'
              className='w-full'
            />

            <input
              type='text'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='قیمت'
              className='w-full'
            />
          </div>
          <div className='w-full text-center flex lg:flex-col gap-2 mx-auto'>
            <input
              type='text'
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder='موجودی'
              className='w-full'
            />
            <select
              value={suitableFor}
              onChange={(e) => setSuitableFor(e.target.value)}
              className='w-full'
            >
              <option value='-1' className='font-BYekan'>
                نوع کفش را انتخاب کنید
              </option>
              <option value='KIDS' className='font-BYekan'>
                بچگانه{" "}
              </option>
              <option value='MAN' className='font-BYekan'>
                مردانه
              </option>
              <option value='WOMAN' className='font-BYekan'>
                زنانه{" "}
              </option>
            </select>
          </div>

          <div className='w-full text-center flex lg:flex-col gap-2 mx-auto'>
            <input
              type='text'
              value={wholeScore}
              onChange={(e) => setWholeScore(e.target.value)}
              placeholder='امتیاز'
              className='w-full'
            />
            <input
              type='text'
              value={shoesModel}
              onChange={(e) => setShoesModel(e.target.value)}
              placeholder='مدل کفش'
              className='w-full'
            />
          </div>
          <div className='w-full text-center flex lg:flex-col gap-2 mx-auto'>
            <div className='flex w-full border border-black'>
              <div className='flex flex-col w-full'>
                <div className='flex w-full'>
                  <div className='w-5/6 flex items-center'>
                    <div className='flex gap-2'>
                      <InputColor
                        initialValue='#5e72e4'
                        onChange={setColor}
                        placement='right'
                      />
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          marginTop: 0,
                          backgroundColor: color.hex
                        }}
                      />
                    </div>
                  </div>
                  <div className='flex flex-col w-1/6 '>
                    <button
                      className='bg-green-400'
                      onClick={() => {
                        const isThereColor = colors.some(
                          (item) => item === color.hex
                        );
                        console.log(isThereColor);
                        if (!isThereColor) {
                          return setColors((prev) => [...prev, color.hex]);
                        }
                        return;
                      }}
                    >
                      +
                    </button>
                    <button
                      className='bg-red-400'
                      onClick={() => {
                        const isThereColor = colors.some(
                          (item) => item === color.hex
                        );
                        console.log(isThereColor);
                        if (isThereColor) {
                          return setColors((prev) =>
                            prev.filter((item) => item !== color.hex)
                          );
                        }
                        return;
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className='flex justify-start w-full'>
                  {colors.map((item) => (
                    <div className='flex gap-2 w-full bg-red-50'>
                      <div
                        className={`w-5 h-5`}
                        style={{ backgroundColor: `${item.toString(16)}` }}
                      >
                        {" "}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <input
              type='file'
              multiple
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder='عکس'
              className='w-full'
            />
          </div>
          <div className='w-full text-center flex justify-center items-center  lg:flex-col gap-2 mx-auto'>
            <div className='flex w-full border border-black'>
              <div className='flex flex-col w-full'>
                <div className='flex w-full'>
                  <div className='w-5/6 flex items-center'>
                    <input
                      type='text'
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      placeholder='تگ'
                      className='w-full border-none  focus:outline-none focus:ring-0'
                    />
                  </div>
                  <div className='flex flex-col w-1/6 '>
                    <button
                      className='bg-green-400'
                      onClick={() => {
                        const isThereTag = tags.some((item) => item === tag);
                        console.log(isThereTag);
                        if (!isThereTag) {
                          setTag("");
                          return setTags((prev) => [...prev, tag]);
                        }
                        setTag("");
                        return;
                      }}
                    >
                      +
                    </button>
                    {console.log("tags :", tags)}
                    <button
                      className='bg-red-400'
                      onClick={() => {
                        const isThereTag = tags.some((item) => item === tag);
                        console.log(isThereTag);
                        if (isThereTag) {
                          setTag("");
                          return setTags((prev) =>
                            prev.filter((item) => item !== tag)
                          );
                        }
                        setTag("");
                        return;
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className='flex justify-start w-full'>
                  {tags.map((item) => (
                    <span>{item}- </span>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex w-full border border-black'>
              <div className='flex flex-col w-full'>
                <div className='flex w-full'>
                  <div className='w-5/6 flex items-center'>
                    <input
                      type='text'
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      placeholder='انداره کفش'
                      className='w-full border-none  focus:outline-none focus:ring-0'
                    />
                  </div>
                  <div className='flex flex-col w-1/6 '>
                    <button
                      className='bg-green-400'
                      onClick={() => {
                        const isThereTag = sizes.some((item) => item === size);
                        console.log(isThereTag);
                        if (!isThereTag) {
                          setSize("");
                          return setSizes((prev) => [...prev, size]);
                        }
                        setSize("");
                        return;
                      }}
                    >
                      +
                    </button>
                    {console.log("tags :", tags)}
                    {console.log("shoes :", sizes)}
                    <button
                      className='bg-red-400'
                      onClick={() => {
                        const isThereTag = sizes.some((item) => item === size);
                        console.log(isThereTag);
                        if (isThereTag) {
                          setSize("");
                          return setSizes((prev) =>
                            prev.filter((item) => item !== size)
                          );
                        }
                        setTag("");
                        return;
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className='flex justify-start w-full'>
                  {sizes.map((item) => (
                    <span>{item}- </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className='w-full text-center flex justify-center items-center  lg:flex-col gap-2 mx-auto'>
            <input
              type='text'
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder='توضیح کوتاه'
              className='w-full'
            />
          </div>

          <textarea
            height={8}
            value={longDesc}
            onChange={(e) => setLongDesc(e.target.value)}
            placeholder='توضیحات'
            className='w-full'
          />

          <div className='w-full flex justify-end'>
            <button
              className='border py-2 px-2 shadow-md bg-red-500 hover:bg-red-400'
              onClick={() => {
                handleClose();
              }}
            >
              انصراف
            </button>
            <button
              className='border py-2 px-2 shadow-md bg-green-500 hover:bg-green-400 ml-2'
              onClick={registerHandler}
            >
              ایجاد محصول
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
