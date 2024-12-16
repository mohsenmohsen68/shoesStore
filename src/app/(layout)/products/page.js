"use client"
import BreadCrumb from "@/components/modules/BreadCrumb";
import ProductBox from "@/components/modules/ProductBox";
import { getProductsFromServer } from "@/root/redux/products/Products";
import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";



export default function page() {
  const [products,setProducts] = useState([])
  const dispatch = useDispatch()
  
  const getProducts = async()=>{
    const data = await dispatch(getProductsFromServer('/api/product'))
    console.log(data)
    setProducts(data.payload.data)
  }
    useEffect(()=>{
      getProducts()
    },[])

  // const mydata = dataFetching()
  // console.log(mydata)


  return (
    <div className='mt-28'>
      <BreadCrumb titles={"محصولات"} />
      <div className="my-4 p-4 place-items-center grid gap-x-4 gap-y-8 grid-cols-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((item) => <ProductBox {...item} />)}

      </div>
    </div>
  );
}

