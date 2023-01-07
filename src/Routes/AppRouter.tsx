import { useContext, useEffect, useState } from 'react'

import {  Routes, 
        BrowserRouter as Router, 
        Route,
        Navigate
    } from 'react-router-dom'

import AuthRouter from './AuthRouter'
import ChatPage from '../pages/Chat/ChatPage'

import { AuthContext } from '../context/context'
import { AuthContextActions } from '../types/types'
import Navbar from '../shared/components/Navbar'

const AppRouter = ()=> {

    const { AuthState, AuthDispatch } = useContext(AuthContext)
    const [ isAuthChecked, setIsAuthChecked ] = useState<boolean>(false)

    useEffect(() => {
        let activeUser = JSON.parse(window.localStorage.getItem("userToken") as string)

        if(activeUser)
            AuthDispatch({type: AuthContextActions.LOGIN, payload:{...activeUser}})

        setIsAuthChecked(true)

    }, [AuthState.logged])

    if(!isAuthChecked) return <p className='text-center'>Cargando...</p>

    return(
        <Router>
            { AuthState.logged && <Navbar /> }
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to={'app/chat'} />}
                />
                
                <Route 
                    path='app/authentication/*' 
                    element={!AuthState.logged ? <AuthRouter /> : <Navigate to={'/app/chat'} />} 
                />
                
                <Route 
                    path='app/chat' 
                    element={AuthState.logged ? <ChatPage /> :  <Navigate to={'/app/authentication/login'} /> } 
                />
            </Routes>
        </Router>
    )
}

export default AppRouter