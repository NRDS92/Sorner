import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { SornerContext } from '../context/SornerContext'
import { toast } from 'react-toastify'

export default function Login() {
    const {token, setToken, navigate, backendUrl} =  useContext(SornerContext)
    const [currentState, setCurrentState] = useState("Login")
    const [name ,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHandler = async (event) =>{
      event.preventDefault();
      
      try {
        if(currentState === "Sign up"){
          const response = await axios.post(backendUrl + "/api/user/register",{name,email,password})
          if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
          }else{

            toast.error(response.data.message)
          }
        }else{
          const response = await axios.post(backendUrl + "/api/user/login",{email,password})
          if(response.data.success){
            
            setToken(response.data.token);
            localStorage.setItem("token",response.data.message)
          }else{

            toast.error(response.data.message)
          }
          
        }
      } catch (error) {
        console.log(error)
        
        toast.error(error.message)
      }
      
    }

    useEffect(()=>{
      if(token){
        navigate("/")
      }
    },[token])

  return (
    <form onSubmit={onSubmitHandler} className='h-full w-screen flex flex-col bg-black items-center py-[70px] gap-[30px]'>
      <div>
        <p className='text-white text-5xl'>{currentState}</p>
      </div>
      <div className='flex flex-col gap-5 text-2xl items-center'>
        {currentState === "Login"?"":
          <input type='text' className='bg-white w-[320px] text-center h-[40px] rounded-[5px]' onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name' required/>
        }
          <input type='email' className='bg-white w-[320px] text-center h-[40px] rounded-[5px]' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email' required/>
          <input type='password' className='bg-white w-[320px] text-center h-[40px] rounded-[5px]' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Password' required/>
        </div>
        <div className='text-white text-2xl p-5 flex flex-col gap-5 items-center'>
          <p>¿Olvidaste tu contraseña?</p>
          {currentState === "Login"?
            <p onClick={()=>setCurrentState("Sign up")}>Crear una Cuenta <i className="fa-solid fa-arrow-right-to-bracket"></i></p>
            :<p className=' cursor-pointer' onClick={()=>setCurrentState("Login")}>Ya tengo una cuenta <i className="fa-solid fa-arrow-right-to-bracket"></i></p>
          
          }
        </div>
          <button type='submit' className='text-white w-[220px] text-2xl h-[40px] bg-[#C40F0F] rounded-[5px] cursor-pointer'>{currentState === "Login"? "Ingresar" :"Sign up"}</button>
    </form>
  )
}
