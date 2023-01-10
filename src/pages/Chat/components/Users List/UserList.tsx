import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useFetchData } from '../../../../hooks/useFetchData'
import useObjectForReqest from '../../../../hooks/useObjectForRequest'
import { Endpoint, RequestsType, UserMatch } from '../../../../types/types'
import ChatListItem from '../Chat List/ChatListItem'
import Searcher from '../Searcher'

const UserList = () => {

    const [ searchString, setSearchString ] = useState<string>("")

    const fetcher = useFetchData()
    const objectForRequest = useObjectForReqest(Endpoint.matchingUsers, RequestsType.get, false)
    objectForRequest.endpoint = `${objectForRequest.endpoint}/${searchString}`
    console.log(objectForRequest)

    const {data:usersMatched } = useQuery(['users'], 
        () => fetcher(objectForRequest), {
            enabled: searchString !== "",
            select:(res) => res._data as Array<UserMatch>
    })
    
   // console.log(usersMatched)
    
    return (
        <div className='Chat_list-container w-full'>
            <Searcher setSearchString={setSearchString} />
            {
            usersMatched?.map((user:UserMatch) => (
                    <ChatListItem
                        key={user.user_name}
                        name={user.name}
                        lastName={user.last_name}  
                        userName={user.user_name}
                    />
                ))
            }
    </div>
  )
}

export default UserList