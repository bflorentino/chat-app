import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Login/LoginPage'
import RegisterPage from '../pages/Register/RegisterPage'

const AuthRouter = () => {
  return (
    <Routes>
        <Route 
          path='/login'
          element={<LoginPage />}  
        />

        <Route 
          path='/register'
          element={<RegisterPage />} 
        />
    </Routes>
  )
}

export default AuthRouter