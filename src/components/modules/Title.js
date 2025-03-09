"use client"
import React from "react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Title({ title, action, link }) {
  const router = useRouter()
  return (
    <div className="container flex items-center justify-evenly px-14 mt-10">
      <h1 className="text-3xl md:text-2xl sm:text-xl"> {title} </h1>
      <Button outline gradientDuoTone="purpleToPink" onClick={()=>router.push(`${link}`)}>
        {action}
      </Button>
    </div>
  );
}
