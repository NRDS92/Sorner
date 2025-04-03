import React, { useContext, useEffect, useState } from 'react'
import { SornerContext } from '../context/SornerContext'
import axios from 'axios';

export default function Orders() {

    const {backendUrl, currency, token} = useContext(SornerContext)
    const [orderData, setOrderData] = useState([]);
    const  loadOrderData= async ()=>{
        try {
            if(!token){
                return null
            }
            const response =  await axios.post(backendUrl + "/api/order/userorders", {}, {headers:{token}} )
            if(response.data.success){
                let allOrdersItem = []
                response.data.orders.map((order)=>{
                    order.items.map((item)=>{
                        item["status"] = order.status
                        item["payment"] = order.payment
                        item["paymentMethod"] = order.paymentMethod
                        item["date"] = order.date
                        allOrdersItem.push(item)
                    })
                })
                setOrderData(allOrdersItem)
            }
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        loadOrderData()
    },[token])

    
     
  return (
    <div className='w-screen h-full  bg-black'>
        <div className='mx-[80px] '>
        {
            orderData.map((item, index)=>(
            <div key={index} className='py-4 border-t border-b text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt=""/>
                <div >
                    <p className='sm:text-base font-medium'>{item.name}</p>
                    <div className='flex items-center gap-3 mt-2 text-white'>
                    <p>{currency} {item.price}</p>
                    <p>quantity :{item.quantity}</p>
                    <p>Size: {item.size}</p>
                    </div>
                    <p className='mt-1'>Date: <span className='text-white'>{new Date(item.date).toDateString()}</span></p>
                    <p className='mt-1'>Payment: <span className='text-white'>{item.paymentMethod}</span></p>
                </div>
                </div>
                <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='texy-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                </div>
            </div>
            ))
        }
        </div>
    </div>
      

  )
}
