import  { useContext, useState } from 'react'
import { UserChatSchema, ChatUIState, Endpoint, RequestsType, RequestObject } from '../../../../types/types'
import noProfilePic from '../../../../assets/noprofile.png'
import { ChatUtilitiesContext } from '../../../../context/context'
import { useQuery } from 'react-query'
import { useFetchData } from '../../../../hooks/useFetchData'
import useObjectForReqest from '../../../../hooks/useObjectForRequest'

const ChatListItem = ({user_name,lastMessage, date, _id}:UserChatSchema) => {

  const { setChatContainerState, setInChatWithUser } = useContext(ChatUtilitiesContext)

  const [ userChat, setUserChat ] = useState<UserChatSchema>({user_name, lastMessage, date, _id })

  const fetcher = useFetchData()
  const objectForRequest = useObjectForReqest(`${Endpoint.getPicAndName}/${user_name}` as Endpoint, RequestsType.get, false)

  const query = useQuery([`${user_name} data`], () => fetcher(objectForRequest as RequestObject),
                          { onSuccess:(res) => {
                            setUserChat(userChat => ({...userChat, ...res._data, _id })) 
                          }}
                        )

  const handleClickOnUser = () => {
    setChatContainerState(ChatUIState.InChat),
    setInChatWithUser({...userChat})
   }

  return (
    <div className='Chat_list-item pointer' onClick={handleClickOnUser}>

      <div className='w-10 p-1 py-2'>
          <img 
            src={userChat.profilePic ||  noProfilePic} 
            alt={user_name} 
            title={user_name} 
            className='img_chat-list'
          />
      </div>
      
      <div className='w-90 p-1 Chat_separator'>
        <div className='w-90 Chat_message-info'>
          <p className=''>{userChat.name} {userChat.last_name}</p>
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