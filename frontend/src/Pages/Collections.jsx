import React, { useContext, useEffect,useState } from 'react'
import { SornerContext } from '../context/SornerContext'
import ProductItem from '../components/ProductItem'

export default function Collections() {

    const {products} = useContext(SornerContext);
    const [category, setCategory] = useState([])
    const [filterProducts, setFilterProducts] = useState([])
    const [sortType, setSortType] = useState([])

    function toggleCategory(e){
        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(item => item != e.target.value))
        }else{
            setCategory(prev => [...prev,e.target.value])
        }
    }

    function applyFilter(){
        let productsCopy = products.slice();

        if(category.length > 0){
            productsCopy = productsCopy.filter(item => category.includes(item.category))
        }
        setFilterProducts(productsCopy)

    }

    function sortProduct(){
         let fpCopy = filterProducts.slice();
        switch(sortType){
            case "low-high":
                setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)))
                break;
            case "high-low":
                setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)))
                break;
            default:
                applyFilter();
                break;
        }
    }

    useEffect(()=>{
        applyFilter()
    },[category,products])

    useEffect(()=>{
        sortProduct()
    },[sortType])


  return (
    <div className='flex  flex-col w-screen  bg-black place-content-center items-center'>
        <h3 className='text-5xl text-white py-[10px]'>Todas Las Colecciones</h3>
        <div className='flex py-[30px] '>
            {/* Category Filter */}
            <div className='text-white w-[300px] pl-[30px] text-2xl'>
                <p>Category</p>
                <div className='flex flex-col'>
                    <p className='flex gap-2'>
                        <input type='checkbox' value={"Camiseta"} onClick={toggleCategory}/> Camisetas
                    </p>
                    <p className='flex gap-2'>
                        <input type='checkbox' value={"Accesorios"} onClick={toggleCategory}/> Accesorios
                    </p>
                </div>
            </div>
            {/* Sorting Products by price */}
            <select onChange={(e)=> setSortType(e.target.value)} className='text-white text-2xl'>
                <option className='text-black' value="relevant">sort by: Relevant</option>
                <option className='text-black' value="low-high">sort by: Low to High</option>
                <option className='text-black' value="high-low">sort by: High to Low</option>
            </select>

        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6'>
                {filterProducts.map((item,index)=>(
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
