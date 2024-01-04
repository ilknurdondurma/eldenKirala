import Button from "../button";
import PropTypes from "prop-types"
import React, { useState } from 'react';

export function ProductCard ({productID,title,description,image,likedProducts,price,categoryId,information,isActive,onClick,className ,...props}){
  const [likedProductsList, setLikedProductsList] = useState([...likedProducts]);

  const handleLikeClick = (productID) => {
    if (likedProductsList.includes(productID)) {
      // Eğer ürün zaten beğenilmişse, beğeniyi kaldır
      setLikedProductsList(likedProductsList.filter((product) => product !== productID));
    } else {
      // Eğer ürün daha önce beğenilmemişse, beğeniyi ekle
      setLikedProductsList([...likedProductsList,productID]);
    }
  }
  

    return(
        <div className="hover:shadow-xl rounded-xl border-4 bg-white  py-5 flex flex-col justify-between 2xl:text-md xl:text-md lg:text-md md:text-sm sm:text-xs 2xl:h-lg xl:h-lg lg:h-lg md:h-md sm:h-sm">
            <span className="flex justify-end text-sm ">
              <Button 
                variant="LikeButton" 
                className={`visited:animate-ping p-2 text-4xl transform hover:scale-110 transition-transform ${likedProductsList.includes(productID) ? 'text-red-500' : 'text-gray-500'}`}
                onClick={() => handleLikeClick(productID)}>
                ♥️
              </Button>
            </span>
            <span className="flex justify-center h-60 w-full p-2" ><img src={`data:image/jpeg;base64,${image}`} alt={title} className="object-contain w-full h-full m-2 rounded-xl" /></span>
            <h5 className=  "flex justify-center p-2 "> <span className={`overflow-hidden line-clamp-1 ${information.length > 100 ? 'max-h-32' : 'max-h-20'}`}>{information}</span></h5>
            <div className="flex justify-center">
                <div className= " overflow-hidden w-3/4 text-center whitespace-nowrap block">
                    <div className={`font-bold text-sm ${isActive ? 'text-secondary' : 'text-red-800'}`}>{price} TL  /  MONTH</div>
                    {isActive 
                     ? 
                        <div>
                          
                        </div> 
                      : <div>
                          <div>Şuan Kirada ... </div>
                          <div><Button variant="Purple" size="xsmall" className="rounded-full bg-secondary w-24 text-white text-sm hover:underline" onClick={onClick}>AYIRT</Button></div>
                        </div>}
                  </div>
            </div>
            <div className= "flex justify-center text-center py-2">
                
            </div>
            <span className="flex justify-center 2xl:text-md xl:text-md lg:text-md md:text-sm sm:text-xs">
            <Button 
                onClick={onClick} 
                variant="PurpleOutline"
                size="small"
                className={`font-bold italic rounded-2xl ${isActive ? '' : 'opacity-50 cursor-not-allowed'}`}
                disabled={isActive===false}
              >
                Şimdi Kirala
            </Button>
            </span>
        </div>
    )
}
ProductCard.propTypes={
  productID:PropTypes.number.isRequired,
  title: PropTypes.string,
  description:PropTypes.string,
  image:PropTypes.string,
  price:PropTypes.number,
  categoryId:PropTypes.number,
  information:PropTypes.string,
  className:PropTypes.string,
  props:PropTypes.object,
  onClick: PropTypes.func,

}
/**
  const products = [
    {
      productID:1,
      image: 'https://yandex-images.clstorage.net/B1F003I19/f58f35asnH/k4WpoqjL1vx1zxTzy464bv7619Tqse4CI5Lx_sDkxBdlOQONqHWX1g70ekvTRkZVj8iab9t-dIWEHTfUOCHRwoHW6-7tj82gJosKp8ONvWzjp5TF9uvqXznQraqCvp9MMTpk5tgCtOojxQo-qmoGFsDU0TbUeCHImhtpgXUxlPm6xJSBnMm7-3LQW9vfrK9F84LW9N3v1nwfvbuKoPWQGFVcQdj7GaX8ANgqPo11JDb0sMUt2G8x1tMdTaMCLafgtLy7gZjOsvxi03PvxIuxU-228OXdzOFEAJG2pZHtpThJfmvp1Raf_jjaNSm2awI3-IDHH81oEsrnK060IRGj86-iqrqNyZL_ec9d-Oyhj27jo9Lf_d3BTSuilZ6K9ZYmR35ozcwzu_Mq2ygosGMII9Ogxw7Pdwfl4SJvqC4Cgeq8tq-ute2q61PfXP7Gsb5P17LU9_XxwHE6vKa3n-CpAHdCfvjuMILlB9gvDo9oHwDYjv0_9lgs_tAZa70SA6jigJyxuonOuf1Q7XDs2a-eWMOOwPzx_PNPHKKorZfRojpFaF_31DCewibjNAuuQh815Yv_MO5vD9LkFGCuASijy6GWtq-P9q3fZ957w8KSpHzKsvz_--_Bbjq0pLGG86QeUUxa8ewMsuA-2Ds3iUE5B_icwgfZTAHT5QtvizQCgs-TkJaKtuicyHboWMDLqp9O0oD-59XZ020vlY-qoeOrIFJBQczNK7faKfElO5JCEBvxnfA-ylY1wdY_RakaA5bBnay0gJjpv-lr1Wn_-7OwfN6H6uHazeJ2HbWPjITgtRZPbW7L0gSG8h3FBiuqfhMm2bnGHMhKL8DfPm-PDCeA1p-Tv6iKwLbddPd92vOmmVjgjffh_8vwbxm7hqyRy5glcn1UwPYVufAd0yQYh1MoN9qYzw7McxL39xBjuy8Igs6nlLCnst2C1X7YQsfMoqRJy5vV_9z5_nQDsYuxqs0',
      description:"Yeni gibi hiç bir hasarı yok. Sadece bataryası zayıf",
      information:"Samsung 6.6 inç 5G 8 GB Ram 128 GB Depolama Samsung 6.6 inç 5G 8 GB Ram 128 GB Depolama",
      title: 'IPHONE 14',
      price: 100.99,
      availability: 5,
    },
    {
      productID:2,
      image: 'https://avatars.mds.yandex.net/i?id=9542cc3f062410eeccc307d0468273254ccbf831-8769045-images-thumbs&n=13',
      description:"Yeni gibi hiç bir hasarı yok. Sadece bataryası zayıf",
      information:"Samsung 6.6 inç 5G 8 GB Ram 128 GB Depolama",
      title: 'Bebek Arabası',
      price: 75.99,
      availability: 10,
    },
    {
      productID:3,
      image: 'https://media.gqmagazine.fr/photos/5ede283413fadf7081f1a1a9/4:3/w_1200,h_900,c_limit/sony-playstation-5.jpg',
      description:"Yeni gibi hiç bir hasarı yok. Sadece bataryası zayıf",
      information:"Samsung 6.6 inç 5G 8 GB Ram 128 GB Depolama",
      title: 'Playstation 5',
      price: 755.99,
      availability: 10,
    },
    {
      productID:4,
      image: 'https://avatars.mds.yandex.net/i?id=93aa06bb6964435633294612465fd8d833472b3f-9837140-images-thumbs&n=13',
      description:"Yeni gibi hiç bir hasarı yok. Sadece bataryası zayıf.Yeni gibi hiç bir hasarı yok. Sadece bataryası zayıf",
      information:"Samsung 6.6 inç 5G 8 GB Ram 128 GB Depolama",
      title: 'Güneş Gözlüğü',
      price: 757.89,
      availability: 10,
    },
    {
      productID:5,
      image: 'https://www.bulvarpazari.com/wp-content/uploads/KG86NHI30N.jpg',
      description:"sdsdsdssb sdjkshd djshdjs sjdhjhd jshdjshdsj",
      information:"Samsung 6.6 inç 5G 8 GB Ram 128 GB Depolama",
      title: 'Buzdolabı',
      price: 487.99,
      availability: 10,
    },
    // Diğer ürünler
  ];
  const likedProducts=[1,2,3];



  <div className='grid xl:grid-cols-3 gap-5 md:grid-cols-2 sm:grid-cols-1'>
          {products.map((product, index) => (
                  <ProductCard
                    key={index}
                    productID={product.productID}
                    likedProducts={likedProducts}
                    image={product.image}
                    title={product.title}
                    description={product.description}
                    information={product.information}
                    price={product.price}
                    availability={product.availability}
                    onClick={() => handleAddToCart(product.title)}
                  />
                ))}
      </div>
 */