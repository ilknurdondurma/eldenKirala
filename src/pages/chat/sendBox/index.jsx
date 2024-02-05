import React from 'react'

function SendBox() {
  return (
    <div>
      <div className='w-full h-screen col-span-1 flex flex-col '>
          <h1 className='text-xl rounded-xl p-3 border-b-4 border-white bg-secondary text-white'>Gelen Kutusu</h1>
            <div className='bg-gray-100 m-1 border-8 p-2 overflow-y-scroll flex-1'>
              <div className='p-3'>
                <p className='mb-2 p-5 border-2 bg-gray-200 rounded-full hover:bg-gray-300 border-white'>Sohbet 2</p>
                <p className='mb-2 p-5 border-2 bg-gray-200 rounded-full hover:bg-gray-300 border-white'>Sohbet 3</p>
                <p className='mb-2 p-5 border-2 bg-gray-200 rounded-full hover:bg-gray-300 border-white'>Sohbet 1</p>
                <p className='mb-2 p-5 border-2 bg-gray-200 rounded-full hover:bg-gray-300 border-white'>Sohbet 2</p>
                <p className='mb-2 p-5 border-2 bg-gray-200 rounded-full hover:bg-gray-300 border-white'>Sohbet 3</p>
               
                {/* İstediğiniz kadar örnek sohbet ekleyebilirsiniz */}
              </div>
            </div>
          </div>
    </div>
  )
}

export default SendBox
