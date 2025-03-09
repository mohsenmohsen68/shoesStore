"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { createANewArticle } from "@/root/redux/articles/Articles";
const { uuid } = require('uuidv4');
import Swal from 'sweetalert2'
import Image from "next/image";

const ArticleEditor = dynamic(
  () => import("@/components/modules/ArticleEditor/ArticleEditor"),
  { ssr: false }
);

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

export default function AddArticle() {
  const dispatch = useDispatch()
  const [articleData, setArticleData] = useState("");
  const [uploaded,setUploaded] = useState(false)
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [fileName,setFileName] = useState('');

  const handleAddArticle = (data) => {
    setArticleData(data);
  };

  useEffect(()=>{
    setUploaded(true);
  },[uploaded])
  
  const handleImageUploadButton = async (selectedF) => {
      try {
        console.log('fff',selectedF)
         let data = new FormData();
         data.append("image", selectedF);
         fetch("http://localhost:3002/api/articles/titleImage", {
           method: "POST",
           body: data
         })
           .then((res) => res.json())
           .then((d) => {
             setUploaded(true);
             setFileName(d.filename)
             console.log("ggg", d.filename);
             console.log("ggg2", selectedImage);
             console.log("ggg4", selectedFile);
             console.log("gggff", d);
           });
      } catch (err) {
        console.log('errrr',err);
      }
  };

  return (
    <div className='p-7'>
      <Formik
        initialValues={{
          title: "",
          category: "",
          keyWords: ""
        }}
        validate={(values) => {
          const errors = {
            title: "",
            category: "",
            keyWords: ""
          };
          //firstname validation
          if (!values.title) {
            errors.title = "وارد کردن عنوان مقاله الزامی است.";
          } else if (values.title.length <= 2) {
            errors.title = " عنوان مقاله باید حداقل سه حرف داشته باشد .";
          }
          //lastname validation
          if (!values.keyWords) {
            errors.keyWords = "وارد کردن کلمات کلیدی الزامی است.";
          } else if (values.keyWords.length <= 2) {
            errors.keyWords = "کلمات کلیدی باید حداقل سه حرف داشته باشد .";
          }
          //username validation

          //grade validation
          if (values.category == "") {
            errors.category = "انتخاب دسته بندی الزامی است.";
          }
          //role validation

          if (
            errors.category === "" &&
            errors.keyWords === "" &&
            errors.title === ""
          ) {
            return {};
          } else {
            return errors;
          }
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("mmmmm", articleData);
          const author = "mohsen";
          const d = new Date()
          let year = d.getFullYear();
          let month = d.getMonth();
          let day = d.getDay();
          const pdate = new Date(year,month,day)
          const publishedDate = new Intl.DateTimeFormat('fa-IR').format(pdate);
          const articleID = uuid()
          const body = {
            articleID,
            title: values.title,
            category: values.category,
            keyWords: values.keyWords,
            author,
            publishedDate,
            img:'mkmkmk',
            articleBody:articleData
          };
           console.log(body)
          const result = await dispatch(createANewArticle(body))
          console.log('result of adding article :',result.payload.status)
          if(result.payload.status === 201){
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
            dispatch( selectOption("") ) 
          }else{
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

        }
      }
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit} className='text-slate-800'>
            <div className='flex flex-col mt-2 '>
              <input
                type='text'
                name='title'
                placeholder='عنوان مقاله ...'
                className={`bg-slate-200 p-2  outline-none `}
                onChange={handleChange}
                value={values.title}
                onBlur={handleBlur}
              />
              <div className='text-xs text-red-500'>
                {errors.title && touched.title && errors.title}
              </div>
            </div>

            <div className='flex flex-col mt-2 '>
              <input
                type='text'
                name='keyWords'
                placeholder='کلمات کلیدی ...'
                className={`bg-slate-200 p-2  outline-none `}
                onChange={handleChange}
                value={values.keyWords}
                onBlur={handleBlur}
              />
              <div className='text-xs text-red-500'>
                {errors.keyWords && touched.keyWords && errors.keyWords}
              </div>
            </div>

            <div className=' grid grid-cols-1 md:grid-cols-2'>
              <div className='flex flex-col mt-2'>
                <select
                  name='category'
                  id='category'
                  className={`bg-slate-200 p-2 font-moraba  outline-none `}
                  onChange={handleChange}
                  value={values.category}
                  onBlur={handleBlur}
                >
                  <option value='-1'>خوشه علمی مربوطه ؟</option>
                  <option value='ریاضیات'>ریاضیات</option>
                  <option value='زیست شناسی'>زیست شناسی</option>
                  <option value='زمین شناسی'>زمین شناسی</option>
                  <option value='شیمی'>شیمی</option>
                  <option value='فیزیک'>فیزیک</option>
                  <option value='برق و الکترونیک'>برق و الکترونیک</option>
                  <option value='رباتیک'>رباتیک</option>
                  <option value='برنامه نویسی'>برنامه نویسی</option>
                  <option value='هوش مصنوعی'>هوش مصنوعی</option>
                  <option value='نجوم'>نجوم</option>
                  <option value='انرژی های نوین'>انرژی های نوین</option>
                  <option value='هوافضا'>هوافضا</option>
                </select>
                <div className='text-xs text-red-500'>
                  {errors.category && touched.category && errors.category}
                </div>
              </div>

              <div className='flex justify-center items-center mt-2 '>
                <label>
                  <input
                    type='file'
                    hidden
                    onChange={({ target }) => {
                      if (target.files) {
                        const file = target.files[0];
                        setSelectedImage(URL.createObjectURL(file));
                        setSelectedFile(file);
                        console.log("file : ", selectedFile);
                        console.log("Image : ", selectedImage);
                        handleImageUploadButton(file)
                      }else{
                      }
                    }}
                  />
                  <div>
                    {selectedImage ? (
                      <Image
                        src={selectedImage}
                        width={70}
                        height={70}
                        alt='selected image'
                      />
                    ) : (
                      <div className='p-1 bg-green-500 border-dashed font-moraba border-2 border-gray-200'>
                        انتخاب تصویر دوره
                      </div>
                    )}
                  </div>
                </label>
              </div>

            </div>

            <div className='w-full'>
              <ArticleEditor onHandleAddArticle={handleAddArticle} imgPath={'/api/articles/image'} initData={'<p>  من ویرایشگر مقاله های شما هستم ... </p>'}/>
            </div>

            <div className='w-full'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='rounded-md bg-green-600 hover:bg-green-400 p-2 mt-2 text-xl font-moraba w-full '
              >
                ثبت مقاله
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
