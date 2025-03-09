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
import InputColor from "react-input-color";

import { signUpUser, updateUser, deleteUser } from "@/root/redux/users/Users";
import { set } from "mongoose";
import { createANewProduct, deleteProducts, updateProducts } from "@/root/redux/products/Products";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "90%",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
  zIndex: 1
};
const styleData = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: '80%',
  overflow: 'auto',
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
  zIndex: 1
};

export default function AdminProductTable({ datas }) {
  const [open, setOpen] = useState(false);
  const [openData, setOpenData] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenData = () => setOpenData(true);
  const handleCloseData = () => setOpenData(false);
  const dispatch = useDispatch();
  const router = useRouter();

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
  const [ID,setID] = useState("")

  const registerHandler = async () => {
    const res = await dispatch(
      updateProducts({
        userID:ID,
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
    if (res.payload.status === 200) {
      toast.success(
        <div className='font-BYekan text-sm'>
          محصول با موفقیت بروز شد...{" "}
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
      field: "name",
      headerName: "نام محصول",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong className='font-BYekanBold text-white'>{"نام محصول "}</strong>
      ),
      renderCell: (params) => (
        <p className='flex justify-center font-BYekan'>{params.row.name}</p>
      )
    },
    {
      field: "price",
      headerName: "قیمت",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => (
        <div className='flex justify-start font-BYekan'>{params.row.price}</div>
      ),

      renderHeader: (params) => (
        <strong className='font-BYekanBold text-white'>{"قیمت"}</strong>
      )
    },
    {
      field: "suitableFor",
      headerName: "جنسیت",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => (
        <div className='flex justify-start font-BYekan'>
          {digitsEnToFa(params.row.suitableFor) === "MAN" ? "مردانه" : digitsEnToFa(params.row.suitableFor) === "WOMAN"? "زنانه": "بچگانه"}
        </div>
      ),

      renderHeader: (params) => (
        <strong className='font-BYekanBold text-white'>{"جنسیت  "}</strong>
      )
    },
    {
      field: "count",
      headerName: "تعداد",
      width: 100,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong className='font-BYekanBold text-white'>{" تعداد "}</strong>
      ),
      renderCell: (params) => (
        <p className='flex justify-center font-BYekan'>{params.row.count}</p>
      )
    },
    {
      field: "wholeScore",
      headerName: "امتیاز",
      width: 100,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong className='font-BYekanBold text-white'>{" امتیاز "}</strong>
      ),
      renderCell: (params) => (
        <p className='flex justify-center font-BYekan'>
          {params.row.wholeScore}
        </p>
      )
    },
    {
      field: "shoesModel",
      headerName: "مدل",
      width: 100,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong className='font-BYekanBold text-white'>{" مدل "}</strong>
      ),
      renderCell: (params) => (
        <p className='flex justify-center font-BYekan'>
          {params.row.shoesmodel}
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
              console.log(params.row)
              setName(params.row.name)
              setPrice(params.row.price)
              setSuitableFor(params.row.suitableFor)
              setCount(params.row.count)
              setWholeScore(params.row.wholeScore)
              setShoesModel(params.row.shoesmodel)
              setShortDesc(params.row.shortDesc)
              setLongDesc(params.row.longDesc)
              setImg(params.row.img)
              setTags(params.row.tags)
              setSizes(params.row.sizes)
              setColors(params.row.colors)
              handleOpenData();
            }}
          />
          <BsTrash
            className='text-red-500 text-2xl'
            onClick={() => {
              Swal.fire({
                title: "آیا از حذف این محصول مطمئن هستید؟",
                showDenyButton: true,
                showConfirmButton: true,
                confirmButtonColor: "green",
                denyButtonColor: "red",
                confirmButtonText: "بلی",
                denyButtonText: "خیر"
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const res = await dispatch(
                    deleteProducts({ productID: params.row._id })
                  );
                  console.log(res);
                  if (res.payload.status === 200) {
                    router.refresh();
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
              console.log(params.row)
              setID(params.row._id)
              setName(params.row.name)
              setPrice(params.row.price)
              setSuitableFor(params.row.suitableFor)
              setCount(params.row.count)
              setWholeScore(params.row.wholeScore)
              setShoesModel(params.row.shoesmodel)
              setShortDesc(params.row.shortDesc)
              setLongDesc(params.row.longDesc)
              setImg(params.row.img)
              setTags(params.row.tags)
              setSizes(params.row.sizes)
              setColors(params.row.colors)
              handleOpen();
              
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
      name: item.name,
      price: item.price,
      suitableFor: item.suitableFor,
      count: item.count,
      wholeScore: item.wholeScore,
      shoesmodel: item.shoesmodel,
      _id: item._id,
      shortDesc: item.shortDesc,
      longDesc: item.longDesc,
      tags: item.tags,
      sizes: item.size,
      colors: item.color,
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
    <div className='w-full h-full px-2 font-BYekan'>

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

      <Modal open={openData} onClose={handleCloseData}>
        <Box sx={styleData} className='flex flex-col gap-y-2'>
          <h2 className='font-BYekanBold'>اطلاعات کاربر </h2>
          <div className='w-full text-start flex flex-col gap-4 p-2 bg-sky-50'>
            <p>نام محصول : {name}</p>
            <p>قیمت : {price}</p>
            <p>مخصوص : {suitableFor}</p>
            <p>تعداد : {count}</p>
            <p>امتیاز : {wholeScore}</p>
            <p>مدل : {shoesModel}</p>
            <p>توضیحات : {shortDesc}</p>
            <p>توضیحات کامل : {longDesc}</p>
            <p>تگ ها : <div className="flex gap-2 w-full">{tags.map(item => `${item} - `)}</div></p>
            <p>اندازه ها :  <div className="flex gap-2">{sizes.map(item => `${item} - `)}</div></p>
            <p>رنگ ها : <div className="flex gap-2 w-full"> {colors.map(item => <div className="w-5 h-5" style={{ backgroundColor: `${item.toString(16)}` }}></div>)}</div></p>

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
                    <div className='flex gap-2 z-50'>
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
              بروزرسانی محصول
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
