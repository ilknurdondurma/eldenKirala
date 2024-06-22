// Detail.jsx
import React, { useEffect, useState } from 'react'; 
import {getCommentByProductId, getProductsById } from '../../api';
import DetailCard from '../../components/detailCard/index';
import { useParams } from 'react-router-dom';
import Spin from '../spin';
import errorMessage from '../../helper/toasts/errorMessage';
import CommentCard from '../../components/commentCard';
import { useAuth } from '../../context/authContext/authContext';

function Detail() {
  const [product, setProduct] = useState([]);
  const [comments, setComments] = useState([]);
  const {user}=useAuth();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const userId = user ? user.user.id : 0; // null kabul etmediğinden 0 veriyoruz

    getProductsById(id,userId)
      .then((result) => {
        setProduct(result?.data.data);
        console.log("products ")
        console.log(result?.data.data)
      })
      .catch((error) => {
        console.log(error);
        errorMessage("Bilinmeyen bir hata oluştu.")
      });


      getCommentByProductId(id)
      .then((result) => {
        setComments(result?.data.data);
        console.log("comments")
        console.log(result?.data.data)
      })
      .catch((error) => {
        console.log(error);
        errorMessage("Bilinmeyen bir hata oluştu.")
      });
  }, [id]);

  return (
    <div className='flex justify-center flex-col m-5 '>
      {product || comments
      ? (
        <>
        <DetailCard product={product} />
        <h1 className='flex justify-center mt-10 font-sans m-5 font-bold text-3xl'>ÜRÜN YORUMLARI</h1>
        <CommentCard comments={comments}/>
        </>
      ) 

      : (
        <Spin/>
      )}
    </div>
  );
}

export default Detail;
