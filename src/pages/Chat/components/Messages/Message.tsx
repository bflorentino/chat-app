import { useContext } from "react"
import { AuthContext} from "../../../../context/context"
import { MessageContextMenuItems, MessageSchema } from "../../../../types/types"
import read from '../../../../assets/read.png'
import checkmark from '../../../../assets/check.png'

const Message = ({message, setContextMenu}:{message:MessageSchema, setContextMenu:(m:MessageContextMenuItems)=>void }) => {

  const { AuthState:{userName} } = useContext(AuthContext)

  const handleContextMenu = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {   
    e.preventDefault()

    if(message.user_from === userName)
      setContextMenu({show:true, x:e.pageX, y:e.pageY, messageReference:message})
  }

  return (
    <>
      <div className={`Chat_message ${userName === message.user_from && 'message-r'}`} >
        <div className='Chat_message-info' >
          <div 
            className={`Chat_bubble ${userName === message.user_from  && 'bubble-r'}`}
            onContextMenu={handleContextMenu} 
            >
            <small className='text-base'>{message.content}</small>
            <small className={`text-sm mt-1 Chat_time`}>
              {message.edited && "Edited "}{message.time} 
              {(message.was_seen  && message.user_from === userName) && <img src={read} className='img_smaller ml-1' />} 
              {(!message.was_seen && message.user_from === userName) && <img src={checkmark} className='img_smaller ml-1' />} 
            </small>
          </div>
        </div>
      </div>
    </>
  )
}
export default Message