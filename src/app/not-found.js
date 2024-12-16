import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


function Notfound() {
   // const user =await authUser()
   return (
      <div className='flex flex-col items-center justify-center bg-slate-300 h-dvh w-full'>
         {/* <NavBar isLogedIn={user ? true : false}/> */}
         <div>
            <p className='font-BYekan text-2xl mt-28 ' >صفحه ای که دنبالشی وجود نداره ...</p>
         </div>
         <div className='flex justify-center items-center h-72  my-10 '>
            <Image src='/img/four.jpg' width={300} height={300} alt='404 image' className='rounded-r-full ml-1' />
            <Image src='/img/zeroo.jpg' width={300} height={300} alt='404 image' className='ml-1' />
            <Image src='/img/four.jpg' width={300} height={300} alt='404 image' className='rounded-l-full' />
         </div>
         <div>
            <Link href='/' className='p-2 font-BYekan hover:bg-orange-400 rounded-full transition-all border-orange-500 hover:text-white border-2 '>بازگشت به صفحه اصلی</Link>
         </div>

      </div>
   )
}

export default Notfound
