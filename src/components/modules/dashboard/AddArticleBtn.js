"use client"
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import Swal from 'sweetalert2';
import ArticleEditor from '../ArticleEditor/ArticleEditor';
import { createANewArticle } from '@/root/redux/articles/Articles';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

function AddArticleBtn({userID}) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [showImage, setShowImage] = useState(false)
  const [img, setImg] = useState([])
  const [selectedImage, setSelectedImage] = useState("")
  const [fileName, setFileName] = useState("")
  const [articleData, setArticleData] = useState("")

  const handleAddArticle = (data) => {
    setArticleData(data);
  };

  const clickHandler = async() => {
    console.log("fileName : ", fileName);
    console.log("img : ", img)
    // if(!title.trim()){
    //   Toast.fire({
    //     toast: true,
    //     customClass: {
    //       title: "font-moraba",
    //       htmlContainer: "bg-slate-200 dark:bg-slate-700"
    //     },
    //     position: "bottom-end",
    //     title: " عنوان مقاله را وارد کنید ...",
    //     icon: "success"
    //   });
    // }
    if (img) {
      // const d = new Date();
      // let year = d.getFullYear();
      // let month = d.getMonth();
      // let day = d.getDay();
      // const pdate = new Date(year, month, day);
      const publishedDate = Date.now();
      const body = {
        title,
        date: publishedDate,
        img: `/uploads/articlesImg/${fileName} `,
        articleBody: articleData,
        user: userID,
      };
      console.log(" ----  bodddddddddy ---", body);
      const result =await dispatch(createANewArticle(body));
      console.log("result of adding article :", result);
      if (result.payload.status === 201) {
        Toast.fire({
          toast: true,
          customClass: {
            title: "font-moraba",
            htmlContainer: "bg-slate-200 dark:bg-slate-700"
          },
          position: "bottom-end",
          title: " مقاله با موفقیت ثبت گردید ...",
          icon: "success"
        });
        setOpen(false)
        setTitle("")
        setArticleData("")
        router.refresh()
      } else {
        Toast.fire({
          toast: true,
          customClass: {
            title: "font-moraba"
          },
          position: "bottom-end",
          title: " مشکلی در سمت سرور رخ داده است ...",
          icon: "error"
        });
      }
    } else {
      Toast.fire({
        toast: true,
        customClass: {
          title: "font-moraba"
        },
        position: "bottom-end",
        title: " یک عکس برای مقاله انتخاب کنید ...",
        icon: "error"
      });
    }
  }

  const uploadIMG = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log("img ...", img);
    formData.append("img", img);
    const res = await fetch("/api/articles/titleImage", {
      method: "PUT",
      body: formData
    });
    const body = await res.json();
    console.log("res :........ ", res, "body.....", body);
    if (res.status === 200) {
      // const res = await fetch('/api/course/titleImage/uploadimgapi', {
      //   method: 'PUT',
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({courseID:id , img: `http://localhost:3000/uploads/usersImage/${body.data}`}),
      // })
      // console.log("imgUpload res ..", res)
      setSelectedImage(`http://localhost:3000/uploads/articlesImg/${body.data}`)
      setShowImage(true)
      setFileName(body.data);
      Toast.fire({
        toast: true,
        customClass: {
          title: "font-moraba",
          htmlContainer: "bg-slate-200 dark:bg-slate-700"
        },
        position: "bottom-end",
        title: " عکس با موفقیت اضافه گردید ...",
        icon: "success"
      });
    } else {
      Toast.fire({
        toast: true,
        customClass: {
          title: "font-moraba",
          htmlContainer: "bg-slate-200 dark:bg-slate-700"
        },
        position: "bottom-end",
        title: " مشکلی رخ داده است ...",
        icon: "error"
      });
    }
  };

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <div className='flex justify-center w-full'>
        <button className='rounded-md bg-green-400 hover:bg-green-500 hover:text-white  p-2 mt-2 text-xl font-moraba w-fit' onClick={handleOpen}>افزودن مقاله جدید</button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>

            <h2 className="font-BYekanBold text-lg mb-2" >
              ایجاد مقاله جدید
            </h2>
            <input type="text" onChange={e => setTitle(e.target.value)} placeholder='عنوان مقاله' className='font-BYekan w-full' />
            <div className='flex justify-center items-center w-full mb-2'>
              <label
                htmlFor='myfile'
                className={`px-4 py-2 mt-2 border-green-700 border-2 bg-green-500 hover:bg-green-400 hover:text-white mx-4`}
              >
                {showImage ? "تغییر عکس" : " انتخاب عکس"}
              </label>
              <input
                type='file'
                id='myfile'
                accept='image/png, image/jpeg'
                className='hidden'
                onChange={(e) => setImg(e.target.files[0])}
              />
              {showImage && (
                <Image width={80} height={60} src={selectedImage} className="mt-2 ml-2" alt="عکس انتخاب شده ..." />
              )}

              <button onClick={uploadIMG}>بارگذاری تصویر</button>
            </div>
            <div className='w-full'>
              <ArticleEditor onHandleAddArticle={handleAddArticle}
                imgPath={"/api/articles/image"}
                initData={"<p>  من ویرایشگر مقاله های شما هستم ... </p>"} />

              <button
                className='rounded-md bg-green-600 hover:bg-green-400 p-2 mt-2 text-xl font-moraba w-full '
                onClick={clickHandler}
              >
                ثبت مقاله
              </button>
            </div>
          </div>
        </Box>
      </Modal>

    </>
  )
}

export default AddArticleBtn
