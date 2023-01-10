import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/context'
import Navbar from '../../shared/components/Navbar'
import { ChatState } from '../../types/types'
import ChatList from './components/Chat List/ChatList'
import UserList from './components/Users List/UserList'

const ChatPage = () => {

  const [ chatContainerState, setChatContainerState ] = useState<ChatState>(ChatState.ChatList)

  return (
    <div className='Chat_page'>
      <div className='Chat_container'>
        <Navbar setChatState={setChatContainerState}/>
        
        {
          chatContainerState === ChatState.ChatList 
            &&
          <ChatList  />
        }

        {
          chatContainerState === ChatState.UsersSearch 
            &&
          <UserList  />
        }

      </div>
    </div>
  )
}

export default ChatPage