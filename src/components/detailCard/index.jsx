// DetailCard.jsx
import React, { useState } from 'react';
import Button from '../button/index'
import { GrMap } from "react-icons/gr";

function DetailCard({ product }) {
  function renderStars(starCount) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      // Yıldızın sarı veya gri olup olmadığını kontrol et
      const isYellow = i < starCount;
  
      stars.push(
        <span key={i} className={isYellow ? "text-yellow-500" : "text-gray-400"}>
          ★
        </span>
      );
    }
    return stars;
  }
  const [selectedButton, setSelectedButton] = useState();
  const buttonData = [
      { id: 1, value: 1, label: '1 Ay',   disabled: (product.minRentalPeriod < 1 ||  product.maxRentalPeriod > 1)  ?true:false },
      { id: 2, value: 3, label: '3 Ay',   disabled: (product.minRentalPeriod < 3 ||  product.maxRentalPeriod > 3)  ?true:false },
      { id: 3, value: 6, label: '6 Ay',   disabled: (product.minRentalPeriod < 6 ||  product.maxRentalPeriod > 6 ) ?true:false},
      { id: 4, value: 12, label: '12 Ay', disabled: (product.minRentalPeriod < 12 || product.maxRentalPeriod > 12) ?true:false},
      { id: 5, value: 15, label: '15 Ay', disabled: (product.minRentalPeriod < 15 || product.maxRentalPeriod > 15) ?true:false },
      { id: 6, value: 18, label: '18 Ay', disabled: (product.minRentalPeriod < 18 || product.maxRentalPeriod > 18 )?true:false},
   ];
  
  return (
    <div className='flex flex-col self-center m-5 w-3/4 md:w-full sm:w-full  justify-center'>
      <div className='grid grid-cols-2 text-center justify-center object-center'>
{/* resim ve user */}
          <div className=' grid grid-rows-4 h-auto border-2 rounded-xl '>
              <img className="row-span-3 object-contain h-128 w-128 flex justify-center m-2 "src={`data:image/jpeg;base64,${product.filE_URL_1}`} />
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
                  <span className="text-md  text-start ps-5 py-2">{renderStars(product.commentCount)} <a className='cursor-pointer' >{product.commentCount} değerlendirme </a></span>
                  <div className='text-lg font-sans font-bold text-start ps-5 text-secondary'>{product.price} ₺ / AYLIK</div>

                  <div className='text-md font-sans text-start ps-5 py-1 pt-4'><span className='font-bold'>DURUMU : </span>{product.status}</div>
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
  );
}

export default DetailCard;