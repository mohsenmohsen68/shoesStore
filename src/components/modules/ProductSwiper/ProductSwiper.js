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

function ProductSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff"
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={Styles.mySwiper2}
      >
        <SwiperSlide>
          <Image src="/img/banner1.jpg" fill />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/img/banner2.jpg" fill />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/img/banner3.jpg" fill />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/img/banner4.jpg"
            fill
          />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={Styles.mySwiper}
      >
        <SwiperSlide>
          <Image src="/img/banner1.jpg"  fill />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/img/banner2.jpg"  fill/>
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/img/banner3.jpg"  fill/>
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/img/banner4.jpg"  fill/>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default ProductSwiper;
