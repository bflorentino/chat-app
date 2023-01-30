import { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { AuthContext, ChatContext } from '../../../../context/context'
import { useFetchData } from '../../../../hooks/useFetchData'
import useObjectForReqest from '../../../../hooks/useObjectForRequest'
import { Endpoint, RequestsType, RequestObject, ChatsContextActionsType, ChatContextState } from '../../../../types/types'
import ChatListItem from './ChatListItem'

const ChatList = () => {

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
        }}
      )

  return ( 
    
    <div className='Chat_list-container w-full styled-scroll'>
    
    {
      isLoading 
        ? 
          <p className='text-center mt-1'>Cargando</p> 
        :
        <>
          <ul className='mt-1'>
            {
              // Array of chats is descending ordered by the datetime of the last message in every chat. 
              // Last messages will be on top of the chat list (Using b - a for ascending order).
              Object.values(ChatState)
              .sort((a, b) => new Date(`${b.messages[b.messages.length - 1].date!} ${b.messages[b.messages.length - 1].time!}`).getTime()
                             - new Date(`${a.messages[a.messages.length - 1].date!} ${a.messages[a.messages.length - 1].time!}`).getTime() 
                            )
              .map(chat => (
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
            Object.keys(ChatState).length === 0 && <p className='text-center text-dark mt-2'>Search Your friends and start chatting!</p>
          }
    </>
    }
    </div>
)}

export default ChatList