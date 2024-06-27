import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { getMessagesByUserId} from '../../../api';
import { useAuth } from "../../../context/authContext/authContext";
import errorMessage from '../../../helper/toasts/errorMessage';
import formatDate from '../../../helper/functions'


function SendBox() {
  const { user } = useAuth();
  const UserId = user ? user.user.id : 0;
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    getMessagesByUserId(UserId)
      .then((result)=>{
        console.log(result?.data.data);
        setMessageList(result?.data.data);
      })
      .catch((error)=>{
        errorMessage("Bilinmeyen bir hata oluştu.")
      })
  }, [UserId]);

  return (
    <div>
      <div className='w-full h-screen col-span-1 flex flex-col  '>
          <h1 className='text-xl rounded-xl p-3 border-b-4 border-white bg-secondary text-white'>Gelen Kutusu</h1>
            <div className='bg-gray-100 m-1 border-8 p-2 overflow-y-scroll flex-1'>
              <div className='p-1'>
                {messageList.map((message) => (
                <NavLink key={message.id} to={`/chat/${message.receiverId}`}>
                  <p className='mb-3 p-5 border-2 bg-gray-200 rounded-xl hover:bg-gray-300 border-white text-md'>
                    <div className='flex justify-between'>{message.userName} {message.userSurname}<span className='text-sm'>{formatDate(message.date)}</span></div>
                    <div className="opacity-40 line-clamp-1 ">mesaj: {message.messageContent}</div>
                  </p>
                </NavLink>
            ))}
              </div>
            </div>
          </div>
    </div>
  )
}

export default SendBox
