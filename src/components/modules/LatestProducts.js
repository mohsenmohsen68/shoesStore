import React from "react";
import ProductBox from "./ProductBox";

export default function LatestProducts() {
  return (
    <div className="grid grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center items-center gap-10 z-0 mx-10 my-10">
      <ProductBox />
      <ProductBox />
      <ProductBox />
      <ProductBox />
      <ProductBox />
      <ProductBox />
      <ProductBox />
      <ProductBox />
      <ProductBox />
      <ProductBox />
    </div>
  );
}
