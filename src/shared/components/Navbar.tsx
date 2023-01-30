import React, { useContext } from 'react'
import { AuthContext, ChatUtilitiesContext } from '../../context/context'
import { AuthContextActions, ChatUIState } from '../../types/types'

import noProfile from '../../assets/noprofile.png'
import logout from '../../assets/logout.png'

const Navbar = () => {
  
  const { AuthState:{userName, profilePic}, AuthDispatch } = useContext(AuthContext)
  const { setChatContainerState } = useContext(ChatUtilitiesContext)

  const onAccount = () => {
    document.getElementById("account")?.classList.toggle("none")
  }

  const handleLogout = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.localStorage.removeItem("userToken")
    AuthDispatch({type:AuthContextActions.LOGOUT})
  } 

  return (
    
    <nav className='Nav_container'>
      
      <div className='Nav_items p-1'>
        <h3 className='title3 text-dark'> Chat App </h3>

        <div className='Nav_item pointer' onClick={onAccount}>
          <img src={profilePic ? profilePic : noProfile} 
            className="img_banner" 
            alt="Profile Picture" 
            title='Profile Picture' 
          />
        </div>

        <div id='account' className='none Nav_toggle py-1'>
            <div className='Nav_item px-1'>
              <img src={profilePic ? profilePic : noProfile}
                   className="img_banner" 
                   alt="Profile Picture" 
                   title='Profile Picture' 
                />
              <p className='ml-1'>{userName}</p>
            </div>

            <button onClick={handleLogout} className='btn Nav_item px-1 Nav_hover-item pointer w-full mt-1 py-1'>
            <img src={logout} alt="" />
              <p className='ml-1'>Sign Out</p> 
            </button>
        </div>
      </div>

      <div className='chat-state'>
        <span>
            <button className='btn text-dark pointer p-2 normalP Nav_hover-item' onClick={()=>setChatContainerState(ChatUIState.ChatList)}>
              Your Chats
            </button>
        </span>
        <span>
            <button className='btn text-dark pointer p-2 normalP Nav_hover-item' onClick={()=>setChatContainerState(ChatUIState.UsersSearch)}>
              Users Search
            </button>
        </span>
      </div>
    </nav>
  )
}

export default Navbar