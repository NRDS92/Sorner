import React, { useContext, useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { SornerContext } from '../context/SornerContext'
import ProductItem from './ProductItem'



export default function NewArrivals() {

  const {products} = useContext(SornerContext)
  const [newArrivals, setNewArrivals] = useState([])


  useEffect(()=>{
    setNewArrivals(products.slice(0,6))
  },[products])



  
  return (
    <div className=' flex flex-col bg-black text-white place-content-center p-[20px] w-screen items-center'>
      <div className='text-5xl text-center py-[30px]'>
        <h2>Nueva Colección</h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-5 mx-10  '>
        {
          newArrivals.map((item, index)=>(
            <ProductItem  
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        }

      </div>
      
        <Link to={"/allCollections"} className='bg-white text-black w-[220px] h-[40px] my-[30px] cursor-pointer flex items-center place-content-center  '>Ver Más</Link>
      

      
    </div>
  )
}
