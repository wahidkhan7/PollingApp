
// import React, { useState } from 'react'
// import DashboardLayout from '../../components/layout/DashboardLayout'
// import useUserAuth from '../../hooks/useUserAuth'
// import { useNavigate } from 'react-router-dom'
// import HeaderWithFilter from '../../components/layout/HeaderWithFilter'
// import axiosInstance from '../../utils/axiosinstance'
// import { API_PATH } from '../../utils/apiPaths'
// import { useEffect } from 'react'
// import PollCard from '../../components/PollCard/PollCard'
// import CREATE_ICON from "../../assets/images/my-poll-icon.png"  // chnages i made
// import EmptyCard from '../../components/cards/EmptyCard'  //changes i made
// import InfiniteScroll from 'react-infinite-scroll-component' // chnages i made
// const PAGE_SIZE = 10

// const VotedPolls = () => {
//     useUserAuth()
//     const navigate = useNavigate()
   
//     const[VotedPolls,setVotedPolls]=useState([])
//     const [page, setPage] = useState(1)
//     const [hasMore, setHasMore] = useState(true)
//     const [loading, setLoading] = useState(false)
    

//     const fetchVotedPolls = async () => {
//         if (loading) return;

//         setLoading(true)

//         try {
//             const response = await axiosInstance.get(API_PATH.POLLS.VOTED_POLLS)
            
//             if (response.data?.polls?.length > 0) {
//                 setVotedPolls((prevPolls) =>  [...prevPolls, ...response.data.polls]);
//                 setHasMore(response.data.polls.length === PAGE_SIZE)
//             }
//             else {
//                 setHasMore(false)
//                 if (overridgePage === 1) {
//                     setVotedPolls([])
//                 }
//             }

//         } catch (error) {
//             console.log("Something went wrong. Please try again!", error);
//         }
//         finally {
//             setLoading(false)
//         }
//     }
     
//     const loadMorePolls=()=>{
//         setPage((prevPage)=> prevPage+1)
//     }


//     useEffect(() => {
//      fetchVotedPolls()
//      return () => {}
//     }, [page])

//     return (
//         <DashboardLayout activeMenu='Voted Polls'>
//             <div className='my-5 mx-auto'>
              
//             <h2 className='text-xl font-medium text-black'>Voted Polls</h2>

//                    {VotedPolls.length === 0 && !loading && (
//                                   <EmptyCard
//                                   imgSrc = {CREATE_ICON}
//                                   message="You have not voted on any polls yet! Start exploring now..."
//                                   btnText ="Explore"
//                                   onClick = {()=>navigate("/dashboard")}
//                                   />
                
                                 
//                                 )}


//                       <InfiniteScroll
//                            dataLength={VotedPolls.length}
//                           next ={loadMorePolls}
//                           hasMore={hasMore}
//                           loader={<h4 className='info-text'>Loading...</h4>}
//                              endMessage={<p className='info-text'>No more polls to display.</p>}
//                          >

             

                   

//                     {VotedPolls.map((poll,index) => (
//                      <PollCard
//                         //  key={`dashboard_${poll._id}`}
//                         key={index}
//                          pollId={poll._id}
//                          question={poll.question}
//                          type={poll.type}
//                          options={poll.options}
//                          voters={poll.voters.length || 0}
//                         responses={poll.responses || []}
//                         creatorProfileImg={poll.creator.profileImageUrl || null}
//                          creatorName={poll.creator.fullName}
//                          creatorUsername={poll.creator.username}
//                          userhasVoted={poll.userhasVoted || false} 
//                          isPollClosed={poll.closed || false}
//                          createdAt={poll.createdAt || false}
//                          />
//                     ))}


                       
//                 </InfiniteScroll>
//             </div>
//         </DashboardLayout>
//     )
// }

// export default VotedPolls

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import useUserAuth from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATH } from '../../utils/apiPaths';
import PollCard from '../../components/PollCard/PollCard';
import VOTE_ICON from "../../assets/images/voted-icon.png";
import EmptyCard from '../../components/cards/EmptyCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const PAGE_SIZE = 10;

const VotedPolls = () => {
    useUserAuth();
    const navigate = useNavigate();
   
    const [votedPolls, setVotedPolls] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    const fetchVotedPolls = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(API_PATH.POLLS.VOTED_POLLS, {
                params: {
                    page,
                    limit: PAGE_SIZE
                }
            });
            
            if (response.data?.polls?.length > 0) {
                // If first page, replace all polls
                if (page === 1) {
                    setVotedPolls(response.data.polls);
                } else {
                    // Filter out duplicates before adding new polls
                    const newPolls = response.data.polls.filter(newPoll => 
                        !votedPolls.some(existingPoll => existingPoll._id === newPoll._id)
                    );
                    setVotedPolls(prev => [...prev, ...newPolls]);
                }
                
                
                setHasMore(response.data.polls.length === PAGE_SIZE);
            } else {
                setHasMore(false);
                if (page === 1) {
                    setVotedPolls([]);
                }
            }
        } catch (error) {
            console.error("Error fetching voted polls:", error);
            setHasMore(false);
        } finally {
            setLoading(false);
            setInitialLoad(false);
        }
    };

    const loadMorePolls = () => {
        if (hasMore && !loading) {
            setPage(prev => prev + 1);
        }
    };

   
    useEffect(() => {
        fetchVotedPolls();
    }, [page]);

    // Reset on unmount
    useEffect(() => {
        return () => {
            setVotedPolls([]);
            setPage(1);
            setHasMore(true);
        };
    }, []);

    return (
        <DashboardLayout activeMenu='Voted Polls'>
            <div className='my-5 mx-auto'>
                <h2 className='text-xl font-medium text-black'>Voted Polls</h2>

                {!initialLoad && votedPolls.length === 0 && !loading && (
                    <EmptyCard
                        imgSrc={VOTE_ICON}
                        message="You have not voted on any polls yet! Start exploring now..."
                        btnText="Explore"
                        onClick={() => navigate("/dashboard")}
                    />
                )}

                <InfiniteScroll
                    dataLength={votedPolls.length}
                    next={loadMorePolls}
                    hasMore={hasMore}
                    loader={<h4 className='info-text'>Loading...</h4>}
                    endMessage={
                        votedPolls.length > 0 && (
                            <p className='info-text'>No more polls to display.</p>
                        )
                    }
                >
                    {votedPolls.map((poll) => (
                        <PollCard
                            key={`voted_${poll._id}_${poll.createdAt}`}
                            pollId={poll._id}
                            question={poll.question}
                            type={poll.type}
                            options={poll.options}
                            voters={poll.voters.length || 0}
                            responses={poll.responses || []}
                            creatorProfileImg={poll.creator.profileImageUrl || null}
                            creatorName={poll.creator.fullName}
                            creatorUsername={poll.creator.username}
                            userhasVoted={poll.userhasVoted || false} 
                            isPollClosed={poll.closed || false}
                            createdAt={poll.createdAt || false}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        </DashboardLayout>
    );
};

export default VotedPolls;
