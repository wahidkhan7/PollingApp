import React, { createContext, useState } from 'react'
export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user,setUser] = useState(null);
  //Funtion to update user data
  const updateUser = (userData) =>{
    setUser(userData);
  };

  //Function to clear user data (e.g.. on logout)
  const clearUser = () =>{
    setUser(null);
  };


  //update user Stats
  const updateUserStats = (key,value)=>{
    setUser((prev)=>({
      ...prev,
      [key]:value

    }))
  }

  //Update totalPollscreated count locally
  const onPollCreateOrDelete = (type="create") =>{
         const totalPollsCreated = user.totalPollsCreated || 0;
         updateUserStats(
          "totalPollsCreated",
          type== "create"? totalPollsCreated+1: totalPollsCreated-1
         )
  }
  // function onPollCreateOrDelete(actionType) {
  //   let currentCount = user.totalPollsCreated || 0;
    
  //   if (actionType === "create") {
  //     currentCount += 1;
  //   } else {
  //     currentCount -= 1;
  //   }
    
  //   updateUserStats("totalPollsCreated", currentCount);
  // }

  return (
    <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser,
        }}
    >{children}</UserContext.Provider>
  )
}

export default UserProvider;