import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChatUtilitiesContext } from '../../../../context/context'
import { ChatUIState } from '../../../../types/types'
import noProfile from '../../../../assets/noprofile.png'
import Message from './Message'

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

        <ul className='Chat_messages-container styled-scroll'>
        {
          [{me:false},{me:true}, {me:true},{me:false},{me:true},{me:false},{me:true},{me:false},{me:true}].map((m, i) => (
            <li key={i}>
              <Message me={m.me} />
            </li>
          ))
        }
      </ul>

      <div className='Chat_write-box p-1'>
          <button className='btn'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="img_svg-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
        </button>
        
        <textarea  
          className='p-2'
          placeholder='Write your message'
        />
          <button className='btn'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="img_svg-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </>
  )
}

export default Chat