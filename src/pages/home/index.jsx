import React, { useEffect, useState } from 'react';
import { getAllBrand, getAllProducts ,getProductsByCategoryId } from '../../api';
import { ProductCard } from '../../components/productCard/index';
import { Link, useParams } from 'react-router-dom';
import ProductSlider from '../../components/corousel';
import errorMessage from '../../helper/toasts/errorMessage';
import { ToastContainer } from 'react-toastify';
import SpinCarousel from '../../components/corousel/spin';
import Spin from '../spin';
import { useAuth } from '../../context/authContext/authContext';
function Home() {
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])


  const { id } = useParams();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser ? storedUser.id : null;
    window.scrollTo(0, 0);
    getAllBrand()
      .then((result)=>{
        setBrands(result?.data.data)
      })
      .catch((error)=>{
        console.log(error);
        errorMessage("Bir hata oluştu")

      })
    
    getAllProducts(userId)
      .then((result) => {
        setProducts(result?.data.data);
        console.log(result?.data.data)
      })
      .catch((error) => {
        console.log(error);
        errorMessage("Bir hata oluştu")
      });
  
    
  }, []);

 

  return (
    <>
      <ToastContainer/>
      <div className='flex flex-col m-5 '>
       
            
              {/* marka carosueli */}
              <SpinCarousel itemList={brands}/>
              {/* vitrinnnnnnn  */}
              <div className='w-3/4 sm:w-full mb-10 text-center mx-auto'>
                <ProductSlider productList={products.filter(product => product?.isActive === true)} name='Vitrine Özel'/>
              </div>   
              {/* tüm ürünler */}
              <div className='flex justify-center'>
                
                  <div className='grid w-3/4 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 gap-5 md:grid-cols-3 sm:grid-cols-2 sm:w-full'>
                    {products.map((product) => (
                        <ProductCard 
                          key={product?.productId}
                          product={product}
                          route={`/product/${product?.productId}`}
                        />
                    ))}
                  </div>
                  
                    
                 
              </div>
        
      </div>
    </>
  );
}

export default Home
