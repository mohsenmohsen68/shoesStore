import React from 'react'



const Paragraph = ({title, children}) => {
  return (
    <div className='mt-4 mb-4'>
      <div className='font-BYekanBold mb-4 mt-4  '>{title}</div>
      <div className='font-BYekan mb-4 mt-4 text-justify p-4 leading-7 '>{children}</div>
    </div>
  )
}

export default Paragraph
