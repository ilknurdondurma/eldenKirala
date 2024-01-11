import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FilterCard from '../../components/filterCard'
import {ProductCard }from'../../components/productCard'
import Spin from '../spin'
import errorMessage from '../../helper/toasts/errorMessage';
import { getProductsByCategoryId } from '../../api';
import { useMediaQuery } from 'react-responsive';
import FilterDropdown from '../../components/filterCard/filterDropdown';
function FilterByCategory() {
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' }); 

    useEffect(()=>{
        getProductsByCategoryId(id)
        .then((results)=>{
            setProducts(results?.data.data)
            console.log(products)
        })
        .catch((err)=>{
            errorMessage(err)

        })
    },[id])
  return (
    <div className=' m-5 '>
        <div className='grid md:grid-cols-6 grid-cols-5 sm:grid-cols-1'>
            <div className="md:col-span-2 col-span-1">{isSmallScreen ? <FilterDropdown /> : <FilterCard />}</div>
            <div className='md:col-span-4 col-span-4'>
            <p className='m-5'> İlgili kategori için {products.length} sonuç listeleniyor..</p>
                {products.length > 0 ? (
                  // ürünler
                  <div className='flex p-1 '>
                    <div className='grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 gap-5 md:grid-cols-3 sm:grid-cols-2 sm:w-full'>
                      {products.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          route={`/product/${product.id}`}
                          icon={"delete"}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className='flex justify-center mt-5'>LİSTELENECEK ÜRÜN BULUNAMADI.</div>
                )}
            </div>
        </div>
        </div>
  )
}

export default FilterByCategory
