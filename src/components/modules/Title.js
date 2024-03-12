import React from "react";
import { Button } from "flowbite-react";

export default function Title({ title, action }) {
  return (
    <div className="container flex items-center justify-evenly px-14 mt-10">
      <h1 className="text-3xl md:text-2xl sm:text-xl"> {title} </h1>
      <Button outline gradientDuoTone="purpleToPink">
        {action}
      </Button>
    </div>
  );
}
