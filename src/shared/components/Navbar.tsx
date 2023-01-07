import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/context'
import { AuthContextActions } from '../../types/types'

import noProfile from '../../assets/noprofile.png'
import logout from '../../assets/logout.png'

const Navbar = () => {
  
  const { AuthState, AuthDispatch } = useContext(AuthContext)

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
      <h3 className='title3 text-white  '> Chat App </h3>

      <ul className='Nav_items'>
        
        <div className='Nav_item pointer' onClick={onAccount}>
          <img src={noProfile} alt="Profile Picture" title='Profile Picture' />
          <p className='ml-1 text-white'>{AuthState.userName}</p>
        </div>

        <div id='account' className='none Nav_toggle py-1'>
          <div className='Nav_item px-1'>
            <img src={noProfile} alt="Profile Picture" title='Profile Picture' />
            <p className='ml-1'>{AuthState.userName}</p>
          </div>

          <button onClick={handleLogout} className='btn Nav_item px-1 Nav_hover-item pointer w-full mt-1 py-1'>
           <img src={logout} alt="" />
            <p className='ml-1'>Sign Out</p> 
          </button>

        </div>
      </ul>
    
    </nav>
  )
}

export default Navbar