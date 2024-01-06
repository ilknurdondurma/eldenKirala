// Detail.jsx
import React, { useEffect, useState } from 'react'; 
import {getProductsById } from '../../api';
import DetailCard from '../../components/detailCard/index';
import { useParams } from 'react-router-dom';
import Spin from '../spin';
import errorMessage from '../../helper/toasts/errorMessage';

function Detail() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductsById(id)
      .then((result) => {
        setProduct(result?.data.data);
        console.log(result?.data.data)
      })
      .catch((error) => {
        console.log(error);
        errorMessage("Bilinmeyen bir hata oluştu.")
      });
  }, [id]);

  return (
    <div className='flex justify-center flex-col m-5 '>
      {product 
      ? (
        <DetailCard product={product} />
      ) 

      : (
        <Spin/>
      )}
    </div>
  );
}

export default Detail;
