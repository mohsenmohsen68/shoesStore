"use client";
import React from "react";
import StarRatingComponent from "react-star-rating-component"
import { FaStar } from "react-icons/fa";

function StarRate({ rate }) {
  return (
    <StarRatingComponent
      name="rate2"
      editing={false}
      renderStarIcon={() => (
        <span>
          <FaStar /> 
        </span>
      )}
      starCount={5}
      value={rate}
    />
  );
}

export default StarRate;
