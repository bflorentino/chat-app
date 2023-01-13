import React, { useContext } from 'react'
import { UserChatSchema, ChatUIState } from '../../../../types/types'
import noProfilePic from '../../../../assets/noprofile.png'
import { useSearchParams } from 'react-router-dom'
import { ChatUtilitiesContext } from '../../../../context/context'

const ChatListItem = ({user_name,name, last_name, lastMessage, date}:UserChatSchema) => {

  const { setChatContainerState, setInChatWithUser } = useContext(ChatUtilitiesContext)
  const [ searchParams, setSearchParams ] = useSearchParams() 

  const handleClickOnUser = () => {
    setChatContainerState(ChatUIState.InChat),
    setInChatWithUser({user_name, name, last_name})
   }

  return (
    <div className='Chat_list-item pointer' onClick={handleClickOnUser}>

      <div className='w-10 p-1 py-2'>
          <img 
            src={noProfilePic} 
            alt={user_name} 
            title={user_name} 
            className='img_chat-list'
          />
      </div>
      
      <div className='w-90 p-1 Chat_separator'>
        <div className='w-90 Chat_message-info'>
          <p className=''>{name} {last_name}</p>
          <small className='text-gray'>@{user_name}</small>
          <small className='text-dark mt-1'>{lastMessage}</small>
        </div>

        <div className='w-10 p-2'>
          <small className='text-sm'>{date}</small>
        </div>
      </div>
    </div>
  )
}

export default ChatListItem