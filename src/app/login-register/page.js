import React from "react";
import Login from "@/components/templates/Login-Register/Login/Login";

export default function page() {
  return (
    <div className="relative w-full h-dvh  flex">
      <img src="/img/login.jpg" className="w-full h-full" alt="login image" />
      <div className="absolute w-1/2 left-0">
        <div className="relative  h-dvh bg-black opacity-50 ">
        </div>
          <Login />
      </div>
    </div>
  );
}
