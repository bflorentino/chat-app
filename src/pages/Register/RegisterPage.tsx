import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { validateRegisterForm } from '../../tools/validations/RegisterForm'
import { InputStatus } from '../../types/validationTypes'
import { useMutation } from 'react-query'
import { useFetchData } from '../../hooks/useFetchData'
import { AuthContextState, Endpoint, RequestObject } from '../../types/types'
import { RequestsType } from '../../types/types'
import { useLogin } from '../../hooks/useLogin'
import Swal from 'sweetalert2'
import useObjectForReqest from '../../hooks/useObjectForRequest'

const RegisterPage = () => {

  const fetcher = useFetchData()
  const history = useNavigate()
  const login   = useLogin()
  const objectForRequest = useObjectForReqest(Endpoint.Register, RequestsType.post, false)
  const [ profPic, setProfPic ] = useState<string | null>(null) 
  const [ readedProfPic, setReadedProfPic ] = useState<File | null>(null) 

  const inputFileHidden = useRef<HTMLInputElement>(null)

  const [ formValues, handleInputChanges ] = useForm({
    name: "",
    last_name:"",
    user_name:"",
    email:"",
    password:"",
    password2:"",
    phone:""
  })

  const [ errors, setErrors ] = useState<InputStatus[]>(
    [
      {name: "name",      message:null, touched:false},
      {name: "last_name", message:null, touched:false},
      {name: "user_name", message:null, touched:false},
      {name: "email",     message:null, touched:false},
      {name: "password",  message:null, touched:false},
      {name: "password2", message:null, touched:false},
      {name: "phone",     message:null, touched:true}
    ]
)

// Submit button will be disabled as long as there are remaining errors
const isDisabled:boolean = errors.filter(errorObject => errorObject.message || !errorObject.touched).length > 0

const { mutate: registerUser } = useMutation(
  (object:RequestObject) => fetcher(object),
  {
    onSuccess: (res) => {

      if(!res._success){
        Swal.fire("Error", res._message as string, "error")
        return
      }
        login(res._data as AuthContextState)
        history('/app/chat', {replace:true})
    },
    onError:  () => {
      Swal.fire("Error", "Hubo un error de conexion al servidor", "error")
    }
  }
)

const handleOnBlur = (e:React.FocusEvent<HTMLInputElement>) => {

  let validationResultMessage: string | null;

  // Only pass formValues.password if the checked input is "password2"
  validationResultMessage = validateRegisterForm(e.target as HTMLInputElement, e.target.name === "password2" && formValues.password)

  /*Check every error object to find the corresponding object to the 
  input and updates it with the result of the validation of the input element.*/
  setErrors(errors => errors.map(errorObject => errorObject.name === e.target.name
                                          ? {...errorObject, touched:true, message:validationResultMessage}
                                          : errorObject
  ))
}

 // IMAGE HANDLER
 const handleImage = (e:React.ChangeEvent<HTMLInputElement>) =>{
   
    console.log(e)

   if(!e.target.files) return

   const reader = new FileReader();
  
    reader.onload = () => {
      reader.readyState === 2 && setProfPic(reader.result as string)
    }

    reader.readAsDataURL(e.target.files[0]);
    setReadedProfPic(e.target.files[0])
  }

  const handleOpenFileSystem = () => {
    inputFileHidden.current?.click()
  }
    
  const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const dataToSend = new FormData()
    dataToSend.append("name", formValues.name)
    dataToSend.append("last_name", formValues.last_name)
    dataToSend.append("user_name", formValues.user_name)
    dataToSend.append("password", formValues.password)
    dataToSend.append("email", formValues.email)
    dataToSend.append("phone", formValues.phone)
    
    readedProfPic && dataToSend.append("profilePic", readedProfPic)

    const requestToSend:RequestObject = {...objectForRequest, body:dataToSend}
    registerUser(requestToSend)
  }

  return (
    <div className='Form_container styled-scroll'>
      <form className='Form_box py-2' encType="multipart/form-data">
      <h1 className='title2'>Sign up to chat!</h1>

        <input 
          type="text" 
          name="name"
          value={formValues.name}
          onChange={handleInputChanges}
          onBlur={handleOnBlur}
          placeholder="Write your Name"
          className={`Form_input px-1 py-2 ${errors[0].message && 'Form_inp-error'}`}
          autoComplete='off'
        />
        {
          errors[0].message && <small className='Form_text-error text-left'>{errors[0].message}</small>
        }
        
        <input 
          type="text" 
          name="last_name"
          value={formValues.last_name}
          onChange={handleInputChanges}
          onBlur={handleOnBlur}
          placeholder="Write your Last Name"
          className={`Form_input px-1 py-2 ${errors[1].message && 'Form_inp-error'}`}
          autoComplete='off'
        />
        {
          errors[1].message && <small className='Form_text-error text-left'>{errors[1].message}</small>
        }
        
        <input 
          type="text" 
          name="user_name" 
          value={formValues.user_name}
          onChange={handleInputChanges}
          onBlur={handleOnBlur}
          placeholder="Write you User Name"
          className={`Form_input px-1 py-2 ${errors[2].message && 'Form_inp-error'}`}
          autoComplete='off'
        />
        {
          errors[2].message && <small className='Form_text-error text-left'>{errors[2].message}</small>
        }
        
        <input 
          type="text" 
          name="email" 
          value={formValues.email}
          onChange={handleInputChanges}
          onBlur={handleOnBlur}
          placeholder="Write your Email"
          className={`Form_input px-1 py-2 ${errors[3].message && 'Form_inp-error'}`}
          autoComplete='off'
        />
        {
          errors[3].message && <small className='Form_text-error text-left'>{errors[3].message}</small>
        }
        
        <input 
          type="password" 
          name="password" 
          value={formValues.password}
          onChange={handleInputChanges}
          onBlur={handleOnBlur}
          placeholder="Write your password (min is 7 characters)"
          className={`Form_input px-1 py-2 ${errors[4].message && 'Form_inp-error'}`}
          autoComplete='off'
        />
        {
          errors[4].message && <small className='Form_text-error text-left'>{errors[4].message}</small>
        }

        <input 
          type="password" 
          name="password2" 
          value={formValues.password2}
          onChange={handleInputChanges}
          onBlur={handleOnBlur}
          placeholder="Write your password again"
          className={`Form_input px-1 py-2 ${errors[5].message && 'Form_inp-error'}`}
          autoComplete='off'
        />
        {
          errors[5].message && <small className='Form_text-error text-left'>{errors[5].message}</small>
        }
        
        <input 
          type="text" 
          name="phone" 
          value={formValues.phone}
          onChange={handleInputChanges}
          onBlur={handleOnBlur}
          placeholder="Write your phone number (optional)"
          className={`Form_input px-1 py-2 ${errors[6].message && 'Form_inp-error'}`}
          autoComplete='off'
        />
        {
          errors[6].message && <small className='Form_text-error text-left'>{errors[6].message}</small>
        }

        <div className='mt-2'>

           {profPic ? <img src={profPic} alt="" className='img_pick' /> : <div className='image-container' /> } 
           
           <input 
              type="file" 
              accept='image/*' 
              className='none' 
              onChange={handleImage} 
              ref={inputFileHidden} 
            />
            
          <label>
            <p onClick={handleOpenFileSystem} 
              className='pointer'
            >
              Seleccionar Foto
            </p> 
          </label>

        </div>

        <button 
          type='submit' className='btn btn-primary mt-3 pointer' 
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          Sign Up
        </button>

        <small className='mt-3'>Do you already have an account? 
          <Link to="/app/authentication/login"> Login</Link>
        </small>
      </form>
    </div>
  )
}

export default RegisterPage