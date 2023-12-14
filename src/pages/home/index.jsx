import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../api';
import { ProductCard } from '../../components/productCard/index';
import { useNavigate } from 'react-router-dom';
function Home() {
  const [products, setProducts] = useState([])
  const navigate =useNavigate()
  
  useEffect(() => {
    getAllProducts()
    .then((result)=>{
        setProducts(result?.data.data)
        console.log(products)
    })
    .catch((error)=>{
        console.log(error)

    })
},[])

  return (
   
    <div className=' flex justify-center'>
        <div className='grid w-3/4 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 gap-5 md:grid-cols-3 sm:grid-cols-2  '>
          {products.map((products,index)=>(
            <ProductCard 
              key={index}
              productID={products.id} 
              title={products.name}
              likedProducts={[]}
              price={products.price}
              category={products.categoryId}
              information={products.description}
              isActive={products.isActive}
              onClick={()=>{navigate(`/products/${products.id}`)}}/>

          ))}
        </div>
    </div>
)}

export default Home
