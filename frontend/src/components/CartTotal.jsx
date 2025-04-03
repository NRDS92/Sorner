import React from 'react'
import { useContext } from 'react'
import { SornerContext } from "../context/SornerContext"

export default function CartTotal() {

    const {currency, deliveryFee, getCartAmount} = useContext(SornerContext)
  return (
    <div className='block text-center'>
        <div ><p className='text-5xl'>TOTAL A PAGAR</p></div>
        <div className='text-3xl w-[320px] mt-[20px] '>
        <p className=''>Envio:  <span> {deliveryFee}</span></p>
        <p>SubTotal:{getCartAmount()}</p>
        <p className=''>Total: <span>${getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee + ",00" } {currency}</span></p>
        </div>
    </div>
  )
}
