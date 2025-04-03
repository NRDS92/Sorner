import React from 'react'


export default function ErrorModal({text,setAlert}) {
    
  return (
    <div className='absolute z-[999] w-screen bg-black flex  flex-col items-center place-content-center h-[120px] top-[500px] '>
        <h1 className='text-7xl'>{text}</h1>

        <button className='bg-white text-black w-[220px] h-[50px]' onClick={()=>setAlert(false)}>Cerrar</button>
      
    </div>
  )
}
