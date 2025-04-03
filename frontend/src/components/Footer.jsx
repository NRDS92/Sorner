import React from 'react'

import SornerName from "../assets/sornerNameLogo.png"

export default function Footer() {
  return (
    <div className='flex  items-center w-screen h-[200px] p-[30px] bg-black text-white place-content-center'>
        <img className='w-[40%] p-5' src={SornerName} alt='Sorner' />
        <div className=' w-full'>
            <ul className='text-xl text-center'>
                <li><a ><i className="fa-brands fa-instagram"></i></a></li>
                <li><a ><i className="fa-brands fa-behance"></i></a></li>
                <li><a ><i className="fa-brands fa-vimeo-v"></i></a></li>
            </ul>
        </div>
        
      
    </div>
  )
}
