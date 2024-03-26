'use client'
import React,{useState} from "react";

function explanation() {
  const [explain, setExplain] = useState(true);
  const [moreInfo, setMoreInfo] = useState(false);
  const [comments, setComments] = useState(false);
  return (
    <div>
      <div className="flex justify-center gap-2 ">
        <button className="border-2 border-gray-700 hover:bg-gray-700 hover:text-white rounded-full px-2"
          onClick={() => {
            setExplain(true);
            setComments(false);
            setMoreInfo(false);
          }}
        >
          توضیحات
        </button>
        <button className="border-2 border-gray-700 hover:bg-gray-700 hover:text-white rounded-full px-2"
          onClick={() => {
            setExplain(false);
            setComments(false);
            setMoreInfo(true);
          }}
        >
          اطلاعات بیشتر
        </button>
        <button className="border-2 border-gray-700 hover:bg-gray-700 hover:text-white rounded-full px-2"
          onClick={() => {
            setExplain(false);
            setComments(true);
            setMoreInfo(false);
          }}
        >
          نظرات کاربران
        </button>
      </div>

      {explain && (<div>explain</div>)}
      {moreInfo && (<div>moreInfo</div>)}
      {comments && (<div>comments</div>)}

    </div>
  );
}

export default explanation;
