import React from 'react'
import { useForm } from '../../hooks/useForm'

const RegisterPage = () => {
  
  const [ formValues, handleInputChanges ] = useForm({
    name: "",
    last_name:"",
    user_name:"",
    email:"",
    password:"",
    password2:"",
    phone:""
  })

  return (
    <div>
      <form>

        <input 
          type="text" 
          name="name"
          value={formValues.name}
          onChange={handleInputChanges}
          placeholder="Write your Name"
        />
        
        <input 
          type="text" 
          name="last_name"
          value={formValues.last_name}
          onChange={handleInputChanges}
          placeholder="Write your Last Name" 
        />
        
        <input 
          type="text" 
          name="user_name" 
          value={formValues.user_name}
          onChange={handleInputChanges}
          placeholder="Write you User Name"
        />
        
        <input 
          type="password" 
          name="email" 
          value={formValues.email}
          onChange={handleInputChanges}
          placeholder="Write your Email"
        />
        
        <input 
          type="text" 
          name="password" 
          value={formValues.password}
          onChange={handleInputChanges}
          placeholder="Write your password (min is 7 characters)"
        />

        <input 
          type="text" 
          name="password" 
          value={formValues.password}
          onChange={handleInputChanges}
          placeholder="Write your password again"
        />
        
        <input 
          type="text" 
          name="phone" 
          value={formValues.phone}
          onChange={handleInputChanges}
          placeholder="Write your phone number (optional)"
        />

        <button type='submit'>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default RegisterPage