import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import useUserAuth from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATH } from '../../utils/apiPaths';
import PollCard from '../../components/PollCard/PollCard';
import BOOKMARK_ICON from "../../assets/images/bookmark-icon.png";
import EmptyCard from '../../components/cards/EmptyCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const PAGE_SIZE = 10;

const Bookmarks = () => {
    useUserAuth();
    const navigate = useNavigate();
   
  
    const [bookmarkedPolls, setBookmarkedPolls] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    const fetchbookmarkedPolls = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(API_PATH.POLLS.GET_BOOKMARKED, {
                params: {
                    page,
                    limit: PAGE_SIZE
                }
            });
            
            if (response.data?.bookmarkedPolls?.length > 0) {
                // If first page, replace all polls
                if (page === 1) {
                  setBookmarkedPolls(response.data.bookmarkedPolls);
                } else {
                    // Filter out duplicates before adding new polls
                    const newPolls = response.data.polls.filter(newPoll => 
                        !bookmarkedPolls.some(existingPoll => existingPoll._id === newPoll._id)
                    );
                    setBookmarkedPolls(prev => [...prev, ...newPolls]);
                }
                
                
                setHasMore(response.data.bookmarkedPolls.length === PAGE_SIZE);
            } else {
                setHasMore(false);
                if (page === 1) {
                  setBookmarkedPolls([]);
                }
            }
        } catch (error) {
            console.error("Error fetching bookmark polls:", error);
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
        fetchbookmarkedPolls();
    }, [page]);

    // Reset on unmount
    useEffect(() => {
        return () => {
          setBookmarkedPolls([]);
            setPage(1);
            setHasMore(true);
        };
    }, []);

    return (
        <DashboardLayout activeMenu='Bookmarks'>
            <div className='my-5 mx-auto'>
                <h2 className='text-xl font-medium text-black'>Bookmarks</h2>

                {!initialLoad && bookmarkedPolls.length === 0 && !loading && (
                    <EmptyCard
                        imgSrc={BOOKMARK_ICON}
                        message="You have not Bookmarked any polls yet! Start exploring now..."
                        btnText="Explore"
                        onClick={() => navigate("/dashboard")}
                    />
                )}

                <InfiniteScroll
                    dataLength={bookmarkedPolls.length}
                    next={loadMorePolls}
                    hasMore={hasMore}
                    loader={<h4 className='info-text'>Loading...</h4>}
                    endMessage={
                      bookmarkedPolls.length > 0 && (
                            <p className='info-text'>No more polls to display.</p>
                        )
                    }
                >
                    {bookmarkedPolls.map((poll) => (
                      
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

export default Bookmarks;