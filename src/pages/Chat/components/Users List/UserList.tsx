import { useState } from 'react'
import { useQuery } from 'react-query'
import { useFetchData } from '../../../../hooks/useFetchData'
import useObjectForReqest from '../../../../hooks/useObjectForRequest'
import { Endpoint, RequestsType, UserChatSchema } from '../../../../types/types'
import ChatListItem from '../Chat List/ChatListItem'
import Searcher from '../Searcher'

const UserList = () => {

    const [ searchString, setSearchString ] = useState<string>("")

    const fetcher = useFetchData()
    const objectForRequest = useObjectForReqest(Endpoint.matchingUsers, RequestsType.get, false)
    objectForRequest.endpoint = `${objectForRequest.endpoint}/${searchString}`

    const {data:usersMatched } = useQuery(['users', searchString], 
        () => fetcher(objectForRequest), {
            enabled: searchString !== "",
            select:(res) => res._data as Array<UserChatSchema>
    })
    
    return (
        <div className='Chat_list-container w-full'>
            <Searcher setSearchString={setSearchString} />

            {   
                searchString === "" 
                    ? 
                    <p className='m-auto text-dark'>Start Making a search</p>
                    :(
                        usersMatched &&  // Only renders what is below if usersMatched is defined (as an array) 
                            (usersMatched.length > 0
                             ?
                                usersMatched.map((user:UserChatSchema) => (
                                    <ChatListItem
                                        key={user.user_name}
                                        name={user.name}
                                        last_name={user.last_name}  
                                        user_name={user.user_name}
                                        _id={"De PRueba"}
                                    />
                                ))
                            : <p className='m-auto text-dark'>No Users Found</p>
                            )
                    )
            }
    </div>
  )
}

export default UserList