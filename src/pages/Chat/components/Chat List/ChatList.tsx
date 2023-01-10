import React, { useState } from 'react'
import Searcher from '../Searcher'
import ChatListItem from './ChatListItem'

const ChatList = () => {

  const [ searchString, setSearchString ] = useState<string>("")

  return ( 
    
    <div className='Chat_list-container w-full'>

      <Searcher setSearchString={setSearchString}  />
    {
      [1,2,3,4,5,6,7,8,9,10].map(i => (
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