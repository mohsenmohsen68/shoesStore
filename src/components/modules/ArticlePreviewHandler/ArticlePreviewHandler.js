import React from 'react'
import Parser from 'html-react-parser'



export default function ArticlePreviewHandler(props) {
  console.log('article body preview : ', props)
  return (
      <div className='w-full border rounded-md font-dana p-4 ck-content '>
        {Parser(props.data)}
      </div>
     
  )
}
