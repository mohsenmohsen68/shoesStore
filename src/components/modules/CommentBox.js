"use client"
import Image from "next/image";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Rating } from "react-simple-star-rating";
import * as shamsi from 'shamsi-date-converter';


export default function CommentBox({ commentBody, commentNumber }) {
    console.log("comment body ...", commentBody)
    return (
        <>
            {commentBody.length > 0 ? (
                <div className=''>
                    <div className='flex w-full font-BYekan pl-2 '>
                        <div className='w-2/12 flex justify-center items-center'>
                            <div className='w-10 h-10 rounded-full overflow-hidden relative flex justify-center items-center'>
                                {commentBody[0].user?.img ? (<Image src={commentBody[0].user.img} fill={true} alt="profile image" />) : (<FaCircleUser className="text-4xl" />)}
                            </div>
                        </div>
                        <div className='w-10/12 flex flex-col'>
                            <div className='flex justify-between items-center pl-4 '>
                                <div className=' mx-2 text-sm'>{commentBody[0].user.userName ? commentBody[0].user.userName : "ناشناس"}</div>
                                <div className="font-BYekan">
                                    (<Rating size={10} transition={true} rtl SVGclassName="flex" SVGstyle={{ 'display': 'inline' }} initialValue={commentBody[0].score} readonly />)
                                </div>
                                <div>{(shamsi.gregorianToJalali(commentBody[0].date)).toLocaleString('fa-ir', { useGrouping: false })}</div>

                            </div>
                            <div>
                                {commentBody[0].commentBody}
                            </div>
                        </div>
                    </div>
                    <hr className='w-full my-2' />
                </div>
            ) : (
                <div className="flex justify-center items-center font-BYekan">
                    برای این محصول هیچ نظری ثبت نشده است
                </div>
            )}

        </>
    );
}
