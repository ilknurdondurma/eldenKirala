import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/authContext/authContext'
import { getCommentByUserId, updateComment } from '../../../api';
import CommentCard from '../../../components/commentCard';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import errorMessage from '../../../helper/toasts/errorMessage';
import succesMessage from '../../../helper/toasts/successMessage';
import moment from 'moment/moment';


function TumYorumlar() {
    const {user} = useAuth();
    const UserId = user ? user.user.id : 0;
    const [currentDate, setCurrentDate] = useState('');
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [selectedComment, setSelectedComment] = useState(null); // State for selected comment
    const navigate = useNavigate();

    const openModal = (comment) => {
        setSelectedComment(comment);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedComment(null);
        setShowModal(false);
    };
    const handleSubmit =(values)=>{
        console.log("id:"+selectedComment.id);
        console.log("userıd:"+UserId);
        console.log("prodıd:"+selectedComment.productId);
        console.log("content:"+values.content);
        console.log("date:"+currentDate);

        var updatedComment={
            "id":selectedComment.id,
            "userId": UserId,
            "productId": selectedComment.productId,
            "commentContent": values?.content,
            "createdDate":currentDate
        }
        updateComment(updatedComment)
            .then(async response => {
                console.log("API cevabı: ", response);
                if (response && response.data && response.status === 200) {
                    const responseData = response.data;
                    console.log("response: "+responseData) 
                    succesMessage("güncelleme başarılı")       
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    console.error("Invalid API response format");
                }
            }).catch(error => {
                console.error("Sign-up error:", error);
                errorMessage("şifre veya emaili kontrol et bakim")
            })
        setSelectedComment(null);
        setShowModal(false);
    }

    useEffect(() => {
        getCommentByUserId(UserId)
            .then(async (data)=>{
                if(data.status===200){
                    const responseData = data.data;
                    setComments(responseData.data);
                    console.log(responseData.data)
                }
            })
            .catch((error)=>{
                console.log(error);
            })

            const now = moment().utc().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
            setCurrentDate(now);
            
    }, [UserId]);

  return (
    <div className='m-2  h-full '>
        <h1 className="text-center mt-5 font-bold text-xl">Tüm Yorumlarım</h1>
        <div>
            {comments.length===0 
            ? (<div className="text-center mt-5 text-gray-500">Yorum bulunmamaktadır.</div>)
            : (
                <div>
                {comments.map((comment) => (
                    <div key={comment.id} onClick={() => openModal(comment)}>
                        <CommentCard comments={[comment]} variant={"secondary"} />
                    </div>
                ))}
            </div>
                
            )
            
            }
        </div>

        <Modal show={showModal} handleClose={closeModal}>
        <h2 className="text-2xl mb-4">Ürün Hakkındaki Yorumunuzu Güncelleyin</h2>
        
            <Formik
            initialValues={{
                    content:selectedComment ? selectedComment.commentContent :""
                }}
            onSubmit={(values,{ setSubmitting }) => {
                handleSubmit(values)
            }}
            >
               {({ setFieldValue,isSubmitting}) => (
                <Form>
                   <Field
                        as="textarea"
                        rows="4"
                        name='content'
                        maxLength={300}
                        cols="50"
                        placeholder="Write your review here..."
                        className="w-full p-2 border rounded"
                    />
                    <button
                        type='submit'
                        className="bg-secondary text-white py-2 px-4 mt-4 rounded hover:bg-purple-600"
                        >
                    Gönder
                    </button>
                </Form>
               )}
            </Formik>
       
      </Modal>
    </div>
  )
}

export default TumYorumlar
function Modal  ({ show, handleClose, children})  {
  return (
    <>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 max-w-md mx-auto rounded-md z-10 relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 cursor-pointer "
            >
              Close
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};