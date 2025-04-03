import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

import { SornerContext } from '../context/SornerContext'



export default function ProductItem({image,name,price,id}) {
    const {currency} = useContext(SornerContext)


  return (
    <Link to={`/product/${id}`}
    className={` flex flex-col items-center text-white  `}> 
            <motion.img 
            whileHover={{rotate:3}}
            transition={{type: "spring" , stiffness:400}}
            className=' w-[80%] h-[400px] full object-cover hover:scale-[1.1]' src={image[0]} alt={name}/>
        <div className='flex flex-col items-center pt-3'>
            <p  className='text-xl py-2'>{name}</p>
            <p className='text-black bg-white w-15 text-center'>{price} {currency}</p>
        </div>
      
    </Link>
  )
}
