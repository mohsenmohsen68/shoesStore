// "use client"
import React from 'react'
import { Button } from "flowbite-react";
import Link from 'next/link';
import Image from 'next/image';

export default function ArticleBox({ article }) {
  return (
    <Link href={ `/articles/${article._id}`}>
      <div className='w-56 h-64 relative shadow-xl group overflow-hidden'>
        <Image src={article.img} fill className='w-full h-full group-hover:scale-125 group-hover:blur-sm transition-all duration-500' alt="article image" />
        <p className='absolute top-2 left-1/2 -translate-x-1/2 text-white text-lg w-full flex justify-center px-2'>{article.title}</p>
        <p className='absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-base w-full flex justify-center px-2'>تاریخ انتشار: {new Intl.DateTimeFormat("fa-IR").format(new Date(article.date))}</p>
        <Button
          outline
          pill
          gradientDuoTone="purpleToPink"
          className="absolute hidden top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:block "
          
        >مطالعۀ مقاله</Button>
      </div>
    </Link>
  )
}
