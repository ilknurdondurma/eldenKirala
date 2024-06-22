import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addRental, getProductsById } from '../../api';
import errorMessage from '../../helper/toasts/errorMessage';
import succesMessage from '../../helper/toasts/successMessage';
import Button from '../../components/button/index'
import { useAuth } from '../../context/authContext/authContext';
import { ToastContainer } from 'react-toastify';
import * as signalR from "@microsoft/signalr";

const ChatApp = () => {
    const { productId,} = useParams();
    const [product, setProduct] = useState([]);
    const [selectedButton, setSelectedButton] = useState(1);
    const [connection, setConnection] = useState(null);
    const [receiverId, setReceiverId] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState(
    [
        { text: "hey Yeni Mesaj Başlat", sender: 'receiver' },
        { text: "hey Yeni Mesaj Başlatıyorum :)", sender: 'user' },
        { text: "deneme", sender: 'user' },
        { text: "Nasılsınız ?", sender: 'user' }

    ]
    );
    const [newMessage, setNewMessage] = useState('');
    const {user}=useAuth();
    const myUserId = user ? user.user.id : 0;
    const navigate =useNavigate();
    const buttonData = [
      { id: 1, value: 1, label: '1 Ay',   disabled: (product?.minRentalPeriod > 1 ||  product?.maxRentalPeriod < 1)  ?true:false },
      { id: 2, value: 3, label: '3 Ay',   disabled: (product?.minRentalPeriod > 3 ||  product?.maxRentalPeriod < 3)  ?true:false },
      { id: 3, value: 6, label: '6 Ay',   disabled: (product?.minRentalPeriod > 6 ||  product?.maxRentalPeriod < 6 ) ?true:false},
      { id: 4, value: 12, label: '12 Ay', disabled: (product?.minRentalPeriod > 12 || product?.maxRentalPeriod < 12) ?true:false},
      { id: 5, value: 15, label: '15 Ay', disabled: (product?.minRentalPeriod > 15 || product?.maxRentalPeriod < 15) ?true:false },
      { id: 6, value: 18, label: '18 Ay', disabled: (product?.minRentalPeriod > 18 || product?.maxRentalPeriod < 18 )?true:false},
   ];
    const price=buttonData[selectedButton - 1]?.value * product?.price || 0
    const bugununTarihi = new Date();
    const eklenenAySayisi = buttonData.find(button => button.id === selectedButton)?.value || 0;
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + eklenenAySayisi);

    if (isNaN(endDate.getTime())) {
      console.error("Geçersiz bir tarih oluşturuldu!");
    }
    console.log(endDate)


    
 

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
        if (connection) {
          connection.invoke("SendPrivateMessage", receiverId, newMessage)
              .catch(error => console.error(error));
      }        } 
    };
    const handleRental = (salesUserId) => {
      var rental = {
        "rentalStatus": true,
        "productId": productId,
        "receiverUserId": myUserId,
        "salesUserId": salesUserId,
        "startDate": bugununTarihi,
        "endDate": endDate,
        "rentalPrice": price,
        "rentalPeriod":eklenenAySayisi,
        "paymentStatus": false
      }
      if(myUserId===salesUserId){
        errorMessage("kendi eşyanızı kiralayamazsınız :)")
      }
     else{
              // API e GÖNDER 
            addRental(rental)
            .then(async data => {
              console.log(data);
              // Başarılı giriş durumunda yönlendir
              if  (data.status === 200) {
                succesMessage("Kiralama başarılı.")
                const responseData = data.data;
                console.log("response: "+responseData)
                setTimeout(() => {
                  navigate("/",{replace:true});
                }, 1000);
              }
            })
            .catch(error => {
              if (error.response.status === 401) {
                errorMessage("GİRİŞ YAPSANA KAARŞİM")         
                setTimeout(() => {
                    navigate("/login");
                    window.location.reload();
                  }, 2000);
                
            }
        else {
            console.error("update  error:", error);
            errorMessage("kiralanırken bir hata oluştu. Tekrar dene bakalımm :( ")
        }
            });
     }
   
  };
    useEffect(() => {
        getProductsById(productId,myUserId)
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

    useEffect(() => {
      const conn = new signalR.HubConnectionBuilder()
          .withUrl(`http://localhost:5058/api/v2/chathub`)
          .build();

      conn.on("ReceivePrivateMessage", (senderId, message) => {
          setMessages(prevMessages => [...prevMessages, { senderId, message }]);
      });

      conn.start()
          .then(() => console.log("SignalR bağlantısı başlatıldı."))
          .catch(error => console.error("ERRRĞĞĞ"+error.toString()));

      setConnection(conn);
  }, []);
    

  return (
    <div className="flex flex-col h-screen">
      <ToastContainer/>
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
                  <p className='font-bold text-center'>Tutar :{price} ₺ </p>
                
                </div>
        <Button
          onClick={handleSendMessage}
          className="m-2 p-2 rounded-md"
          variant="Green"

        >
          Gönder
        </Button>
        <Button
          onClick={() => handleRental(product.userId)}
          className="m-2 p-2 rounded-md"
          variant="Green"        >
          Kiralamayı Başlat
        </Button>
      </div>
    </div>
  );
};

export default ChatApp;
