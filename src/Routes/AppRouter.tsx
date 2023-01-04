import { useContext } from 'react'

import {  Routes, 
        BrowserRouter as Router, 
        Route,
        Navigate
    } from 'react-router-dom'

import AuthRouter from './AuthRouter'
import ChatPage from '../pages/Chat/ChatPage'

import { AuthContext } from '../context/context'

const AppRouter = ()=> {

    const { logged } = useContext(AuthContext).AuthState

    return(
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to={'app/chat'} />}
                />
                
                <Route 
                    path='app/authentication/*' 
                    element={!logged ? <AuthRouter /> : <Navigate to={'/app/chat'} />} 
                />

                <Route 
                    path='app/chat' 
                    element={logged ? <ChatPage /> :  <Navigate to={'/app/authentication/login'} /> } 
                />
            </Routes>
        </Router>
    )
}

export default AppRouter