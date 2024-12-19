'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import Styles from './SimilarProducts.module.css';

// import required modules
import { Pagination } from 'swiper/modules';
import ProductBox from './ProductBox';

function SimillarProducts({products,filter}) {
  console.log('vv', products, filter)
  const filteredProducts = products.filter(item => item.suitableFor === filter )
  return (
    <>
    <Swiper
      slidesPerView={4}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className={Styles.mySwiper}
    >
{filteredProducts.map(item => <SwiperSlide><ProductBox product={JSON.parse(JSON.stringify(item))}/></SwiperSlide>)}
      
     
    </Swiper>
  </>
  )
}

export default SimillarProducts
