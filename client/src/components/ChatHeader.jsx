import React from 'react'
import { useState } from 'react'
import { AiOutlineDown } from "react-icons/ai"
import { IoIosArrowUp } from "react-icons/io"
import { BiSearch } from "react-icons/bi"
import { useContext } from 'react'
import { myUserContext } from '../context/UserContext'
import SideBar from './SideBar'
import { motion } from "framer-motion"

const ChatHeader = ({ handleLogOut, user }) => {

  const [ show, setShow] = useState(false)

  const { active, setActive } = useContext(myUserContext)

  return (
    <motion.div
    initial={{
      y:-100,
      opacity:0,
      scale:0.5
  }}
  animate={{
      y:0,
      opacity:1,
      scale:1
  }}
  transition={{
      duration: 1.5
  }}
    >
    <div className='flex justify-between items-center py-4'>
        <div className='flex cursor-pointer' onClick={() => setActive(false)}>
          <BiSearch  size={25} className="mt-1 text-white ml-2" />
          <h1 className='ml-2 capitalize text-xl text-gray-200 font-poppins lg:flex hidden'>Search</h1>
        </div>

        <div className='absolute top-[5.5rem] z-[1000]'>
          {!active && 
          <SideBar 
          user={user}
          />
          }
        </div>

        <div>
            <h1 className='text-2xl text-gray-100 uppercase font-bold tracking-[1px] font-poppins'>Pocket chat</h1>
        </div>
        <div>
          {!show ? (
            <div className='flex border px-2 py-1 rounded-lg'>
              <img className='h-10 w-10 rounded-full' src={user?.pic} alt="userprofile" />
              <AiOutlineDown onClick={() => setShow(true)} size={20} className="mt-3 text-white ml-2" />
            </div>
            ): (
              <div className='flex border px-2 py-1 rounded-lg'>
                <img className='h-10 w-10 rounded-full' src={user?.pic} alt="userprofile" />
              <IoIosArrowUp onClick={() => setShow(false)} size={20} className="mt-3 text-white ml-2" />
              </div>
            )}
        </div>
    </div>

    <div>
      {show && (
        <div className='absolute right-6 lg:right-16 top-[5.5rem] bg-slate-200 px-4 py-2 rounded-lg'>
          <h1 className='text-xl font-poppins capitalize'>Hello, {user.name}</h1>
          <button onClick={handleLogOut} className='text-xl w-full font-poppins bg-blue-500 hover:bg-blue-600 hover:scale-105 text-gray-200 px-2 py-1 rounded-lg my-3'>Logout</button>
        </div>
      )}
    </div>
    <hr className='shadow-md' />
    </motion.div>
  )
}

export default ChatHeader