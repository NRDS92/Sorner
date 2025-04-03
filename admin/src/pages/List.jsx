import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl,currency } from '../App'
import { toast } from 'react-toastify'


export default function List({token}) {
  const [list,setList] = useState([])

  const fetchList = async ()=>{
      try{
        const response = await axios.get(backendUrl + "/api/product/list")

        if(response.data){
          setList(response.data.products)
        }else{
          toast.error(response.data.message)
        }
      }catch (error){
        console.log(error)
        toast.error(error.message)
      }
  }

  const removeProduct = async (id)=>{
    try {
      const response = await axios.post(backendUrl + "/api/product/remove",{id},{headers:{token}})
    if(response.data.success){
      toast.success(response.data.message)
      await fetchList();
    }else{
      toast.error(response.data.message)
    }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <>
      <p className=' text-center text-3xl pt-4 pb-6 mb-2'>Todos Los Productos</p>
      <div className='flex flex-col gap-2'>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr]'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>price</b>
          <b className='text-center'>Action</b>
        </div>
        {/* Product List */}
        {
          list.map((item,index)=>(
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-3 items-center text-xl'>
              <img className='w-[120px] h-[120px] object-cover' src={item.image[0]} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>$ {item.price} {currency}</p>
              <i onClick={()=>removeProduct(item._id)} className="fa-solid fa-trash text-center"></i>
              

            </div>
          ))
        }
      </div>
    </>
  )
}
