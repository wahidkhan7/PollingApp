import React from 'react'
import OptionInputTile from '../input/OptionInputTile'
import Rating from '../input/Rating'
import ImageOptionInputTile from '../input/ImageOptionInputTile'

const PollContent = ({
    type,
    options,
    selectedOptionIndex,
    onOptionSelect,
    rating,
    onRatingChange,
    userResponse,
    onResponseChange,
}) => {
  switch(type){
    case "single-choice":
    case "yes/no":
        return (
            <>
<<<<<<< HEAD
            {options.map((option, index) => (
            <OptionInputTile
                key={option.id || `option-${index}`}
                isSelected={selectedOptionIndex === index}
                label={option.optionText || ""}
                onSelect={() => onOptionSelect(index)}
            />
))}
=======
             {options.map((option, index) => (
                <OptionInputTile
                key={option.id || index}
                isSelected={selectedOptionIndex === index}
                label={option.optionText || ""}
                onSelect={() => onOptionSelect(index)}
                />
            ))}
>>>>>>> rahul
            </>
        )
    case "image-based":
        return (
            <div className='grid grid-cols-2 gap-4'>
                {options.map((option,index)=>(
                    <ImageOptionInputTile
                     key={option._id}
                     isSelected={selectedOptionIndex === index}
                     imgUrl = {option.optionText || ""}
                     onSelect = {()=>onOptionSelect(index)}
                    />
                ))}

            </div>
        )
    case "rating":
        return <Rating value={rating} onChnage={onRatingChange}/>;
<<<<<<< HEAD

    
=======
    case "open-ended":
        return(
            <div className='mt-3'>
                <textarea
                 placeholder='Your Response'
                 className='w-full text-[13px] text-black outline-none bg-slate-200/80 p-2 rounded-md mt-2' 
                 row={4}
                 value={userResponse}
                 onChange={(target)=> onResponseChange(target.value)}
                />
            </div>
        )
    default:
        return null;
>>>>>>> rahul
  }
}

export default PollContent