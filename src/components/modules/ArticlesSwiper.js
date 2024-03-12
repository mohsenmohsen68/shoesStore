"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import ArticleBox from "./ArticleBox";

export default function ArticlesSwiper() {
  return (
    <div className="z-0 mt-14">
      <p className="block text-2xl text-center my-4 md:text-xl sm:text-base">
        <span className="text-red-600 text-3xl">❤</span>دانستنی های جذاب در مورد
        کفش<span className="text-red-600 text-3xl">❤</span>
      </p>
      <Swiper
        navigation={true}
        rewind={true}
        slidesPerView={4}
        breakpoints={{
            0: {
                slidesPerView: 1,
              },
            400: {
                slidesPerView: 1,
              },
            576: {
              slidesPerView: 2,
            },
            768:{
              slidesPerView:3
            },
            992:{
              slidesPerView:4
            },
          }}
        spaceBetween={20}
        autoplay={{ delay: 6000 }}
        loop={true}
        modules={[Navigation, Autoplay]}
        className="w-11/12 h-72 "
      >
        <SwiperSlide className="flex text-base bg-slate-300 items-center justify-center w-1/4 gap-2 h-full">
          <ArticleBox image={'/img/banner2.jpg'} title={"انتخاب کفش مناسب"} writer={"علی علوی"} />
        </SwiperSlide>
        <SwiperSlide className="flex text-base bg-slate-300 items-center justify-center w-1/4 gap-2 h-full">
        <ArticleBox image={'/img/banner2.jpg'} title={"انتخاب کفش مناسب"} writer={"علی علوی"} />
        </SwiperSlide>
        <SwiperSlide className="flex text-base bg-slate-300 items-center justify-center w-1/4 gap-2 h-full">
        <ArticleBox image={'/img/banner2.jpg'} title={"انتخاب کفش مناسب"} writer={"علی علوی"} />
        </SwiperSlide>
        <SwiperSlide className="flex text-base bg-slate-300 items-center justify-center w-1/4 gap-2 h-full">
        <ArticleBox image={'/img/banner2.jpg'} title={"انتخاب کفش مناسب"} writer={"علی علوی"} />
        </SwiperSlide>
        <SwiperSlide className="flex text-base bg-slate-300 items-center justify-center w-1/4 gap-2 h-full">
        <ArticleBox image={'/img/banner2.jpg'} title={"انتخاب کفش مناسب"} writer={"علی علوی"} />
        </SwiperSlide>
        <SwiperSlide className="flex text-base bg-slate-300 items-center justify-center w-1/4 gap-2 h-full">
        <ArticleBox image={'/img/banner2.jpg'} title={"انتخاب کفش مناسب"} writer={"علی علوی"} />
        </SwiperSlide>
        <SwiperSlide className="flex text-base bg-slate-300 items-center justify-center w-1/4 gap-2 h-full">
        <ArticleBox image={'/img/banner2.jpg'} title={"انتخاب کفش مناسب"} writer={"علی علوی"} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
