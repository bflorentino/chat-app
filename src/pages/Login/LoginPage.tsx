import React from 'react'
import { useForm } from '../../hooks/useForm'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useFetchData } from '../../hooks/useFetchData'
import { useLogin } from '../../hooks/useLogin'
import { Endpoint, RequestObject, RequestsType, AuthContextState } from '../../types/types'
import useObjectForReqest from '../../hooks/useObjectForRequest'

const LoginPage = () => {

  const fetcher = useFetchData()
  const history = useNavigate()
  const login   = useLogin()
  const objectForRequest = useObjectForReqest(Endpoint.login, RequestsType.get, false)

  const [ formValues, handleInputChanges ] = useForm({
    user : "",
    password: ""
  })

  // React query mutation to handle login
  const { mutate:loginUser } = useMutation(
    (object:RequestObject) => fetcher(object), 
    {
      onSuccess:(res) => {
        if(!res._success){
          Swal.fire("Error", res._message as string, "error")
          return
        }
        login(res._data as AuthContextState)
        history('/app/chat', {replace:true})
      },
      onError:() => {
        Swal.fire("Error", "Hubo un error de conexion al servidor", "error")
      }
    }
  )

  const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault()

    if(!formValues.user || !formValues.password) {
      Swal.fire("Missing Data", "Please, fill the inputs", "error")
      return
    }
    const requestToSend = {
          ...objectForRequest, 
          endpoint: `${objectForRequest.endpoint}/${formValues.user}/${formValues.password}` 
        }

    loginUser(requestToSend)
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