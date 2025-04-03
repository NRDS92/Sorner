import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

export default function Add({token}) {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName]= useState("")
  const [description, setDescription]= useState("")
  const [price, setPrice]= useState("")
  const [category, setCategory]= useState("Camiseta")
  const [subCategory, setSubCategory]= useState("Topwear")
  const [bestseller, setBeseller] = useState(false)
  const [sizes,setSizes] = useState([])

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
      try {
        const formData = new FormData()
        formData.append("name",name)
        formData.append("description",description)
        formData.append("price",price)
        formData.append("category",category)
        formData.append("subCategory",subCategory)
        formData.append("bestseller",bestseller)
        formData.append("sizes",JSON.stringify(sizes))
        image1 && formData.append("image1",image1)
        image2 && formData.append("image2",image2)
        image3 && formData.append("image3",image3)
        image4 && formData.append("image4",image4)

        const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})
        if(response.data.success){
          toast.success(response.data.message)
          setName("")
          setDescription("")
          setPrice("")
          setImage2(false)
          setImage1(false)
          setImage3(false)
          setImage4(false)
        }else{
          toast.error(response.data.message)
        }

      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }


  return (
    <form onSubmit={onSubmitHandler} className="text-white  pt-[10px] flex place-content-center flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-[30px] place-content-center">
        <p className="text-3xl">Subir imagen</p>
        <div className="grid grid-cols-2 md:flex items-center place-content-center gap-5">
          <label htmlFor="image1" className="cursor-pointer bg-white rounded-md ">
            {!image1? <i className="fa-solid fa-cloud-arrow-up text-[60px] text-black p-5"></i>:
              <img className="w-[100px] h-[100px] object-cover" src={URL.createObjectURL(image1)} alt="product"/>
            }
            <input onChange={(e)=>setImage1(e.target.files[0])} className="hidden" type="file" id="image1" />
          </label>
          <label htmlFor="image2" className="cursor-pointer bg-white rounded-md">
            {!image2? <i className="fa-solid fa-cloud-arrow-up text-[60px] text-black p-5"></i>:
              <img className="w-[100px] h-[100px] object-cover" src={URL.createObjectURL(image2)} alt="product"/>
            }
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" className="hidden" />
          </label>
          <label htmlFor="image3" className="cursor-pointer bg-white rounded-md " >
            {!image3 ? <i className="fa-solid fa-cloud-arrow-up text-[60px] text-black p-5"></i>:
              <img className="w-[100px] h-[100px] object-cover" src={URL.createObjectURL(image3)} alt="product"/>
            }
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" className="hidden" />
          </label>
          <label  htmlFor="image4" className="cursor-pointer bg-white rounded-md " >
            {!image4 ? <i className="fa-solid fa-cloud-arrow-up text-[60px] text-black p-5"></i>:
              <img className="w-[100px] h-[100px] object-cover" src={URL.createObjectURL(image4)} alt="product"/>
            }
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" className="hidden" />
          </label>
        </div>
      </div>
      <div className="flex flex-col items-center place-content-center">
        <div className="w-full mt-5 text-2xl flex flex-col items-center">
          <p>Nombre del Producto</p>
          <input
          onChange={(e)=>setName(e.target.value)} value={name}
            className="w-full max-w-[500px] py-2"
            type="text"
            placeholder="Type here..."
            required
          />
        </div>
        <div className="w-full mt-5 text-2xl flex flex-col items-center">
          <p>Descripcion</p>
          <textarea
            onChange={(e)=>setDescription(e.target.value)} value={description}
            className="w-full max-w-[500px] py-2"
            type="text"
            placeholder="Type here..."
            required
          />
        </div>
        <div className="flex text-2xl gap-x-[15px] mt-[15px]">
          <div className="">
            <p>Categoria</p>
            <select className="" onChange={(e)=>setCategory(e.target.value)}>
              <option className="text-black" value="Camisetas">
                Camisetas
              </option>
              <option className="text-black" value="Accesorios">
                Accesorios
              </option>
            </select>
          </div>
          <div >
            <p>Subcategoria</p>
            <select className="" onChange={(e)=>setSubCategory(e.target.value)}>
              <option className="text-black" value="TopWear">
                TopWear
              </option>
              <option className="text-black" value="Bottomwear">
                Bottomwear
              </option>
              <option className="text-black" value="Winter">
                Winter
              </option>
            </select>
          </div>
          <div>
            <p>Price</p>
            <input type="number" placeholder="25000" onChange={(e)=>setPrice(e.target.value)}  value={price}/>
          </div>
        </div>
        <div className="mt-[20px] flex flex-col items-center">
          <p className="text-2xl">Talla de producto</p>
          <div className="flex gap-3 pt-[10px] text-xl">
            <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S"):[...prev,"S"])}>
              <p className={`${sizes.includes("S")? "bg-[#C40F0F] text-White":"bg-white text-black"} cursor-pointer p-3`}>S</p>
            </div>
            <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M"):[...prev,"M"])}>
              <p className={`${sizes.includes("M")? "bg-[#C40F0F] text-White":"bg-white text-black"} cursor-pointer p-3`}>M</p>
            </div>
            <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L"):[...prev,"L"])}>
              <p className={`${sizes.includes("L")? "bg-[#C40F0F] text-White":"bg-white text-black"} cursor-pointer p-3`}>L</p>
            </div>
            <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL"):[...prev,"XL"])}>
              <p className={`${sizes.includes("XL")? "bg-[#C40F0F] text-White":"bg-white text-black"} cursor-pointer p-3`}>XL</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex place-content-center mt-[30px] gap-[10px] text-2xl">
        <input onChange={()=> setBeseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller"/>
        <label htmlFor="bestseller">Añadir a los Bestsellers</label>
      </div>
      <button type="submit" className="w-[220px] h-[40px] text-2xl mt-[40px] text-[#C40F0F] bg-white hover:bg-black hover:text-white hover:border-2 " >Anadir Producto</button>
    </form>
  );
}
