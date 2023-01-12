import { useState } from 'react'
import Searcher from '../Searcher'
import ChatListItem from './ChatListItem'

const ChatList = () => {

  const [ searchString, setSearchString ] = useState<string>("")

  return ( 
    
    <div className='Chat_list-container w-full styled-scroll'>

      <Searcher setSearchString={setSearchString}  />
    
    <ul>
      {
        [1,2,3,4,5,6,7,8,9,10].map(i => (
          <li key={i}>
            <ChatListItem 
                name={'Bryan'} 
                lastName={'montero'}  
                userName={'bflorentino'}
                lastMessage={'Ayer me mude de donde vivía en San Isidro'}
                date={new Date().toLocaleDateString()}  
                />
          </li>
          ))
        }
    </ul>

      </div>
)}

export default ChatList