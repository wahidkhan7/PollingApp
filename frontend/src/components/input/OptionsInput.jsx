import React, { useState } from 'react'
import {HiOutlineTrash,HiMiniPlus} from 'react-icons/hi2'

const OptionsInput = ({optionList,setOptionList}) => {
    const [option,setOption] = useState("");

    //function to hangle adding an option
    const handleAddOption = ()=>{

    }
    //functino to handle deleting an option
    const handleDeleteOption = (index)=>{

    };
  return (
    <div>
        {optionList.map((item,index)=>(
            <div 
            key={item}
            className='flex justify-between bg-gray-200/80 px-4 py-2 rounded-md'>
            <p className='text-xs font-medium text-black'>{item}</p>

            <button
                onClick={()=>{
                    handleDeleteOption(index);
                }}
            >
                <HiOutlineTrash className='text-lg text-red-500'/>
            </button>
        </div>
        ))}
        {optionList.length < 4 && (
            <div className='flex items-center gap-5 mt-4'>
                <input
                    type='text'
                    placeholder='Enter Option'
                    value={{option}}
                    onChange={({target})=>setOption(target.value)}
                    className=''
                />

                <button
                    className='btn-small text-nowrap py-[6px]'
                    onClick={{handleAddOption}}
                >
                    <HiMiniPlus className='text-lg'/> Add Option
                </button>
            </div>
        )}
    </div>
  )
}

export default OptionsInput