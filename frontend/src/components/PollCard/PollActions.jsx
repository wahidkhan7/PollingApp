import React from 'react'
import { FaBookmark,FaRegBookmark } from 'react-icons/fa6'

const PollActions = (
    isVotedComplete,
    inputCaptured,
    onVoteSubmit,
    isBookmarked,
    toggleBookmark,
    isMyPoll,
    pollClosed,
    onClosePoll,
    onDelete,

) => {
  return (
    <div className='flex items-center gap-4'>
        {(isVotedComplete || pollClosed) && (
            <div className='text-[11px] font-medium text-slate-600 bg-sky-700/10 px-3 py-1 rounded-md'>{pollClosed ? :"closed":"Voted"}</div>
        )}

        <button className='icon-btn' onClick={toogleBookmark}>
            {isBookmarked ? (
                <FaBookmark className='text-primary'/>
            ):(
                <FaRegBookmark/>
            )
            }
        </button>
    </div>
  )
}

export default PollActions