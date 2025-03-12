"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import ArticleBox from "./ArticleBox";

export default function ArticlesSwiper({articles}) {
  return (
    <div className="z-0 mt-14 mb-9">
      
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
        {articles.map(item=>(
        <SwiperSlide className=" text-base flex items-center justify-center gap-2">
          <ArticleBox article={JSON.parse(JSON.stringify(item))} />
        </SwiperSlide>
        ))}
        
      </Swiper>
    </div>
  );
}
