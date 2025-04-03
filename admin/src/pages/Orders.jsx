import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from "axios"
import {backendUrl, currency} from "../App"
import {toast} from "react-toastify"

export default function Orders({token}) {
  const [orders, setOrders] = useState([]);
  const fetchAllOrdes = async ()=>{
    if(!token){
      return null
    }
    try {
      const response = await axios.post(backendUrl + "/api/order/list",{}, {headers:{token}} )
      if(response.data.success){
        setOrders(response.data.orders)
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const statusHandler = async (event,orderId)=>{
    try {
      const response = await axios.post(backendUrl + "/api/order/status", {orderId, status:event.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrdes()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

   useEffect(()=>{
      fetchAllOrdes()
   },[token])
  return (
    <div className='flex flex-col items-center '>
      <h3 className='text-5xl py-5'>Todas las Ordenes</h3>
      <div className=''>
        {
          orders.map((order,index)=>(
            <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-200'>
            <i className=" text-center text-5xl fa-solid fa-shirt"></i>
              <div className='flex'>
                {
                  order.items.map((item, index)=>{
                    if(index === order.items.length - 1){
                      return <p className='text-2xl' key={index}>{item.name} X {item.quantity} <span>{item.size}</span></p>
                    }else{
                      return <p className='text-2xl' key={index}>{item.name} X {item.quantity} <span>{item.size}</span>,</p>
                    }
                  })
                }
              </div>
              <div className='flex flex-col'>
                <p>{order.address.firstName + " " + order.address.lastName}</p>
                <p>{order.address.address + ", "} {order.address.ciudad}</p>
                <p>{order.address.phone}</p>
              </div>
              <div className='flex flex-col'>
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done": "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p>{currency} {order.amount}</p>
              <select value={order.status}  onChange={(event)=>statusHandler(event,order._id)}>
                <option className='text-black' value="Order Placed">Order Placed</option>
                <option className='text-black' value="Packing">Packing</option>
                <option className='text-black' value="Shipped">Shipped</option>
                <option className='text-black' value="Out for Delivery">Out for Delivery</option>
                <option className='text-black' value="Entregado">Entregado</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}
