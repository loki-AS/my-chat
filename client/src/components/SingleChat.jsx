import React, { useState } from 'react'
import { useContext } from 'react'
import { myUserContext } from '../context/UserContext'
import { AiOutlineArrowLeft } from "react-icons/ai"
import { getSender, getSenderPic } from '../config/ChatLogic'
import axios from "axios"
import { useEffect } from 'react'
import { MdSend } from "react-icons/md"
import ScrollabelChat from './ScrollabelChat'
import io from "socket.io-client"
import { useLottie } from "lottie-react";
import Lottie from "lottie-react"
import loadinganimi from "../config/loadinganimi.json"

const ENDPOINT = "http://localhost:3001"

var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);

    const { selectedChat, setSelectedChat, user } = useContext(myUserContext)

    const options = {
      animationData: loadinganimi,
      loop: true
    }

    const { loadingAnimation } = useLottie(options)

    const fetchMessages = async () => {
        if (!selectedChat) return;
    
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
    
          setLoading(true);
    
          const { data } = await axios.get(
            `http://localhost:3001/api/message/${selectedChat._id}`,
            config
          );

          setMessages(data);
          setLoading(false);

          socket.emit("join chat", selectedChat._id);
        } catch (error) {
            alert(error)
        }
      }

      useEffect(() => {
        fetchMessages();
      }, [selectedChat]);

    const sendMessage = async (event) => {

      event.preventDefault()

      if (newMessage == ""){
        alert("enter the message")
      }

        if (newMessage != "") {
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            };
            setNewMessage("");
            const { data } = await axios.post(
              "http://localhost:3001/api/message",
              {
                content: newMessage,
                chatId: selectedChat,
              },
              config
            );

            socket.emit("new message", data);
            setMessages([...messages, data]);
          } catch (error) {
            alert(error)
          }
        }
      };

      useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    
        // eslint-disable-next-line
      }, []);

    const typingHandler = (e) => {
        setNewMessage(e.target.value); 

        if (!socketConnected) return;

        if (!typing) {
          setTyping(true);
          socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
          var timeNow = new Date().getTime();
          var timeDiff = timeNow - lastTypingTime;
          if (timeDiff >= timerLength && typing) {
            socket.emit("stop typing", selectedChat._id);
            setTyping(false);
          }
        }, timerLength);
    }

  return (
    <>
    {selectedChat ? (
        <>
        <div className='flex justify-between items-center'>
        <AiOutlineArrowLeft onClick={() => setSelectedChat("")} size={25} className="lg:hidden flex text-gray-600 cursor-pointer" />
        <h1 className='text-xl font-poppins font-semibold text-gray-500 uppercase'>{getSender(user, selectedChat.users)}</h1>
        <img 
        src={getSenderPic(user, selectedChat.users)} 
        alt="profile"
        className='h-10 w-10 rounded-full'
        />
        </div>

        <div className='bg-gray-300 px-2 py-1 w-full rounded-lg lg:h-[25.5rem] h-[30rem] mt-3 overflow-y-scroll scrollbar'>
        
        {loading ? (
                <div role="status" className='flex justify-center items-center h-[27rem]'>
                <svg aria-hidden="true" className="w-16 h-16 mr-2 mt-3 text-gray-200 animate-spin  fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
            ): (
                <div className='overflow-y-scroll scrollbar font-poppins'>
                    <ScrollabelChat messages={messages} />
                </div>
            )
        }
        </div>

        {istyping ? <div> <h1 className='font-poppins'>Typing...</h1> </div> : (<></>)}
        
        <form onSubmit={sendMessage} className="flex my-1" >
            
            <input 
            type="text"
            placeholder='Message..'
            className='rounded-lg w-full px-4 py-2 bg-gray-300 font-poppins'
            onChange={typingHandler}
            value={newMessage}
            />
            <button type="submit"><MdSend size={30} className="ml-3 cursor-pointer text-gray-600 hover:text-gray-800" /></button>
        </form>
        </>
    ): (
        <div className='border-2 w-full h-[30rem] my-3 py-6 flex justify-center items-center'>
            <h1 className='text-xl font-poppins text-gray-600'>Click on a user to start chat!</h1>
        </div>
    )}
    </>
  )
}

export default SingleChat