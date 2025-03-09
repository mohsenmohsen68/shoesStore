import React from "react";
import Image from "next/image";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudentLight } from "react-icons/pi";
import Rating from "@mui/material/Rating";


const Article = (props) => {
  return (
    <div className='flex flex-col w-60 h-96 bg-slate-200 dark:bg-slate-700 shadow-lg rounded-2xl overflow-hidden justify-self-center mx-auto'>
      <div className='relative h-2/5'>
        <Image
          src={props.img}
          width={0}
          height={0}
          sizes='100vw'
          className='w-full h-full'
          alt='course Image'
        />
      </div>
      <div className='px-2 pt-2'>
        <div className='font-dana-medium line-clamp-2'> {props.title} </div>
        <div className='font-dana text-xs line-clamp-3 pt- text-justify '>
          {" "}
          {props.desc}{" "}
        </div>
        <div className='flex justify-between mt-1 items-center'>
          <div className='flex font-dana text-sm'>
            <LiaChalkboardTeacherSolid className='text-2xl ml-2' />{" "}
            {props.writerName} {props.writerLastName}{" "}
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='font-dana text-sm'>امتیاز</div>
            <Rating
              name='read-only'
              className='text-sm'
              value={props.rate}
              readOnly
            />
          </div>
        </div>
        <hr className='w-full mt-2 border-green-500 dark:border-green-500' />
        <div className='flex justify-between mt-2 items-center'>
          <div className='flex font-dana text-sm items-center justify-center'>
            <PiStudentLight className='text-2xl ml-2' />{" "}
           <div>
           {props.views.toLocaleString("fa-ir")}
            </div>
          </div>
          <div className='flex flex-col items-center justify-center font-dana'>
            {props.datePublished.toLocaleDateString('fa-ir')}
          </div>
        </div>
        <div className="flex justify-center ">
          <div className={`bg-green-500 flex justify-center items-center w-9 hover:w-full h-9 rounded-full transition-all ease-in-out duration-200 before:content-["⊻"] hover:before:content-none font-dana-medium hover:after:content-["مطالعه مقاله ..."] `}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
