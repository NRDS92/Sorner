import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SornerContext } from '../context/SornerContext';

import RelatedProducts from '../components/relatedProducts';
import ErrorModal from '../components/ErrorModal';

export default function ProductDetail() {

    const {productId} = useParams();
    const {products,currency,addToCart,alert,setAlert,navigate} = useContext(SornerContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState("")
    const [size, setSize] = useState("")

    const fetchProductsData = async ()=>{
        products.map((item)=>{
            if (item._id === productId){
                setProductData(item)
                setImage(item.image[0])

                return null
            }
        })
    }
    
    

    useEffect(()=>{
        fetchProductsData()
    },[productId,products])


  return productData ? (
    <div className='bg-black w-screen h-full flex flex-col place-content-between items-center'>
        <div className='text-white flex flex-col md:flex-row w-screen  p-[30px] '>
        {/* Product Left side */}
            <div className='flex flex-col w-full gap-5 items-center  '>
                <div className='flex w-[400px] h-[450px] mb-3 place-content-center ' >
                    <img className='w-sreen h-full' src={image}></img>
                </div>
                <div className='flex gap-5 '>
                    {productData.image.map((item, index)=>(
                        <img className=' w-[100px] object-cover cursor-pointer' src={item} key={index} alt='Product'
                        onClick={()=>setImage(item)}
                        />

                    ))}
                
                </div>
            </div>
        {/* Product Rigth side */}
            <div className='flex flex-col items-center '>
                <div className='flex flex-col gap-4 p-[30px]'>
                    <p className='text-7xl text-[#C40F0F]'>{productData.name}</p>
                    <p className='text-xl text-justify '>{productData.description}</p>
                    <p className='text-3xl pt-[30px]' >{productData.price} {currency}</p>
                </div>
                
                <div className='flex flex-col items-center gap-7  '>
                    <div className='flex flex-col items-center'>
                        <p className='text-3xl'>Selecciona tu talla</p>
                        <div className={`flex border w-[320px] h-[50px] border-white gap-[20px] place-content-center ` } >
                            {productData.sizes.map((item,index)=>(
                            
                                <button onClick={()=>setSize(item)} key={index} className={`text-xl w-[25px] ${size === item ? "bg-[#C40F0F]": ""} cursor-pointer hover:bg-[#C40F0F]`}>{item}</button>
                            
                            ))}
                        </div>
                    </div>
                    
                    <button onClick={()=>addToCart(productData._id,size)} className='flex w-[320px] h-[50px] bg-[#C40F0F] gap-[20px] place-content-center items-center cursor-pointer text-white '>
                        Agregar al carrito
                    </button>
                    <button onClick={()=>navigate("/cart")} className='flex w-[320px] h-[50px] bg-white gap-[20px] place-content-center items-center cursor-pointer text-black'>
                        Continuar con el pago
                    </button>

                    
            </div>
                
            </div>
            {alert ? <ErrorModal setAlert={setAlert} text={"Seleccione una talla"}/> : null }
            
        </div>
    <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ): <div className='opacity-0'></div>
}
