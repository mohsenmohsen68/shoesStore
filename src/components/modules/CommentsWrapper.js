//server component
import React from 'react'
import CommentBox from './CommentBox'
import connectToDB from "@/root/configs/db";
import commentModel from "@/root/models/Comment";

export default function CommentsWrapper({productComments}) {
    console.log("hhhhh",productComments)
    return (
        <div className='w-1/2 px-9 h-full overflow-y-auto scrollbar-thin font-BYekan scrollbar-thumb-blue-600 scrollbar-thumb-rounded'>
            <div className='text-lg mb-2'>{(productComments.length).toLocaleString("fa-ir")} نظر برای این محصول ثبت شده است </div>
            {productComments.map(async(item) =>  {
            console.log("comments ... ", item)
            connectToDB();
            const comment = await commentModel.find({_id:item }).populate('user', "userName");
            console.log("sss", comment)
            return <CommentBox key={item} commentNumber={productComments.length} commentBody={JSON.parse(JSON.stringify(comment))}/>
        })
        }
            
        
        </div>
    )
}
