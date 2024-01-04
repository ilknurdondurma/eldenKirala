import React, { useEffect } from 'react'
import { ScrollingCarousel , Carousel } from '@trendyol-js/react-carousel';

function SpinCarousel({itemList}) {
    useEffect(()=>{
        console.log(itemList)
    },[])
  return (
    <div className='flex w-11/12 sm:w-full self-center text-center m-12 justify-center items-center'>
    <ScrollingCarousel>
        {itemList.map((item)=>(
        <div>
            <div key={item.id}  className="flex justify-center items-center my-5 p-1 mx-3 rounded-full text-sm border-4 border-black w-16 h-16 sm:w-12 sm:h-12 sm:p-1 ">
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
