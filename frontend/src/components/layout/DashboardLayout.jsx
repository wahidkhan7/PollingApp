import React, { Children } from 'react'
import Navbar from './Navbar'
import SideMenu from './SideMenu'
import { UserContext } from '../../context/UserContext'

const DashboardLayout = ({children,activeMenu}) => {
  const { user } = UserContext(UserContext);

  return (
    <div>
        <Navbar activeMenu={activeMenu}/>

        {user && (<div className='flex'>
          <div className='max-[1080px]:hidden'>
          <SideMenu activeMenu={activeMenu}/>
          </div>

        <div className='grow mx-5'>{children}</div>

        <div className='hidden md:block mr-5'>
          {JSON.stringify(user)}
          <UserDetailsCard
            profileImageUrl = {user && user.profileImageUrl}
            fullname={user && user.fullName}
            username = {user && user.username}
            totalPollsVotes = {user && user.totalPollsVotes}
            totalPollsCreated = {user && user.totalPollsCreated}
            totalPollsBookmarked = {user && user.totalPollsBookmarked}
            />
        </div>
        </div>)}
    </div>
  )
}

export default DashboardLayout