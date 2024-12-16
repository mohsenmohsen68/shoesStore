import React from "react";

import { Rating } from "react-simple-star-rating";

function StarRate({ rate, handleRating }) {
 const handleRate = (myrate)=>{
  handleRating(myrate)
 }
  return (
    <div className="flex "> <Rating size={20} transition={true} rtl SVGclassName="flex" SVGstyle={{ 'display': 'inline' }} showTooltip
    tooltipArray={['افتضاح', 'بد', 'قابل قبول', 'خوب', 'عالی']} tooltipDefaultText={"امتیاز شما"} onClick={(myrate) => handleRate(myrate)} initialValue={rate} /></div>

  );
}

export default StarRate;
