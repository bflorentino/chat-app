import { useContext } from "react"
import { AuthContext } from "../../../../context/context"
import { MessageSchema } from "../../../../types/types"

const Message = ({messageId, content, time, date, user_from}:MessageSchema) => {

  const { AuthState:{userName} } = useContext(AuthContext)

  return (
    <div className={`Chat_message ${userName === user_from && 'message-r'}`  } >
      {/* <img src={noPrfoile} alt="" className='' /> */}
      <div className='Chat_message-info' >
        <div className={`Chat_bubble ${userName === user_from  && 'bubble-r'}`}>
          <small className='text-base'>{content}</small>
        </div>
        <small className='text-sm p-1'> {time} </small>
      </div>
    </div>
  )
}

export default Message