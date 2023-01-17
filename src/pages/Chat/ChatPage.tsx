import { useContext } from 'react'
import { ChatUtilitiesContext } from '../../context/context'
import Navbar from '../../shared/components/Navbar'
import { ChatUIState } from '../../types/types'
import ChatList from './components/Chat List/ChatList'
import Chat from './components/Messages/Chat'
import UserList from './components/Users List/UserList'
import { useSocketListener } from '../../hooks/useSocketListeners'

const ChatPage = () => {

  useSocketListener()

  const { chatContainerState, inChatWithUser } = useContext(ChatUtilitiesContext)

  return (
    <div className='Chat_page'>
      <div className='Chat_container'>
        
        { 
          //Only renders navbar if user is not placed inside a chat
          chatContainerState !== ChatUIState.InChat 
            &&
          <Navbar /> 
        }
        
        {
          chatContainerState === ChatUIState.ChatList 
            &&
          <ChatList />
        }

        {
          chatContainerState === ChatUIState.UsersSearch 
            &&
          <UserList />
        }

        {
          chatContainerState === ChatUIState.InChat
            &&
          <Chat />
        }
      </div>
    </div>
  )
}

export default ChatPage