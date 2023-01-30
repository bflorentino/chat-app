import React, { useContext, useEffect, useState } from 'react'
import { AuthContext, ChatContext, ChatUtilitiesContext, SocketContext } from '../../../../context/context'
import { ChatUIState, Endpoint, MessageContextMenuItems, MessageSchema, RequestsType, SocketEvents } from '../../../../types/types'
import noProfile from '../../../../assets/noprofile.png'
import Message from './Message'
import {v4} from 'uuid'
import { useQuery } from 'react-query'
import useObjectForReqest from '../../../../hooks/useObjectForRequest'
import { useFetchData } from '../../../../hooks/useFetchData'
import MessageContextMenu from './MessageContextMenu'

const initialContextMenu: MessageContextMenuItems = {
  show:false, 
  x:0,
  y:0,
  messageReference:null
}

const Chat = () => {

  const { setChatContainerState, inChatWithUser, setInChatWithUser } = useContext(ChatUtilitiesContext)
  const { AuthState:{userName}} = useContext(AuthContext)
  const { SocketState:{socket, usersOnline} } = useContext(SocketContext)
  const { ChatState } = useContext(ChatContext)

  const [ messageTyped, setMessageTyped ] = useState<string>("")
  const [ messageToEdit , setMessageToEdit ] = useState<MessageSchema | null>(null)
  const [ contextMenu, setContextMenu ] = useState(initialContextMenu)
 
  const objectForRequest = useObjectForReqest(`${Endpoint.getLastTime}/${inChatWithUser.user_name}` as Endpoint, RequestsType.get, false)

  const fetcher = useFetchData()

  const { data:lastTimeActive } = useQuery(['lastTime', usersOnline], 
                                           () => fetcher(objectForRequest), {
                                           enabled : !usersOnline[inChatWithUser.user_name!],
                                           select: (res) => res._data
                                        })

  useEffect(()=> {
    if(messageToEdit){
      setMessageTyped(messageToEdit.content)
    }
  }, [messageToEdit])

  useEffect(()=>{
    if(messageToEdit && !messageTyped){
      setMessageToEdit(null)
    }
  }, [messageTyped])

  useEffect(()=> {
    if(socket && inChatWithUser._id){
      // Get unread message
      const unreadMessages = ChatState[inChatWithUser._id].messages.filter(msg => (!msg.was_seen && msg.user_from !== userName))
      const messagesId = unreadMessages.map(msg => msg.messageId)

      socket.emit(SocketEvents.readMessage, messagesId, userName, inChatWithUser.user_name, inChatWithUser._id)
    }
  },[])

  const handleGoBack = ()=> {
    setChatContainerState(ChatUIState.ChatList)
    setInChatWithUser({})
  }

  const closeContextMenu = () => setContextMenu(initialContextMenu)

  const handleSendMessage = ()=> {
    
    if(socket && messageTyped){

      const messageToSend:MessageSchema = {
                      content:messageTyped, 
                      was_seen: messageToEdit ? messageToEdit.was_seen : false, 
                      user_from:userName, 
                      messageId: messageToEdit ? messageToEdit.messageId : v4(),
                      edited:new Boolean(messageToEdit)
                  }
      
      if(messageToEdit){
        socket.emit(SocketEvents.updateMessage, messageToSend, userName, inChatWithUser.user_name, inChatWithUser._id, "typed")
      }
      else{
        socket.emit(SocketEvents.sendMessage, messageToSend, userName, inChatWithUser.user_name)
      }

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
      
        <img src={inChatWithUser.profilePic || noProfile} className='img_banner' alt='No Profile' />
          
          <div className='ml-1'>
            
            <p className='text-600'>
              {inChatWithUser?.name} {inChatWithUser?.last_name} <small>({inChatWithUser?.user_name})</small>
            </p>
            
            <small className='text-sm'>{usersOnline[inChatWithUser.user_name!] ? 'Online' : lastTimeActive as string }</small>
          </div>
      
      </div>

        <ul className='Chat_messages-container styled-scroll'>
        {
          // Only render messages if exists a chat with the user
          (inChatWithUser && inChatWithUser._id && ChatState[inChatWithUser._id]) 
              &&
            ChatState[inChatWithUser._id].messages.map(m => (
            <li key={m.messageId}>
              <Message 
                message = {m}
                setContextMenu={setContextMenu}
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
            {
              messageToEdit 
              ?
              (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="img_svg-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>)
              :
              (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="img_svg-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>)
          }
        </button>
      </div>

      {
        contextMenu.show && 
                    <MessageContextMenu 
                      contextMenuProps={{contextMenuItems:contextMenu, closeContextMenu, setMessageToEdit}}
                    />
      }
    </>
  )
}

export default Chat