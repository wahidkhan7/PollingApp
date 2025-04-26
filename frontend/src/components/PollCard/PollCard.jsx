// import React from 'react'

// const PollCard = (
//     pollId,
//     question,
//     type,
//     options,
//     voters,
//     response,
//     creatorProfileImg,
//     creatorName,
//     creatorUsername,
//     userHasVoted,
//     isPollClosed,
//     createdAt
// ) => {
//   return (
//     <div>
//         {question}
//     </div>
//   )
// }

// export default PollCard


import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { getPollBookmarked } from '../../utils/helper';
import UserProfileInfo from '../cards/UserProfileInfo';
import PollActions from './PollActions';
const PollCard = ({
    pollId,
    question,
    type,
    options,
    voters,
    responses,
    creatorProfileImg,
    creatorName,
    creatorUsername,
    userHasVoted,
    isPollClosed,
    createdAt
}) => {
       const { user } = useContext(UserContext);
       const [selectedOptionIndex,setSelectedOptionIndex] = useState(-1);
       const[rating,setRating] = useState(0)
       const [userResponse,setUserResponse] = useState("");
       const [isVoteComplete,setIsVoteComplete] = useState(userHasVoted);
       const [pollResult,setPollResult] = useState({
        options,
        voters,
        responses,
       });
       const isPollBookmarked = getPollBookmarked(
        pollId,
        user.bookmarkedPolls || []
       );
       const [pollBookmarked,setPollBookmarked] = useState(isPollBookmarked);
       const [pollClosed,setPollClosed] = useState(isPollClosed || false);
       const [pollDeleted,setPollDeleted] = useState(false);

        return 
        (
        !pollDeleted && (
        <div className='bg-slate-100/50 my-5 p-5 rounded-lg border border-slate-100 mx-auto'>
            <div className='flex items-start justify-between'>
                <UserProfileInfo
                 imgUrl = {creatorProfileImg}
                 fullname = {creatorName}
                 username = {creatorUsername}
                 createdAt = {createdAt}
                />

                <PollActions
                 pollId={pollId}
                 isVoteComplete={isVoteComplete}
                 inputCaptured={
                    !!(userResponse || selectedOptionIndex>=0 || rating)
                 }
                 onVoteSubmit = {()=>{}}
                 isBookmarked={pollBookmarked}
                 toogleBoookmark={()=>{}}
                 isMyPoll = {isMyPoll}
                 pollClosed={pollClosed}
                 onClosePoll={()=>{}}
                 onDelete={()=>{}}
                />
            </div>
        </div>
        )
    )
        
}

export default PollCard