"use client";
import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisiblity = () => {
        console.log(window.scrollY)
      window.scrollY > 200 ? setIsVisible(true) : setIsVisible(false);
    };
    window.addEventListener('scroll',toggleVisiblity)

    return ()=>window.removeEventListener('scroll',toggleVisiblity)
  }, []);


  const scrollItToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  return (
    <div
      onClick={scrollItToTop}
      className={`fixed bottom-4 left-4 rounded-full z-50 p-2 shadow-yellow-800 shadow-inner hover:shadow-2xl hover:border border-black ${isVisible ? 'visible' : 'hidden'}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 15.75 7.5-7.5 7.5 7.5"
        />
      </svg>
    </div>
  );
}
