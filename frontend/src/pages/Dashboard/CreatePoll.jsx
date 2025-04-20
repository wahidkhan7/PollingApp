import React, { useContext, useState } from 'react'
import {UserContext} from "../../context/UserContext"
import { POLL_TYPE } from '../../utils/data';
import OptionsInput from '../../components/input/OptionsInput';
import useUserAuth from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layout/DashboardLayout';
import OptionImageSelector from '../../components/input/OptionImageSelector';

const CreatePoll = () => {
  useUserAuth();
  const {user} = useContext(UserContext);
  const [pollData , setPollData] = useState({
    question: "",
    type:"",
    options:[],
    imageOptions: [],
    error:"",
    });

    const handleValueChange = (key,value)=>{
      setPollData((prev)=>({
        ...prev,
        [key]:value,
      }));
    }

    const handleCreatePoll = async ()=>{}
  return (
    <DashboardLayout activeMenu='Create Poll'>
      <div className='bg-gray-100/80 my-5 p-5 rounded-lg mx-auto'>
        <h2 className='text-lg text-black font-medium'>Create Poll</h2>

        <div className='mt-3'>
          <label className='text-xs font-medium text-slate-600'>QUESTION</label>

          <textarea
            placeholder="what's in your mind"
            className='w-full text-[13px] text-black outline-none bg-slate-200/80 p-2 rounded-md mt-2'
            rows={4}
            value={pollData.question}
            onChange={({target})=>{
              handleValueChange("question",target.value)
            }}/>
        </div>

        <div className='mt-3'>
          <label className='text-xs font-medium text-slate-600'>POLL TYPE</label>

          <div className='flex gap-4 flex-wrap mt-3'>{POLL_TYPE.map((item)=>(
            <div
              key={item.value}
              className={`option-chip ${
                pollData.type === item.value
                ? "text-white bg-primary border-primary"
                : "border-sky-100"
              }`}
              onClick={()=>{
                handleValueChange("type",item.value);
              }}
            >
              {item.label}
            </div>
          ))}
          </div>
        </div>
        {pollData.type === 'single-choice' && (
          <div className='mt-5'>
            <label className='text-xs font-medium text-slate-600'>
              OPTIONS
            </label>
            <div className='mt-3'>
              <OptionsInput
              optionList = {pollData.options}
              setOptionList={(value)=>{
                handleValueChange("options",value);
              }}
              />
            </div>
          </div>
        )}
        {pollData.type === 'image-based' && 
         <div className='mt-5'>
            <label className='text-xs font-medium text-slate-600'>
              IMAGE OPTIONS
            </label>

            <div className='mt-3'>
              <OptionImageSelector
              imageList = {pollData.imageOptions}
              setImageList={(value)=>{
              handleValueChange("imageOptions",value);
              }}
              />
            </div>
          </div>
        }

        {pollData.error && (
          <p className='text-xs font-medium text-red-500 mt-5'>
            {pollData.error}
          </p>
        )}

        <button className='btn-primary py-2 mt-6' onClick={handleCreatePoll}>
          CREATE
        </button>

      </div>
    </DashboardLayout>  
  );
};

export default CreatePoll