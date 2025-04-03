import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideBar() {
    
  return (
    <div className='w-[18%] min-h-screen   '>
        <div className='flex flex-col pl-[20%] pt-6 text-2xl gap-y-[30px]'>
            <NavLink className=' w-[40px] h-[40px] rounded-2xl md:w-[210px]  bg-white flex items-center place-content-center gap-3' to={"/add"}>
                <i className="fa-solid fa-plus "></i>
                <p className='hidden md:block'>Agregar Item</p>
            </NavLink>
            <NavLink className=' w-[40px] h-[40px] rounded-2xl md:w-[210px] bg-white flex items-center place-content-center gap-3' to={"/list"}>
                <i className="fa-solid fa-shirt"></i>
                <p className='hidden md:block'>Ver productos</p>
            </NavLink>
            <NavLink className=' w-[40px] h-[40px] rounded-2xl md:w-[210px] bg-white flex items-center place-content-center gap-3' to={"/orders"}>
                <i className="fa-solid fa-truck-fast"></i>
                <p className='hidden md:block'>Ver las ordenes</p>
            </NavLink>
        </div>
    </div>
  )
}
