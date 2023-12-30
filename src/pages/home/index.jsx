import React, { useEffect, useState } from 'react';
import { getAllProducts ,getProductsByCategoryId } from '../../api';
import { ProductCard } from '../../components/productCard/index';
import { useNavigate } from 'react-router-dom';
import ProductSlider from '../../components/corousel';
function Home() {
  const [products, setProducts] = useState([])
  const [products2, setProducts2] = useState([])

  const navigate =useNavigate()
  
  useEffect(() => {
    getProductsByCategoryId(9)
      .then((result2) => {
        setProducts2(result2?.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getAllProducts()
      .then((result) => {
        setProducts(result?.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  
    
  }, []);



  return (
  
    <div className='flex flex-col m-5'>
{/* vitrinnnnnnn  */}
        <div className='w-4/6 sm:w-full my-10 text-center mx-auto'>
          <ProductSlider productList={products.filter(product => product.isActive === true)} name='Vitrine Özel'/>
        </div>
{/* kategory */}
        <div className='w-4/6 sm:w-full my-10 text-center mx-auto'>
          <ProductSlider productList={products2} head="Akıllı Telefonlar" />
        </div>
        <div className='w-4/6 sm:w-full my-10 text-center mx-auto'>
          <ProductSlider productList={products2} head="Beyaz Eşyalar" />
        </div>
{/* tüm ürünler */}
        <div className='flex justify-center'>
          <div className='grid w-3/4 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 gap-5 md:grid-cols-3 sm:grid-cols-2 sm:w-full'>
            {products.map((product, index) => (
              <ProductCard 
                key={index}
                productID={product.id} 
                title={product.name}
                likedProducts={[]}
                image={product.filE_URL_1}
                price={product.price}
                information={product.description}
                isActive={product.isActive}
                onClick={() => { navigate(`/products/${product.id}`); console.log(product.filE_URL_1) }}
              />
            ))}
          </div>
        </div>
     
    </div>
)}

export default Home
