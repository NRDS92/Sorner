import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import mercadoPago from "../assets/mercadoPago.png"
import paypal from "../assets/Paypal.png"
import { SornerContext } from '../context/SornerContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function PlaceOrders() {
  const {navigate,backendUrl, token, cartItems, setCartItems, getCartAmount, deliveryFee,products} = useContext(SornerContext)
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    ciudad:"",
    address:"",
    phone:""
  })


  const onChangeHandler = (event)=>{
    const name = event.target.name
    const value = event.target.value
    setFormData(data =>({...data,[name]:value}))
  }

  const onSubmitHandler = async (event)=>{
    event.preventDefault();
    try {
      let orderItems = []
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee
      }
      switch(paymentMethod){
        //api calls --- COD
        case "COD":
          const response = await axios.post(backendUrl + "/api/order/place", orderData,{headers:{token}})
          console.log(response.data)
            if(response.data.success){
              setCartItems({})
              navigate("/orders")
            }else{
              toast.error(response.data.message)
            }
          break;
        
          default:

          break;
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form  onSubmit={onSubmitHandler} className='bg-black text-white flex flex-col place-content-center items-center gap-[50px] w-screen h-full'>
      {/*left side*/}
      <div className='text-xl flex flex-col items-center gap-[25px] '>
        <div><p className='text-3xl'>Informacion de Entrega</p></div>
        <div>
          <FormInput name={'firstName'} type={'text'} placeholder={'First Name'} onChange={onChangeHandler}  value={formData.firstName}/>
          <FormInput name={'lastName'} type={'text'} placeholder={'Last Name'} onChange={onChangeHandler} value={formData.lastName}/>
        </div>
        <div>
          <FormInput name={'email'} type={'email'} placeholder={'Email'} onChange={onChangeHandler}  value={formData.email}/>
          <FormInput name={'ciudad'} type={'text'} placeholder={'Ciudad'} onChange={onChangeHandler}  value={formData.ciudad}/>
        </div>
        <div>
          <FormInput name={'address'} type={'text'} placeholder={'Direccion'} onChange={onChangeHandler} value={formData.address}/>
          <FormInput name={'phone'} type={'number'} placeholder={'Telefono'} onChange={onChangeHandler}  value={formData.phone}/>
        </div>
      </div>
      {/*Right side*/}
      <div className=' flex flex-col items-center'>
        <div className=' flex flex-col items-center py-[50px]'>
          <CartTotal />
        </div>
        <div className=' flex  items-center place-content-center gap-[10px]'>
          <div onClick={()=>setPaymentMethod("Mercado Pago")} className='flex cursor-pointer items-center'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "Mercado Pago" ? "bg-green-400":""}`}></p>
            <img className='w-[90px] h-[90px] object-cover' src={mercadoPago} alt='Mercado Pago'/>
          </div>
          <div className='flex cursor-pointer items-center' onClick={()=>setPaymentMethod("Paypal")}>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "Paypal" ? "bg-green-400":""}`}></p>
            <img className='w-[90px] h-[90px] object-cover' src={paypal} alt='Paypal'/>
          </div>
          <div className='flex cursor-pointer items-center gap-3 ' onClick={()=>setPaymentMethod("COD")}>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "COD" ? "bg-green-400":""}`}></p>
            <p>Pago en Entrega</p>
          </div>
        </div>
      </div>
      <button type='submit' className='bg-[#C40F0F] cursor-pointer text-3xl w-[220px] h-[50px]'>Confirmar el pago</button>
    </form>
  )
}


const FormInput = ({name,type,placeholder,onChange})=>{
  return(<input onChange={onChange} className='border border-gray-300 rounded py-1.5 px-3.5 ml-[30px]' 
      required 
      name={name} 
      type={type} 
      placeholder={placeholder}/>
    )
}