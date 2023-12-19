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
        console.log("products:"+products)
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
              image={products.filE_URL_1}
              //image={products.filE_URL_2}
              //image={products.filE_URL_3}
              //image={products.filE_URL_4}

              //user={products.userId}
              //brand={products.brandId}
              //rating={products.rating}
              //status={products.status}
              //maxRentalPeriod={products.maxRentalPeriod}
              //minRentalPeriod={products.minRentalPeriod}


              price={products.price}
              information={products.description}
              isActive={products.isActive}
              onClick={()=>{navigate(`/products/${products.id}` );console.log(products.filE_URL_1)}}/>

          ))}
        </div>
    </div>
)}

export default Home
