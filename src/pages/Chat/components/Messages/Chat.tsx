import React, { useContext, useState } from 'react'
import { AuthContext, ChatContext, ChatUtilitiesContext, SocketContext } from '../../../../context/context'
import { ChatUIState, MessageSchema, SocketEvents } from '../../../../types/types'
import noProfile from '../../../../assets/noprofile.png'
import Message from './Message'
import {v4} from 'uuid'

const Chat = () => {

  const { setChatContainerState, inChatWithUser, setInChatWithUser } = useContext(ChatUtilitiesContext)
  const { AuthState:{userName}} = useContext(AuthContext)
  const { SocketState:{socket}, SocketDispatch } = useContext(SocketContext)
  const { ChatState } = useContext(ChatContext)

  const [ messageTyped, setMessageTyped ] = useState<string>("")

  const handleGoBack = ()=> {
    setChatContainerState(ChatUIState.ChatList)
    setInChatWithUser({})
  }

  const handleSendMessage = ()=> {
    
    if(socket && messageTyped){

      const messageToSend:MessageSchema = {
                      content:messageTyped, 
                      was_seen:false, 
                      user_from:userName, 
                      messageId:v4()
                  }
      
      socket.emit(SocketEvents.sendMessage, messageToSend, userName, inChatWithUser?.user_name)
      setMessageTyped("")
    }
  }

  return (
    <>
      <div className='Chat_user-banner'>
      
        <button className='btn pointer' onClick={handleGoBack}>
          
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="img_svg-icon"
          >
             <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>

        </button>
      
        <img src={noProfile} className='img_banner' alt='No Profile' />
          
          <div className='ml-1'>
            
            <p className='text-600'>
              {inChatWithUser?.name} {inChatWithUser?.last_name} <small>({inChatWithUser?.user_name})</small>
            </p>
            
            <small className='text-sm'>Online</small>
          </div>
      
      </div>

        <ul className='Chat_messages-container styled-scroll'>
        {
          // Only render messages if exists a chat with the user
          (inChatWithUser && inChatWithUser._id && ChatState[inChatWithUser._id]) 
              &&
            ChatState[inChatWithUser._id].messages.map((m) => (
            <li key={m.messageId}>
              <Message 
                content={m.content}
                messageId={m.messageId}
                date={m.date}
                time={m.time}
                user_from={m.user_from}
              />
            </li>
          ))
        }
      </ul>

      <div className='Chat_write-box p-1'>
          <button className='btn pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="img_svg-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
        </button>
        
        <textarea  
          className='p-2'
          placeholder='Write your message'
          value={messageTyped}
          onChange= {(e:React.ChangeEvent<HTMLTextAreaElement>)=>setMessageTyped(e.target.value) }
        />
          <button className='btn pointer' onClick={handleSendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="img_svg-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </>
  )
}

export default Chat