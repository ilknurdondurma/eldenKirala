import React, { useEffect, useState } from 'react'
import { ProductCard } from '../productCard'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Button from '../button';
const ProductSlider = ({ productList , name, head, onClick }) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: Math.min(4, productList.length),
      slidesToScroll: 1,
      vertical:false,
      centerMode: true,
      centerPadding: '60px',
      
      responsive: [
        {
          breakpoint: 1500, // breakpoint for md screen
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding:'20px' // center mode false for md screen
          },
        },
        {
          breakpoint: 1023, // breakpoint for sm screen
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true, 
            centerPadding:'10px'// center mode false for sm screen
          },
        },
        {
          breakpoint: 768, // breakpoint for xsm screen
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding:'5px' // center mode false for sm screen
          },
        },
        {
          breakpoint: 500, // breakpoint for xsm screen
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding:'1px' // center mode false for sm screen
          },
        },
      ],

    };

    return (
      <>
      <div className='flex justify-start m-5 text-xl font-bold italic font-sans'>{head}</div>
        <div className='border-2 border-black rounded-xl shadow-xl m-1 grid grid-cols-4 bg-gray-100  box-border '>
            <div className={`sm:col-span-4 flex flex-col justify-around text-center text-4xl font-bold italic font-serif ${name ? 'baslik' : 'hidden'}`}>
              {name}<br/> Ürünler
              <Button variant="Purple" size="large" className="w-1/2 text-center self-center my-10"> Hemen Kirala</Button>
            </div>
            
            <div className={`col-span-3 sm:col-span-4 ${name ? '' : 'col-span-4 px-20 py-10 sm:px-2 sm:py-1'} grid grid-cols-1 mx-9 my-10`}>
              <div className='center w-full gap-10'>
                <Slider {...settings} >
                  {productList.map((product) => (
                  <div key={product.id} className='mx-10'>
                  <ProductCard
                      productID={product.id}
                      title={product.name}
                      likedProducts={[]}
                      image={product.filE_URL_1}
                      price={product.price}
                      information={product.description}
                      isActive={product.isActive}
                      onClick={() => {
                      // Handle product click
                      }}
                  />
                  </div>
              ))}
                  </Slider>
              </div>
            </div>
      </div></>

    );
  };
  
  export default ProductSlider;
 