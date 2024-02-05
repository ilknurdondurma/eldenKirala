import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsById } from '../../api';
import errorMessage from '../../helper/toasts/errorMessage';


const ChatApp = () => {
    const { productId, userId } = useParams();
    const [product, setProduct] = useState([]);

    console.log("user:"+userId);
    const [messages, setMessages] = useState(
    [
        { text: "hey Yeni Mesaj Başlat", sender: 'receiver' },
        { text: "hey Yeni Mesaj Başlatıyorum :)", sender: 'user' },
        { text: "deneme", sender: 'user' },
        { text: "Nasılsınız ?", sender: 'user' }

    ]
    );
    const [newMessage, setNewMessage] = useState('');

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
        const timestamp = new Date().toLocaleTimeString();
        setMessages([
            ...messages,
            { text: newMessage, sender: 'user', timestamp },
        ]);
        setNewMessage('');
        // Gerçek bir API'ye ya da başka bir yerdeki servise mesaj gönderimi yapılabilir.
        } 
    };
    useEffect(() => {
        getProductsById(productId,userId)
        .then((result) => {
          setProduct(result?.data.data);
          console.log("products ")
          console.log(result?.data.data)
        })
        .catch((error) => {
          console.log(error);
          errorMessage("Bilinmeyen bir hata oluştu.")
        });
     
    }, [])
    

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-300 rounded-xl p-4 mb-1 border-2 border-secondary">{product.brandName +" / " + product.subCategoryName + " / " + product.price +" tl"} </div>
      <div className="bg-secondary rounded-xl text-white p-4">{product.userName +" " + product.userSurname} </div>
      <div className="flex-1 overflow-y-scroll p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={` rounded-xl m-2 flex justify-${message.sender === 'user' ? 'end' : 'start'}`}
          >
            <div
              className={`bg-gray-200 text-black p-4 rounded-md max-w-2xl`}
            >
              <div className="font-semibold">{message.text}</div>
              <div className="text-sm text-gray-500">{message.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-200 p-4">
        <input
          type="text"
          placeholder="Mesajınızı yazın..."
          value={newMessage}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 p-2 bg-primary text-white rounded-md"
        >
          Gönder
        </button>
        <button
          onClick={handleSendMessage}
          className="mt-2 p-2 m-2 bg-primary text-white rounded-md"
        >
          Kiralamayı Başlat
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
