import React, { useEffect, useState } from 'react';
import { getRentalsByUserId, getProductsById, updateComment, addComment } from '../../../api';
import errorMessage from '../../../helper/toasts/errorMessage';
import { useAuth } from '../../../context/authContext/authContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/index';
import succesMessage from '../../../helper/toasts/successMessage';
import { Field, Form, Formik } from 'formik';

function TumKiralamalar() {
  const { user } = useAuth();
  const UserId = user ? user.user.id : 0;
  const [rentals, setRentals] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [selectedRental, setSelectedRental] = useState(null); // State for selected comment
    const navigate = useNavigate();

    const openModal = (rent) => {
        setSelectedRental(rent);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedRental(null);
        setShowModal(false);
    };
    const handleSubmit =(values)=>{
        console.log("id:"+selectedRental.id);
        console.log("userıd:"+UserId);
        console.log("prodıd:"+selectedRental.productId);
        console.log("content:"+values.content);

        var updatedComment={
            "userId": UserId,
            "productId": selectedRental.productId,
            "commentContent": values?.content,
        }
        addComment(updatedComment)
            .then(async response => {
                console.log("API cevabı: ", response);
                if (response && response.data && response.status === 200) {
                    const responseData = response.data;
                    console.log("response: "+responseData) 
                    succesMessage("ekleme başarılı")       
                  
                } else {
                    console.error("Invalid API response format");
                }
            }).catch(error => {
                console.error("error:", error);
                errorMessage("error")
            })
        setSelectedRental(null);
        setShowModal(false);
    }

  useEffect(() => {
    getRentalsByUserId(UserId)
      .then(async (data) => {
        if (data.status === 200) {
          const responseData = data.data;
          setRentals(responseData.data);

          const productPromises = responseData.data.map((rent) =>
            getProductsById(rent.productId, UserId)
          );

          try {
            const productsData = await Promise.all(productPromises);
            setProducts(productsData.map((result) => result?.data.data));
          } catch (error) {
            console.log(error);
            errorMessage("Bilinmeyen bir hata oluştu.");
          }
        }
      })
      .catch((error) => {
        // Handle errors
      });
  }, [UserId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };


  return (
    <div className='m-2 h-screen '>
      <h1 className="text-center mt-5 font-bold text-xl">Kiraladığım Ürünler</h1>
      <div className='grid grid-cols-2'>
        {rentals.length === 0 ? (
          <div className="text-center mt-5 text-gray-500">Kiraladığınız ürün bulunmamaktadır.</div>
        ) : (
          rentals.map((rent, index) => (
            <div key={index}>
              <div className={`text-black p-4 m-2 rounded-md  ${rent.rentalStatus === true ? 'bg-primary' : 'bg-gray-200'}`}>
                <div onClick={() => navigate(`/product/${rent.productId}`)}>
                  <div className="font-semibold">
                    Bitiş Tarihi: {formatDate(rent.endDate)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Başlangıç Tarihi: {formatDate(rent.startDate)}
                  </div>
                  <div className='text-sm flex flex-col mt-5'>
                    <div><span className='font-semibold'>Product Name:</span> {products[index]?.name || 'Loading...'}</div>
                    <div><span className='font-semibold'>Product Price:</span> {products[index]?.price + " x " + rent.rentalPeriod || 'Loading...'}</div>
                  </div>
                </div>
                <Button variant="Purple" className="mt-5" onClick={()=> openModal(rent)}>Değerlendir</Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal show={showModal} handleClose={closeModal}>
          <h2 className="text-2xl mb-4">Ürün Hakkındaki Görüşleriniz:</h2>
          <Formik
            initialValues={{
              content:''
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
            }}
          >
            {({ isSubmitting }) => (
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
  );
}

export default TumKiralamalar;

function Modal  ({ show, handleClose, children })  {
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

