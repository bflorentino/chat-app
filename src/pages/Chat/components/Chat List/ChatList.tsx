import { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { AuthContext, ChatContext } from '../../../../context/context'
import { useFetchData } from '../../../../hooks/useFetchData'
import useObjectForReqest from '../../../../hooks/useObjectForRequest'
import { Endpoint, RequestsType, RequestObject, ChatsContextActionsType, ChatContextState } from '../../../../types/types'
import Searcher from '../Searcher'
import ChatListItem from './ChatListItem'

const ChatList = () => {

  const [ searchString, setSearchString ] = useState<string>("")

  const { AuthState:{userName} } = useContext(AuthContext)
  const { ChatState, ChatDispatch } = useContext(ChatContext)

  const [ isLoading, setIsLoading ] = useState(false)

  const fetcher = useFetchData()
  const objectForRequest = useObjectForReqest(Endpoint.getChats, RequestsType.get, false)
  objectForRequest.endpoint = `${objectForRequest.endpoint}/${userName}`

   const query = useQuery(["getChats"], 
       ()=> { setIsLoading(true); 
              return fetcher(objectForRequest as RequestObject)
            },
        {  
        
        enabled:Object.keys(ChatState).length === 0,
        
        onSuccess:(response) => {
          if(response._success){
            ChatDispatch({type:ChatsContextActionsType.GET_CHATS, payload:response._data as ChatContextState})
          }
          setIsLoading(false)
        }},
      )

  return ( 
    
    <div className='Chat_list-container w-full styled-scroll'>

      <Searcher setSearchString={setSearchString}  />
    
    {
      isLoading 
        ? 
          <p>Cargando</p> 
        :
        <>
          <ul>
            {
              Object.values(ChatState).map(chat => (
                <li key={chat.messages[chat.messages.length-1].messageId}>
                  <ChatListItem 
                      _id={chat._id}
                      user_name={chat.user_1 === userName ? chat.user_2 : chat.user_1 }
                      lastMessage={chat.messages[chat.messages.length-1]}
                      date={chat.messages[chat.messages.length - 1].date}
                      messagesUnread={chat.messages.filter(msg => !msg.was_seen && msg.user_from !== userName).length}
                      />
                </li>
              ))
            }
          </ul>

          {
            Object.keys(ChatState).length === 0 && <p>Search Your friends and start chatting!</p>
          }
    </>
    }
    </div>
)}

export default ChatList