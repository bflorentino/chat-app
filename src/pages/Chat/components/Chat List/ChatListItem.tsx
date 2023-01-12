import React, { useContext } from 'react'
import { ChatListSchema, ChatUIState } from '../../../../types/types'
import noProfilePic from '../../../../assets/noprofile.png'
import { useSearchParams } from 'react-router-dom'
import { ChatUtilitiesContext } from '../../../../context/context'

const ChatListItem = ({userName,name, lastName, lastMessage, date}:ChatListSchema) => {

  const { setChatContainerState } = useContext(ChatUtilitiesContext)
  const [ searchParams, setSearchParams ] = useSearchParams() 

  const handleClickOnUser = () => {
    setChatContainerState(ChatUIState.InChat),
    setSearchParams({user:userName}, { replace:true })
   }

  return (
    <div className='Chat_list-item pointer' onClick={handleClickOnUser}>

      <div className='w-10 p-1 py-2'>
          <img 
            src={noProfilePic} 
            alt={userName} 
            title={userName} 
            className='img_chat-list'
          />
      </div>
      
      <div className='w-90 p-1 Chat_separator'>
        <div className='w-90 Chat_message-info'>
          <p className=''>{name} {lastName}</p>
          <small className='text-gray'>@{userName}</small>
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