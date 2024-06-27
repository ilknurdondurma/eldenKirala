import React from 'react';
import { LuPencil } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { Form, Formik } from 'formik';
import Input from '../../../components/Input/text';
import Button from '../../../components/button/index'
import { useAuth } from '../../../context/authContext/authContext';
import { updateUser } from '../../../api';
import errorMessage from '../../../helper/toasts/errorMessage'
import succesMessage from '../../../helper/toasts/successMessage'
import { useNavigate } from 'react-router-dom';

function Hesabim() {
  const { user , setUser } = useAuth();
  const navigate =useNavigate();
  const userId = user.user.id;
  const name = user.user.name;
  const surname = user.user.surname;
  const email = user.user.email;
  const password =null;

  const handleSubmit=(values)=>{
    console.log(values)
      // USER NESNESİ OLUŞTUR
      var user = {
        "email": values?.email,
        "password": (values.password) ? values?.password : null,
        "name": values?.name,
        "surname": values?.surname,
      }

      // API e GÖNDER 
    updateUser(userId,user)
      .then(async data => {
        console.log(data);

        // Başarılı giriş durumunda yönlendir
        if (data.status === 200) {
          succesMessage("Güncelleme başarılı.")
          const responseData = data.data;
          console.log("response: "+responseData)
          await setUser({
            user:responseData.data
          })
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
       errorMessage("güncellenirken bir hata oluştu. Tekrar dene bakalımm :( ")
  }
      });
  }

  return (
    <div className='p-10 h-full'>
      <Formik
        initialValues={{
          name: name || "",
          surname: surname || "",
          email: email || "",
          password: password ||"",
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
        }}
      >
        {({ values, handleChange, handleBlur, dirty, isSubmitting }) => (
          <Form>
            <div className='grid grid-cols-4 sm:grid-cols-1 gap-2'>
              {/* fotograf */}
              <div className='col-span-1 flex justify-center border-2 rounded-xl'>
                <div className='flex flex-col justify-center gap-2 my-5'>
                  <img src='/logo192.png' alt='resim' className='w-30 h-30 rounded-full border-2'/>
                  <span className='flex items-center gap-2'> 
                    <LuPencil />
                    <MdDelete />                               
                  </span>              
                </div>
              </div>

              {/* düzenle */}
              <div className='col-span-3 sm:col-span-1'>
                <div className='flex flex-col justify-center w-1/2 md:w-full sm:w-full gap-2'>
                  <span className='flex'>
                    <label className='mx-5'> İsim : </label>
                    <Input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-transparent border-t-0 border-l-0 border-r-0 border-b-2"
                    />
                  </span>
                  <span className='flex'>
                    <label className='mx-5'>Soyad:</label>
                    <Input
                      name="surname"
                      value={values.surname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-transparent border-t-0 border-l-0 border-r-0 border-b-2"
                    />
                  </span>
                  <span className='flex'>
                    <label className='mx-5'>Email:</label>
                    <Input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-transparent border-t-0 border-l-0 border-r-0 border-b-2"
                    />
                  </span>
                  <span className='flex'>
                    <label className='mx-5'>Şifre:</label>
                    <Input
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="**********"
                      className="bg-transparent border-t-0 border-l-0 border-r-0 border-b-2"
                    />
                  </span>
                  <Button
                    className={`p-5 m-5 cursor-pointer ${dirty && !isSubmitting ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500'}`}
                    type="submit"
                    disabled={!dirty || isSubmitting}
                  >
                    Düzenle
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Hesabim;
