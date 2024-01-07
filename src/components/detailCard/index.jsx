// DetailCard.jsx
import React, { useEffect, useState } from 'react';
import Button from '../button/index'
import { GrMap } from "react-icons/gr";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import '../../layout/web/index.css'
import Spin from '../../pages/spin';

function DetailCard({ product }) {


  function renderStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      // Yıldızın sarı veya gri olup olmadığını kontrol et
      const isYellow = i < rating;
  
      stars.push(
        <span key={i} className={isYellow ? "text-yellow-500" : "text-gray-400"}>
          ★
        </span>
      );
    }
    return stars;
  }
  const [selectedButton, setSelectedButton] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const minRentalPeriod = product?.minRentalPeriod;
  const maxRentalPeriod = product?.maxRentalPeriod;

  const buttonData = [
      { id: 1, value: 1, label: '1 Ay',   disabled: (minRentalPeriod < 1 ||  maxRentalPeriod > 1)  ?true:false },
      { id: 2, value: 3, label: '3 Ay',   disabled: (minRentalPeriod < 3 ||  maxRentalPeriod > 3)  ?true:false },
      { id: 3, value: 6, label: '6 Ay',   disabled: (minRentalPeriod < 6 ||  maxRentalPeriod > 6 ) ?true:false},
      { id: 4, value: 12, label: '12 Ay', disabled: (minRentalPeriod < 12 || maxRentalPeriod > 12) ?true:false},
      { id: 5, value: 15, label: '15 Ay', disabled: (minRentalPeriod < 15 || maxRentalPeriod > 15) ?true:false },
      { id: 6, value: 18, label: '18 Ay', disabled: (minRentalPeriod < 18 || maxRentalPeriod > 18 )?true:false},
   ];
   const handleImageChange = (direction) => {
    const images = [product.filE_URL_1, product.filE_URL_2, product.filE_URL_3].filter(resim => resim != null);
    
    if (images.length === 0) {
      // No valid images to display
      return;
    }

    if (direction === 'left') {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    } else if (direction === 'right') {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }
  };

  
  return (
   product ?(
    <>
    <div id='div' className='flex w-3/4 m-5 self-center text-sm'><a href='/'>Home</a> <FaChevronRight/> <a href='#'>{product.categoryName}</a> <FaChevronRight/> <a href='#'>{product.subCategoryName}</a></div>
    <div className='flex flex-col self-center m-5 w-3/4 md:w-full sm:w-full  justify-center'>
    <div className='grid grid-cols-2 text-center justify-center object-center'>
{/* resim ve user */}
        <div className=' grid grid-rows-4 h-auto border-2 rounded-xl '>
            <div className='grid grid-cols-10 row-span-3 m-2 '>
                <span className='flex justify-center self-center'><FaChevronLeft onClick={() => handleImageChange('left')} /></span>
                <img className="col-span-8 object-contain h-128 w-128 flex justify-center  "src={`data:image/jpeg;base64,${product[`filE_URL_${currentImageIndex + 1}`]}`} />
                <span className='flex justify-center self-center'><FaChevronRight onClick={() => handleImageChange('right')} /></span>
            </div>

            <div className='border-2 grid grid-rows-2'>
              {/* user bilgileri */}
                <div className='flex rounded-xl justify-between self-center py-2 px-2 bg-gray-50 '>
                    <div className='flex '>
                        <div className='text-2xl m-1 font-sans font-bold border-2 rounded-full'>🤩</div>
                        <div className='text-lg m-1 font-sans font-bold'>{product.userName}</div>
                        <div className='text-lg m-1 font-sans font-bold'>{product.userSurname}</div>
                        <div className='text-lg m-1 font-sans font-bold'> ✩ {product.userRating}</div>
                    </div>
                    <div>
                          <Button> Satıcıya Sor</Button>
                    </div>
                </div>
              {/* konum bilgileri */}
                <div className=' bg-gray-50 h-full rounded-xl flex  flex-col justify-center'>
                    <div>Konum Bilgisi :</div>
                    <span className='text-lg m-1 font-sans font-bold'>
                      <GrMap size="30px"/>{product.userCity}/TURKEY
                    </span>

                </div>
            </div>
        </div>


{/* özellikler */}
        <div className='grid grid-rows-5 justify-between h-auto p-5 bg-gray-50'>
            <div className='row-span-4 flex flex-col justify-between'>
                <div className='text-2xl font-bold font-sans'>"{product.name}"</div>
                <div className='text-md opacity-50  font-sans'>{product.description}</div>
                <span className="text-md  text-start ps-5 py-2">{renderStars(product.rating/2)} <a className='cursor-pointer'>{product.commentCount} değerlendirme </a></span>
                <div className='text-lg font-sans font-bold text-start ps-5 text-secondary'>{product.price} ₺ / AYLIK</div>

                <div className='text-md font-sans text-start ps-5 py-1 pt-4'><span className='font-bold'>DURUMU : </span>{product.status}</div>
                <div className='text-md font-sans text-start ps-5 py-1 pt-4'><span className='font-bold'>MARKASI : </span>{product.brandName} / {product.subCategoryName}</div>

                <div className='text-md font-sans text-start ps-5 py-1 pt-5'>
                <p className='font-bold'>Bir Kiralama Süresi Seçin : </p>
                {buttonData.map((button) => (
                    <Button
                    className={`${button.disabled ?'line-through text-red-500':''} text-sm rounded-full m-1`}
                    type="button"
                    key={button.id}
                    variant={selectedButton === button.id ? 'Purple' : 'PurpleOutline'}
                    onClick={() =>{ 
                        setSelectedButton(button.id)
                    }}
                    disabled={button.disabled}
                    >
                    {button.label}
                    
                    </Button>
                  ))}
                  <p className='font-bold text-center'>Tutar :{buttonData[selectedButton - 1]?.value * product.price || 0} ₺ </p>
                
                </div>
            </div>
            <div className='flex flex-col justify-end'>
            <Button
                className={`w-full rounded-2xl m-2 sm:text-xs`}
                type="submit"
                variant="Purple"
                
              >Sepete Ekle
            </Button>
            </div>
        </div>
    </div>
    </div>
</>
   )
   :(
      <Spin/>
   )
  );
}

export default DetailCard;