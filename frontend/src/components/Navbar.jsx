import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState } from "react"

import {motion} from "motion/react"

import SornerLogo from "../assets/SornerLogo.png"
import { SornerContext } from '../context/SornerContext'
import SideMenu from "./SideMenu"

export default function Navbar() {
    const {getCartCount,token} = useContext(SornerContext)
    const [sideMenu, setSideMenu] = useState(false)
    
  return (
        <div className='bg-black flex w-screen h-[100px] top-0 px-[50px] text-white text-2xl items-center justify-between'>
        <motion.button onClick={()=>setSideMenu(true)} 
            whileHover={{color: "#C40F0F"}}
            className='cursor-pointer'>
            <i className=" fa-solid fa-bars"></i>
        </motion.button>
            {sideMenu ? <SideMenu setSideMenu={setSideMenu} /> : null}
        <Link to={"/"}>
            <img className='h-[70px]' alt='Sorner Logo' src={SornerLogo}></img>
        </Link>  
        {token?<Link to={"/cart"} className='cursor-pointer flex gap-5'>
            <i className=" fa-solid fa-cart-shopping"></i>
            <p>{getCartCount()}</p>
        </Link>:null}
        
        </div>
    )
}
