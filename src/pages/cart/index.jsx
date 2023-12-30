import React, { useEffect, useState } from 'react';
import { getAllProducts ,getProductsByCategoryId } from '../../api';
import { ProductCard } from '../../components/productCard/index';
import { useNavigate } from 'react-router-dom';
import ProductSlider from '../../components/corousel';
function Cart() {
  const [products2, setProducts2] = useState([])
  
  useEffect(() => {
    getProductsByCategoryId(2)
      .then((result2) => {
        setProducts2(result2?.data.data);
        console.log(products2)
      })
      .catch((error) => {
        console.log(error);
      });
    
  }, []);

  console.log('Rendered products:', products2);

  return (
  
    <div className='w-4/6 sm:w-full my-10 text-center mx-auto'>
          <ProductSlider productList={products2} head="Akıllı Telefonlar" />
        </div>
)}

export default Cart
