import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { getSender } from '../config/ChatLogic';
import { myUserContext } from '../context/UserContext'
import ChatLoading from './ChatLoading';
import axios from "axios"

const MyChats = ({ fetchAgain }) => {

  const [loggedUser, setLoggedUser] = useState();

  const [allUsers, setAllUsers] = useState([])

  const { selectedChat, setSelectedChat, user, chats, setChats } = useContext(myUserContext)

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:3001/api/chat", config);
      setChats(data);

      setAllUsers(data)

    } catch (error) {
      alert(error)
    }
  }; 

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();    
  }, [fetchAgain])

  return (
    <div className={`${selectedChat ? "hidden" : "flex flex-col"} lg:flex lg:flex-col rounded-lg bg-slate-200 w-full px-4 py-2 `} >
  
      <h1 className='text-xl font-poppins font-semibold text-gray-500'>My Chats</h1>

      <div className='border-2 w-full lg:h-[28.5rem] h-[30rem] my-3 overflow-y-scroll scrollbar'>
        {allUsers.map((chat) => (
          <div 
          key={chat._id} 
          onClick={() => setSelectedChat(chat)}
          className={`my-3 px-4 py-2 rounded-lg cursor-pointer ${selectedChat === chat ? "bg-gray-600 text-white" : "bg-gray-300"}`}
          >
            <h1 className='text-xl font-poppins capitalize'>{ getSender(loggedUser, chat.users)}</h1>

            {chat.latestMessage && (
              <h1 className='font-poppins text-gray-600'> 
              <span className='capitalize'>{chat.latestMessage.sender.name}: {""}</span>
                {chat.latestMessage.content.length > 50
                ? chat.latestMessage.content.substring(0, 51) + "..."
                : chat.latestMessage.content}
              </h1>
            )}
          </div>
        ))}
        </div>
    </div>
  )
}

export default MyChats