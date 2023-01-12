import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChatUtilitiesContext } from '../../../../context/context'
import { ChatUIState } from '../../../../types/types'
import noProfile from '../../../../assets/noprofile.png'

const Chat = () => {

  const [ searchParams, setSearchParams ] = useSearchParams()

  const { setChatContainerState } = useContext(ChatUtilitiesContext)

  useEffect(() => {

    return ()=> {
      setChatContainerState(ChatUIState.ChatList)
      setSearchParams({})
    }
  }, [])

  const handleGoBack = ()=> {
    setChatContainerState(ChatUIState.ChatList)
  }

  return (
    <>
      <div className='Chat_user-banner'>
        <button className='btn pointer' onClick={handleGoBack}>Go Back</button>
        <img src={noProfile} className='' alt='No Profile' />
      </div>

      <div className='Chat_messages-container'>

      </div>

      <div className='Chat_write-box'>
        <button>Emojis</button>
        <input 
          type="text" 
          className='Form_input p-2 m-auto'
          placeholder='Message'
          />
          <button>Enviar</button>
      </div>
    </>
  )
}

export default Chat