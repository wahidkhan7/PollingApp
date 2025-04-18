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