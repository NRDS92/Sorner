import React, { useContext, useEffect, useState } from 'react'

import {SornerContext} from "../context/SornerContext"
import ProductItem from "../components/ProductItem"


export default function relatedProducts({category, subCategory}) {

    const {products} = useContext(SornerContext)
    const [related, setRelated] = useState([])

    useEffect(()=>{
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=> category === item.category)
            productsCopy = productsCopy.filter((item)=> subCategory === item.subCategory)

            setRelated(productsCopy.slice(3,6))
        }

        
    },[products])

    

    
     
  return (
    <div className=' text-white p-[30px] flex flex-col items-center place-content-center gap-6'>
        <h2 className='text-5xl'>Esto te va a interesar</h2>
        <div className='w-screen grid grid-cols-3 '>
            {related.map((item,index)=>(
                        <ProductItem  
                            key={index}
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))}

        </div>
        
      
    </div>
  )
}
