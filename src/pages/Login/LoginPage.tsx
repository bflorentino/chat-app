import React from 'react'
import { useForm } from '../../hooks/useForm'
import { useMutation, useQuery } from 'react-query'

const LoginPage = () => {
 
  const [ formValues, handleInputChanges ] = useForm({
    user : "",
    password: ""
  })

  return (
    <div>
      <form>
        
        <input 
          type="text" 
          name="user" 
          value={formValues.user} 
          onChange={handleInputChanges}
          placeholder="Your User Name"
        />
        
        <input 
          type="password" 
          name="password" 
          value={formValues.password} 
          onChange={handleInputChanges}
          placeholder="Your Password"  
        />

        <button type='submit'>
          Log In
        </button>
      
      </form>
    </div>
  )
}

export default LoginPage