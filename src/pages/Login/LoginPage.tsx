import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useFetchData } from '../../hooks/useFetchData'

const LoginPage = () => {

  const [ formValues, handleInputChanges ] = useForm({
    user : "",
    password: ""
  })

  // React query mutation to handle login

  const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault()

    if(!formValues.user || !formValues.password) {
      Swal.fire("Missing Data", "Please, fill the inputs", "error")
      return
    }
  }

  return (
    <div className='Form_container'>
      <form className='Form_box py-2'>
        
        <h1 className='title2'>
          Sign In to chat!
          </h1>
        
        <input 
          type="text" 
          name="user" 
          value={formValues.user} 
          onChange={handleInputChanges}
          placeholder="Your User Name"
          className='Form_input px-1 py-2'
        />
        
        <input 
          type="password" 
          name="password" 
          value={formValues.password} 
          onChange={handleInputChanges}
          placeholder="Your Password"
          className='Form_input px-1 py-2'
        />

        <button type='submit' className='btn btn-primary mt-2 pointer' onClick={handleSubmit}>
          Sign In
        </button>

        <small className='mt-3'>Don't have an account? 
          <Link to="/app/authentication/register"> Register Here</Link>
        </small>

      </form>
    </div>
  )
}

export default LoginPage