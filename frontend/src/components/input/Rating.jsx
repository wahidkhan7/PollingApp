import React, { useState } from 'react';
import { HiStar } from 'react-icons/hi';

const Rating = ({
  maxStars = 5,
  value = 0,
  onChange,
  readOnly = false
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const [clicked, setClicked] = useState(false);

  const handleClick = (rating) => {
    if (!readOnly && onChange) {
      onChange(rating);
      setClicked(true); // Show submit button
    }
  };

  const handleMouseEnter = (rating) => {
    if (!readOnly) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(0);
    }
  };

  return (
<<<<<<< HEAD
    <div
      className={`flex gap-2 ${readOnly ? "cursor-default" : "cursor-pointer"}`}
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={`star-${index}`}
            className={`text-3xl transition-colors ${
              starValue <= (hoverValue || value)
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          >
            <HiStar />
          </span>
        );
      })}
=======
    <div className="flex items-center justify-between w-full">
      <div
        className={`flex gap-2 ${readOnly ? "cursor-default" : "cursor-pointer"}`}
        onMouseLeave={handleMouseLeave}
      >
        {[...Array(maxStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              className={`text-3xl transition-colors ${
                starValue <= (hoverValue || value)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={()=>handleMouseLeave()}
            >
              <HiStar />
            </span>
          );
        })}
      </div>

      {clicked && !readOnly && (
        <button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Submit
        </button>
      )}
>>>>>>> rahul
    </div>
  );
};

export default Rating;
