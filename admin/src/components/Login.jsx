import React, { useState } from 'react'
import axios from "axios"


import logoImg from "../assets/SornerLogo.png"
import { backendUrl } from '../App'
import { toast } from 'react-toastify'




export default function Login({setToken}) {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const onSubmitHandler = async (e)=>{

        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + "/api/user/admin",{email,password})
            if(response.data.success){
                setToken(response.data.token)
            }else{
                toast.error(response.data.message)
            }

        } catch (error) {
            
        }
    }

  return (
    <div className='flex items-center place-content-center h-screen'>
      <div className='text-white shadow-md rounded-lg px-8 py-6 max-w-md flex flex-col items-center place-content-center'>
        <h1 className='text-4xl mb-4 text-center '>Panel de Administrador</h1>
        <img className='w-[50px]' src={logoImg} alt='logo'/>
        <form className='mt-[20px] ' onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p className='text-xl mb-2'>Correo</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-white outline-none' type='email' placeholder='your@email.com' required/>
            </div>
            <div className='mb-min-w-72'>
                <p className='text-xl mb-2'>Contraseña</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-white outline-none'  type='password' placeholder='Enter your password' required/>
            </div> 
            <button className='bg-white rounded-md text-black hover:bg-[#C40F0F] hover:text-white mt-10 h-[40px] w-[320px]'>Ingresar</button>
        </form>

      </div>
    </div>
  )
}
