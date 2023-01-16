import React from 'react'
import { useContext } from 'react'
import { myUserContext } from '../context/UserContext'
import SingleChat from './SingleChat'

const MyChatBox = ({ fetchAgain, setFetchAgain }) => {

  const { selectedChat } = useContext(myUserContext)

  return (
    <div 
    className={`${selectedChat ? "flex flex-col" : "hidden"} lg:flex lg:flex-col w-full bg-slate-200 rounded-lg px-4 py-2`}
    >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> 
    </div>
  )
}

export default MyChatBox