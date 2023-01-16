import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogic'
import { myUserContext } from '../context/UserContext'

const ScrollabelChat = ({ messages }) => {

    const { user } = useContext(myUserContext)

    const messageref = useRef(null)

    useEffect(() => {
        messageref.current?.scrollIntoView()
    }, [messages])

  return (
    <div>
        {messages && 
        messages.map((m, i) => (
            <div className='flex' key={m._id}>
                {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                    <img 
                    src={m.sender.pic} 
                    alt={m.sender.name}
                    className="mt-2 mr-1 h-8 w-8 rounded-full cursor-pointer"
                    />
                )
                }
                <span
                style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}    
                >{m.content}</span>
            </div>
        ))}
        <div ref={messageref}/>
    </div>
  )
}

export default ScrollabelChat