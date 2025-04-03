import React, { useContext, useEffect, useState } from 'react'
import { SornerContext } from '../context/SornerContext'
import CartTotal from '../components/CartTotal';

export default function Cart() {
    const {products, currency,cartItems,deliveryFee,getCartAmount,updateQuantity,navigate} = useContext(SornerContext);

    const [cartData, setCartData] = useState([])

    useEffect(()=>{
        
        if (products.length > 0) {
          const tempData = [];
            for(const items in cartItems){
                for(const item in cartItems[items]){
                    if(cartItems[items][item] > 0){
                        tempData.push({
                            _id:items,
                            size:item,
                            quantity: cartItems[items][item]
                        })
                    }
                }
            }
            
            setCartData(tempData)
        }
        
    },[cartItems,products])


  return (
    <div className='gap-15 flex flex-col bg-black text-white h-full w-screen text-7xl uppercase items-center place-content-center py-[30px]'>
        Carrito de compra
      <div className='flex flex-col h-full  '>
        {cartData.map((item,index)=>{
            const productData = products.find((product)=>product._id === item._id)
            return(
            <div className=' grid grid-cols-5 px-[50px] gap-x-[40px] mx-[50px] py-[20px] border-b-2 border-white place-content-center items-center' key={index}>
                <img className=' w-[200px]  h-[200px] object-cover' src={productData.image[1]}/>
                <div className='flex flex-col items-center gap-y-[20px] '>
                    <p className='text-3xl'>{productData.name}</p>
                    <p className='text-xl '>Talla: {item.size}</p>
                    
                </div>
                <p className='text-3xl'>$ {productData.price} {currency}</p>

                <input 
                onChange={(e)=>e.target.value === ""|| e.target.value === "0"? null : updateQuantity(item._id, item.size, Number(e.target.value)) }
                className='w-[120px] text-3xl bg-white text-black text-center' type='number' min={1} defaultValue={item.quantity} ></input>
                
                <button onClick={()=>updateQuantity(item._id, item.size,0)}><i className="text-4xl fa-solid fa-trash"></i></button>
            </div>
        )})}
      </div>
      <div className=''>
        <CartTotal/>
      </div>
      <button onClick={()=>navigate("/place-orders")} className='bg-[#C40F0F] cursor-pointer text-3xl w-[120px] h-[50px]' > PAGAR</button>
    </div>
  )
}
