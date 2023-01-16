import React from 'react'
import { useContext } from 'react'
import { GiCancel } from "react-icons/gi"
import { myUserContext } from '../context/UserContext'
import { motion } from 'framer-motion'
import { useState } from 'react'
import axios from "axios"
import UserList from './UserList'
import ChatLoading from "./ChatLoading"

const SideBar = () => {

    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const {active, setActive, user, setSelectedChat, chats, setChats} = useContext(myUserContext)

    const handleSearch = async(e) => {
        e.preventDefault()
    
        if(!search){
            alert("Enter the search field")
        }
    
        try {
            setLoading(true)
    
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              };
    
            const { data } = await axios.get(`https://my-chat-f28w.onrender.com/api/user?search=${search}`, config);
    
            setLoading(false)
    
            setSearchResults(data);
    
    
        } catch (error) {
            alert("error occured")
        }
    }

    const accessChat = async(userId) => {
        console.log(userId)

        try {
            setLoadingChat(true)

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                }
            }
            const { data } = await axios.post(`https://my-chat-f28w.onrender.com/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);  
            setActive(true)  
        } catch (error) {
            alert("error fetching the chat")
        }
    }

  return (
    <motion.div 
    initial={{
        x:-500,
        opacity:0,
        scale:0.5
    }}
    animate={{
        x:0,
        opacity:1,
        scale:1
    }}
    transition={{
        duration: 1.5
    }}
    className='bg-gray-300 h-screen py-4 px-2 rounded-lg mb-5'>
        
        <div className='flex items-end justify-end'>
        <GiCancel 
        size={25} 
        className="mb-3 text-gray-700" 
        onClick={() => setActive(true)}
        />
        </div>

        <div>
        <input 
        type="text"
        placeholder='Search'
        className='px-4 py-2 rounded-lg font-poppins'
        onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} className='bg-gray-600 py-2 px-4 mx-2 text-white font-poppins tracking-[1px] rounded-lg'>GO</button>
        </div>

        {loading ? (
            <ChatLoading />
        ): (
            searchResults.map((user) => (
                <UserList 
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}  
                />
            ))
        )}

        {loadingChat && 
        <div role="status" className='flex justify-center'>
        <svg aria-hidden="true" className="w-10 h-10 mr-2 mt-3 text-gray-200 animate-spin  fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
    </div>
        }
    </motion.div>
  )
}

export default SideBar