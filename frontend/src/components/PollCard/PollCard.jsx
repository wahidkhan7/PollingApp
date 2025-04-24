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


import React from 'react'

const PollCard = ({
    pollId,
    question,
    type,
    options,
    voters,
    response,
    creatorProfileImg,
    creatorName,
    creatorUsername,
    userHasVoted,
    isPollClosed,
    createdAt
}) => {
    return (
        <div className="poll-card">
            <h3>{question}</h3>
        
        </div>
    )
}

export default PollCard