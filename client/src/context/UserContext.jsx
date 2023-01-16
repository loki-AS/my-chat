import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const myUserContext = createContext()

const UserContext = ({ children }) => {

    const [user, setUser] = useState()
    const [active, setActive] = useState(true)
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);
  
      if (!userInfo) navigate("/");
     
    }, []);

  return (
    <myUserContext.Provider 
    value={{user, setUser, active, setActive, chats, setChats, selectedChat, setSelectedChat}}
    >
        {children}
    </myUserContext.Provider>
  )
}

export default UserContext