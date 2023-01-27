import { useRef } from 'react'
import useClickOutside from '../../../../hooks/useClickOutside'
import { MessageContextMenuProps } from '../../../../types/types'

const MessageContextMenu = ({contextMenuProps,}:{ contextMenuProps:MessageContextMenuProps}) => {
  
  const contextMenuRef = useRef<HTMLDivElement>(null)
  const {setMessageToEdit, closeContextMenu, contextMenuItems:{x, y, messageReference}} = contextMenuProps
  
  useClickOutside(contextMenuRef,closeContextMenu)

  const handleEditMessage = () => {
    setMessageToEdit(messageReference)
  }

  return (
    <div 
      ref={contextMenuRef}
      style={{top:`${y}px`, left:`${x}px`, position:"absolute"}}
    >
      <div onClick={handleEditMessage}>
        Editar
      </div>
      <div>
        Eliminar
      </div>
    </div>
  )
}

export default MessageContextMenu