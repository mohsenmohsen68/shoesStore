"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Styles from "./ProductSwiper.module.css";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

function ProductSwiper({ pictures }) {
  console.log("pictures : ", pictures)
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={Styles.mySwiper2}
      >
        {pictures.map(item => (
          <SwiperSlide>
            <Image src={item} fill />
          </SwiperSlide>
        ))}


      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`${Styles.mySwiper} mt-2 shadow-md`}
      >
        {pictures.map(item => (
          <SwiperSlide>
            <Image src={item} fill className="shadow-md"/>
          </SwiperSlide>
        ))}

      </Swiper>
    </>
  );
}

export default ProductSwiper;
