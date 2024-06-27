import React from 'react'

function ChatInfo() {
    return (
        <div>
          <div className='w-full h-screen col-span-1 flex flex-col '>
              <h1 className='text-xl rounded-xl p-3 border-b-4 border-white bg-secondary text-white'>Mesajlar</h1>
                <div className='bg-gray-100 m-1 border-8 p-2 overflow-y-scroll flex-1'>
                  <div className='p-3 justify-center flex'>
                    
                    <p className='mb-2 p-5 '>Tüm sohbetler için sohbete tıklayın</p>
                   
                    {/* İstediğiniz kadar örnek sohbet ekleyebilirsiniz */}
                  </div>
                </div>
              </div>
        </div>
      )
}

export default ChatInfo
