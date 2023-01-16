import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatHeader from '../components/ChatHeader'
import { myUserContext } from '../context/UserContext'
import MyChats from "../components/MyChats"
import MyChatBox from "../components/MyChatBox"
import { ToastContainer, toast } from 'react-toastify';

const Chat = () => {

  const [fetchAgain, setFetchAgain] = useState(false);

  const  { user, selectedChat } = useContext(myUserContext)

  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    toast("logout successful!")
    navigate("/")
  }

  return (
    <div className='px-6 lg:px-16 bg-gray-800 scrollbar'>
      <ToastContainer />
      {
        user &&
        <ChatHeader 
        handleLogOut={handleLogOut}
        user={user}
        />
      }
      <div className='lg:flex hidden justify-between lg:gap-1 gap-0 my-3'>
        <div className='flex-1 col-span-2'>
        {user && <MyChats fetchAgain={fetchAgain} /> }
        </div>
        <div className='flex-1 col-span-5'>
        {user && <MyChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> }
        </div>
      </div>

      <div className='flex lg:hidden my-3'>
        {user && <MyChats fetchAgain={fetchAgain} /> }
        {
          selectedChat && <MyChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        }
        </div>
    </div>
  )
}

export default Chat