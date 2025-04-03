import React from 'react'
import logoImg from "../assets/SornerLogo.png"

export default function Navbar({setToken}) {
  return (
    <div className='bg-black flex items-center p-[20px] justify-between'>
        <img className='w-[70px]' src={logoImg} alt=''/>
        <button onClick={()=>setToken("")} className='bg-white w-[80px] text-2xl rounded-[5px] p-[5px]'>Logout</button>
    </div>
  )
}
