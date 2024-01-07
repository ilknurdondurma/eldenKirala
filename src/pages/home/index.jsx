import React, { useEffect, useState } from 'react';
import { getAllBrand, getAllProducts ,getProductsByCategoryId } from '../../api';
import { ProductCard } from '../../components/productCard/index';
import { Link, useParams } from 'react-router-dom';
import ProductSlider from '../../components/corousel';
import errorMessage from '../../helper/toasts/errorMessage';
import { ToastContainer } from 'react-toastify';
import SpinCarousel from '../../components/corousel/spin';
import Spin from '../spin';
function Home() {
  const [products, setProducts] = useState([])
  const [products2, setProducts2] = useState([])
  const [brands, setBrands] = useState([])
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    getProductsByCategoryId(3) // categori idsi veriyoz ona gore urun veriyor
      .then((result2) => {
        setProducts2(result2?.data.data);
      })
      .catch((error) => {
        console.log(error);
        errorMessage("Bir hata oluştu")
      });

    getAllBrand()
      .then((result)=>{
        setBrands(result?.data.data)
      })
      .catch((error)=>{
        console.log(error);
        errorMessage("Bir hata oluştu")

      })
    
    getAllProducts()
      .then((result) => {
        setProducts(result?.data.data);
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
        {products && brands
         ? (
            <>
              {/* marka carosueli */}
              <SpinCarousel itemList={brands}/>
              {/* vitrinnnnnnn  */}
              <div className='w-3/4 sm:w-full mb-10 text-center mx-auto'>
                <ProductSlider productList={products.filter(product => product.isActive === true)} name='Vitrine Özel'/>
              </div>   
              {/* tüm ürünler */}
              <div className='flex justify-center'>
                <div className='grid w-3/4 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 gap-5 md:grid-cols-3 sm:grid-cols-2 sm:w-full'>
                  {products.map((product, index) => (
                      <ProductCard 
                        productID={product.id} 
                        title={product.name}
                        likedProducts={[]}
                        image={product.filE_URL_1 || product.filE_URL_2 || product.filE_URL_3 }
                        price={product.price}
                        information={product.description}
                        isActive={product.isActive}
                        onClick={() => { 
                          console.log(product.id)
                        }}
                      />
                  ))}
                </div>
              </div>
            </>
           ) 
        : (
          <Spin/>
        )}
      </div>
    </>
  );
}

export default Home
