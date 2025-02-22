import BreadCrumb from '@/components/modules/BreadCrumb'
import ShoppingCart from '@/components/templates/shoppingCart/ShoppingCart'
import React from 'react'

export default function page() {
  return (
    <div className='mt-28 mb-4'>
      <BreadCrumb titles={"سبد خرید"} />
      <ShoppingCart />
    </div>
  )
}
