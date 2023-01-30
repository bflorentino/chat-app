import { useContext, useRef } from 'react'
import Swal from 'sweetalert2'
import { AuthContext, ChatUtilitiesContext, SocketContext } from '../../../../context/context'
import useClickOutside from '../../../../hooks/useClickOutside'
import { MessageContextMenuProps, SocketEvents } from '../../../../types/types'

const MessageContextMenu = ({contextMenuProps,}:{ contextMenuProps:MessageContextMenuProps}) => {
  
  const contextMenuRef = useRef<HTMLDivElement>(null)
  const {setMessageToEdit, closeContextMenu, contextMenuItems:{x, y, messageReference}} = contextMenuProps
  
  const { SocketState:{socket} } = useContext(SocketContext)
  const { AuthState:{userName}} = useContext(AuthContext)
  const { inChatWithUser } = useContext(ChatUtilitiesContext)

  useClickOutside(contextMenuRef,closeContextMenu)

  const handleEditMessage = () => {
    setMessageToEdit(messageReference)
  }

  const handleDeleteMessage = async() => {

    if(socket){
      
      const result = await Swal.fire({
                        title: "Eliminar Mensaje",
                        text : "¿Are you sure you wish to delete this message?",
                        showDenyButton: true,
                        showConfirmButton: true,
                        confirmButtonText : "Accept",
                        denyButtonText: "Cancel"
      })

      if(result.isConfirmed){
        socket.emit(SocketEvents.deleteMessage, messageReference, userName, inChatWithUser.user_name, inChatWithUser._id)
      }
    }
  }

  return (
    <div 
      ref={contextMenuRef}
      className='Chat_context-menu p-2'
      style={{top:`${y}px`, left:`${x}px`, position:"absolute"}}
    >
      <div onClick={handleEditMessage}>
        Editar
      </div>
      <div className='mt-1' onClick={handleDeleteMessage}>
        Eliminar
      </div>
    </div>
  )
}

export default MessageContextMenu