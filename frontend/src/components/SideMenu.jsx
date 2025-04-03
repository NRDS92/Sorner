import React, { useContext, useState } from 'react'
import { motion } from 'motion/react'
import {Link, NavLink} from "react-router-dom"
import { SornerContext } from '../context/SornerContext'

export default function SideMenu({setSideMenu}) {
    const {navigate,token,setToken,setCartItems} = useContext(SornerContext)

    const logout = ()=>{
        localStorage.removeItem("token")
        setToken("")
        setCartItems({})
        navigate("/login")
    }
  return (
    <div className='absolute top-[100px] bg-black w-[350px] h-[450px] text-white px-[10px] z-[99]'>
        <div  
         className='flex place-content-end' onClick={()=>setSideMenu(false)}>
            <motion.i  
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.95 }}
            className="fa-solid fa-square-xmark"></motion.i>
        </div>
        <div className='px-[10px] pt-[20px]'>
            <ul className='flex flex-col gap-5'>
                <LinkNav setSideMenu={setSideMenu} page={"/"} className=' '>Home</LinkNav>
                <LinkNav setSideMenu={setSideMenu}  page={"/about"} className=' '>Sobre Sorner</LinkNav>
                <LinkNav setSideMenu={setSideMenu} page={"/allCollections"} >Colecciones</LinkNav>
                {token ? <LinkNav setSideMenu={setSideMenu} page={"/orders"}>Orders</LinkNav>:null}
                <LinkNav setSideMenu={setSideMenu} page={"/Login"}>Iniciar Sesion</LinkNav>
                <p className="relative cursor-pointer h-fit w-fit text-white font-bold hover:text-[#C40F0F]" setSideMenu={setSideMenu} onClick={logout}>Salir</p>
                
            </ul>
        </div>
        
      
    </div>
  )
}

const LinkNav = ({children,page,setSideMenu})=>{
    const [open, setOpen] = useState(false)

    return(
        <NavLink to={page} >
            <motion.li 
                onHoverStart={()=>setOpen(true)}
                onHoverEnd={()=>setOpen(false)}
                onClick={()=>setSideMenu(false)}
            className='relative cursor-pointer h-fit w-fit text-white font-bold'>
                {children}
                <span
                    style={{transform: open ? "scaleX(1)":"scale(0)"}}
                className='absolute bottom-[-2px] bg-[#C40F0F] h-1 -left-2 -right-2 origin-center rounded-full transition-transform duration-300 ease-out'></span>
            </motion.li>
        </NavLink>
    )
    
}