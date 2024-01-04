import React, { useEffect, useState } from 'react';
import Spin from '../spin/index'
import { getAllBrand } from '../../api';
import errorMessage from '../../helper/toasts/errorMessage';
function Cart() {
  const [brands, setBrands] = useState([])
  
  useEffect(() => {
    getAllBrand()
    .then((result)=>{
      setBrands(result?.data.data)
      console.log(brands)
    })
    .catch((error)=>{
      console.log(error);
      errorMessage("Bir hata oluştu")

    })
    
  }, []);


  return (
  
    <div className='flex justify-center'>
          <Spin/>
      </div>
)}

export default Cart
