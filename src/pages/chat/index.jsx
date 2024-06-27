import React, { useEffect, useRef, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useAuth } from "../../context/authContext/authContext";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addRental, getMessagesUserToUser, getProductsById } from '../../api';
import errorMessage from '../../helper/toasts/errorMessage';
import succesMessage from '../../helper/toasts/successMessage';
import Button from '../../components/button/index'
import formatDate, { formatDateToHour } from "../../helper/functions";


function ChatBox() {
  const [messageList, setMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [hubConnection, setHubConnection] = useState();
  const { user } = useAuth();
  const navigate =useNavigate();
  const UserId = user ? user.user.id : 0;
  //const { pid, uid } = useParams();
  const { uid } = useParams();
  const location = useLocation();
  const product = location.state?.product;
  const productId=product ? product.id : 0;
  const receiverUserId = uid;
  const buttonData = [
    { id: 1, value: 1, label: '1 Ay',   disabled: (product?.minRentalPeriod > 1 ||  product?.maxRentalPeriod < 1)  ?true:false },
    { id: 2, value: 3, label: '3 Ay',   disabled: (product?.minRentalPeriod > 3 ||  product?.maxRentalPeriod < 3)  ?true:false },
    { id: 3, value: 6, label: '6 Ay',   disabled: (product?.minRentalPeriod > 6 ||  product?.maxRentalPeriod < 6 ) ?true:false},
    { id: 4, value: 12, label: '12 Ay', disabled: (product?.minRentalPeriod > 12 || product?.maxRentalPeriod < 12) ?true:false},
    { id: 5, value: 15, label: '15 Ay', disabled: (product?.minRentalPeriod > 15 || product?.maxRentalPeriod < 15) ?true:false },
    { id: 6, value: 18, label: '18 Ay', disabled: (product?.minRentalPeriod > 18 || product?.maxRentalPeriod < 18 )?true:false},
 ];
 const [selectedButton, setSelectedButton] = useState(1);
 const price=buttonData[selectedButton - 1]?.value * product?.price || 0
 const bugununTarihi = new Date();
 const eklenenAySayisi = buttonData.find(button => button.id === selectedButton)?.value || 0;
 const endDate = new Date();
 endDate.setMonth(endDate.getMonth() + eklenenAySayisi);

 if (isNaN(endDate.getTime())) {
   console.error("Geçersiz bir tarih oluşturuldu!");
 }
 console.log(endDate)
 const scrollRef = useRef(null);

  useEffect(() => { //scroll
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() =>{//bağlantı sağlayan useEffect
    createHubConnection();
  }, []);
  useEffect(() =>{//servere dinleyen useEffcet
    if (hubConnection) {
      hubConnection.on("ReceiveMessage", (mesaj) => {
        setMessageList((prevMsgList) => [...prevMsgList, {text:mesaj.messageContent.toString() ,sender:'other'}]);
      });
    }
  }, [hubConnection]);

    useEffect(() => {// eski mesajları getir
    getMessagesUserToUser(UserId, receiverUserId)
      .then((result) => {
        const messages = result?.data.data.map((res) => ({
          text: res.messageContent,
          sender: res.senderId === UserId ? 'myself' : 'other',
          date: res.date,
        }));
        setMessageList(messages);
      })
      .catch((error) => {
        errorMessage('Bilinmeyen bir hata oluştu.');
      });
  }, [UserId, receiverUserId]);

  const createHubConnection = async () => {
    const hubCn = new HubConnectionBuilder()
      .withUrl("https://localhost:7117/Chat", {
        accessTokenFactory: () => "Bearer " + user.user.token,
      })
      .build();
    try {
      await hubCn.start();
      console.log(hubCn.connectionId);
      setHubConnection(hubCn);
    } catch (e) {
      console.log("e", e);
    }
  };
  const sendMessage = async () => {
    setMessageList((prevMsgList) => [...prevMsgList, {text:newMessage ,sender:'myself' , date:Date.now()}]);
    setNewMessage("")
    var message = {
      receiverId: receiverUserId.toString(),
      messageContent: newMessage,
      //Date: Date.now()
  }
    if (hubConnection) {
      try {
        await hubConnection.invoke("SendMessageToUser", message);
      } catch (error) {
        console.error("Error sending message", error);
      }
    }
  };
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleRental = (salesUserId) => {
    var rental = {
      "rentalStatus": true,
      "productId": productId,
      "receiverUserId": UserId,
      "salesUserId": salesUserId,
      "startDate": bugununTarihi,
      "endDate": endDate,
      "rentalPrice": price,
      "rentalPeriod":eklenenAySayisi,
      "paymentStatus": false
    }
    if(UserId===salesUserId){
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

  
 
  
  return (
    <div className="flex flex-col h-screen bg-primary/20">
      <ToastContainer/>
      <div className="bg-gray-300 rounded-xl p-4 mb-1 border-2 border-secondary">{product ? (product.brandName +" / " + product.subCategoryName + " / " + product.price +" tl") : "Sohbet"} </div>
      {/* <div className="bg-secondary rounded-xl text-white p-4">Sohbet </div> */}
      {/* <div className="bg-secondary rounded-xl text-white p-4">{product.userName +" " + product.userSurname} </div> */}
      <div ref={scrollRef} className="flex-1 overflow-y-scroll swiper-scrollbar p-4">
        {messageList.map((message, index) => (
          <div
            key={index}
            className={` rounded-xl m-2 flex justify-${message.sender === 'other' ? 'start' : 'end'}`}
          >
            <div
              className={`bg-gray-200 text-black p-4 rounded-md max-w-2xl`}
            >
              <div className="font-semibold flex flex-col">{message.text} <span className="text-xs flex justify-end">{formatDateToHour(message.date ? message.date : Date.now())}</span></div>
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
                    className={`${button.disabled ?'line-through bg-red-600':''} text-sm rounded-full m-1`}
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
          onClick={sendMessage}
          className="m-2 p-2 rounded-md"
          variant="Green"

        >
          Gönder
        </Button>
        <Button
          onClick={() => handleRental(product.userId)}
          className={`m-2 p-2 rounded-md ${!product || !product.isActive ? "hidden" : ""}`}
          variant="Green"        >
          Kiralamayı Başlat
        </Button>
      </div>
    </div>
  );
}
export default ChatBox;


/**
 <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button onClick={sendMessage}>Mesaj Gönder </button>

 *<ul>
        {Array.isArray(msgList) ? msgList.map((item, index) => <li key={index}>{item}</li>) : null}
      </ul>
 */