import React, { useEffect } from 'react'
import { ScrollingCarousel , Carousel } from '@trendyol-js/react-carousel';
import { useNavigate } from 'react-router-dom';

function SpinCarousel({itemList}) {
    const navigate=useNavigate();

    useEffect(()=>{
        console.log(itemList)
    },[])
  return (
    <div className='flex w-11/12 sm:w-full self-center text-center m-12 justify-center items-center'>
    <ScrollingCarousel>
        {itemList.map((item)=>(
        <div key={item.id} onClick={()=>{navigate(`/brands/${item.id}`)}}>
            <div   className="flex justify-center items-center my-5 p-1 mx-3 rounded-full text-sm border-2  w-brands h-brands sm:w-12 sm:h-12 sm:p-1 cursor-pointer ">
                <img loading="lazy" src={`${item.logo}`} className='rounded-full'></img>
          
            </div>
            <span className="text-sm">{item.name}</span>
        </div>
        ) )}
    </ScrollingCarousel>
    </div>
  )
}

export default SpinCarousel
