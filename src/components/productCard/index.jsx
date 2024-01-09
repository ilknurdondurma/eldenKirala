import Button from "../button";
import PropTypes from "prop-types"
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { MdFavoriteBorder,MdDelete} from "react-icons/md";
import { addFavorite, deleteFavorite } from "../../api";
import { useAuth } from "../../context/authContext/authContext";
import errorMessage from "../../helper/toasts/errorMessage";
import succesMessage from "../../helper/toasts/successMessage";

export function ProductCard ({product,icon="favorite",route ,className ,...props}){
  const {user}=useAuth();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser ? storedUser.id : null;

  function renderStars(starCount) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const isYellow = i < starCount;

      stars.push(
        <span key={i} className={isYellow ? "text-yellow-500" : "text-gray-400"}>
          ★
        </span>
      );
    }
    return stars;
  }
 const handleDelete=(deletedProduct)=>{
      console.log("delete")
      deleteFavorite(deletedProduct)
        .then(data => {
          console.log(data);
          if (data.data.message) {
            succesMessage(data.data.message);
            window.location.reload();
          }
          else if (data.data.error){
            errorMessage(data.data.error);

          }

          
        })
        .catch(error => {
          console.error("Error:", error);
          errorMessage(error.response ? error.response.data.error : "An unexpected error occurred");
        });
    }
const handleFavorite=(favoritedProduct)=>{
      console.log("favorite")
      if(!userId){console.log("kullanıcı idsi bulunamadı.")}
      var productObject={
        "userId":userId,
        "productId":favoritedProduct
      }
      addFavorite(productObject)
        .then(data => {
          console.log(data);
          if (data.data.message) {
            succesMessage(data.data.message);
          }
          else if (data.data.error){
            succesMessage(data.data.error);

          }

          
        })
        .catch(error => {
          console.error("Error:", error);
          errorMessage(error.response ? error.response.data.error : "An unexpected error occurred");
        });
 }
  
    return(
        <div className="hover:shadow-xl rounded-xl border-4 bg-white  py-5 flex flex-col justify-between 2xl:text-md xl:text-md lg:text-md md:text-sm sm:text-xs 2xl:h-lg xl:h-lg lg:h-lg md:h-md sm:h-sm">
            <span className="baslik flex justify-end text-sm mx-5 py-1 ">
              <Button variant="TransparentButton">
                {icon==="delete" ?<MdDelete size="20px" onClick={() => handleDelete(product?.id)}  />: <MdFavoriteBorder size="20px"onClick={() => handleFavorite(product?.id)}/>}
              </Button>
            </span>

            {/* içerik */}
            
            <div className="icerik">
              <Link to={`${route}`} >
                  <span className="flex justify-center h-52 w-full px-1" ><img src={`data:image/jpeg;base64,${product?.filE_URL_1}`} alt={product?.name} className="object-contain w-full h-full m-2 rounded-xl" /></span>
                  <h5 className=  "flex justify-center p-2 "> <span className={`overflow-hidden line-clamp-1 ${product?.name > 100 ? 'max-h-32' : 'max-h-20'}`}>{product?.name}</span></h5>
                  <div className="flex flex-col justify-center">
                      <span className="px-1 self-center">
                          {renderStars(product?.rating/2)}
                          <span className={`p-1 px-2 self-center text-sm`}>({product?.commentCount}) </span>
                        </span>
                      <div className={`font-bold text-sm self-center ${product?.isActive ? 'text-secondary' : 'text-red-800'}`}>{product?.price} TL  /  MONTH</div>
                  </div>
                  <div className= "flex justify-center text-center py-2">
                      
                  </div>
                  <span className="flex justify-center 2xl:text-md xl:text-md lg:text-md md:text-sm sm:text-xs">
                  <Button 
                      variant="PurpleOutline"
                      size="small"
                      className={`font-bold font-sans italic rounded-2xl ${product?.isActive ? '' :'border border-red-400'} `}
                      disabled={product?.isActive===false}
                    >
                      {product?.isActive ? "Şimdi Kirala" : "Ürünü Ayırt"}
                  </Button>
                  </span>
                </Link>
            </div>
            
        </div>
    )
}

