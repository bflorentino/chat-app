import React from 'react'
import Searcher from '../Searcher'
import ChatListItem from './ChatListItem'

const ChatList = () => {
  return ( 
    
    <div className='Chat_list-container w-full'>
      <Searcher />
    {
      [1,2,3,4,5].map(i => (
          <ChatListItem 
              name={'Bryan'} 
              lastName={'montero'}  
              userName={'bflorentino'}
              lastMessage={'Ayer me mude de donde vivía en San Isidro'}
              date={new Date().toLocaleDateString()}  
            />
            ))
      }
      </div>
)}

export default ChatList