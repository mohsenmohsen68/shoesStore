"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

export default function MySwiper() {
  return (
    <div className="z-0">
      <Swiper
        navigation={true}
        rewind={true}
        autoplay={{ delay: 6000 }}
        loop={true}
        modules={[Navigation, Autoplay]}
        className="w-full h-dvh"
      >
        <SwiperSlide className="flex text-base bg-slate-300 items-center justify-center">
          <img
            src={"/img/banner1.jpg"}
            alt="slider image"
            className="block w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="flex text-base bg-slate-300 items-center justify-center">
          <img
            src="/img/banner2.jpg"
            alt="slider image"
            className="block w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="flex text-base bg-slate-300 items-center justify-center">
          <img
            src="/img/banner4.jpg"
            alt="slider image"
            className="block w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="flex text-base bg-slate-300 items-center justify-center">
          <img
            src="/img/banner3.jpg"
            alt="slider image"
            className="block w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
