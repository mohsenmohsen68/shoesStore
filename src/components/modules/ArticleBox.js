import React from 'react'
import { Button } from "flowbite-react";

export default function ArticleBox({image, title, writer}) {
  return (
    <div className='w-full h-full relative shadow-xl group overflow-hidden'>
      <img src={image} className='w-full h-full group-hover:scale-125 group-hover:blur-sm transition-all duration-500' alt="article image" />
      <p className='absolute top-2 left-1/2 -translate-x-1/2 text-white text-base'>{title}</p>
      <p className='absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-base'>نویسنده: {writer}</p>
      <Button
          outline
          pill
          gradientDuoTone="purpleToPink"
          className="absolute hidden top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:block "
        >مطالعۀ مقاله</Button>
    </div>
  )
}
