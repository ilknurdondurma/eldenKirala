import React from 'react';
import { Form, Formik } from 'formik';
import Input from '../../../components/Input/text';
import Button from '../../../components/button/index'
import { useAuth } from '../../../context/authContext/authContext';
import { UpdateUser } from '../../../api';
import errorMessage from '../../../helper/toasts/errorMessage'
import succesMessage from '../../../helper/toasts/successMessage'
import { useNavigate } from 'react-router-dom';

function AdresDuzenle() {
  const { user , setUser } = useAuth();
  const navigate =useNavigate();
  const userId = user.user.id;
  const name = user.user.name;
  const surname = user.user.surname;
  const email = user.user.email;
  const password = user.user.password;
  const city = user.user.city;
  const district = user.user.district;


  const handleSubmit=(values)=>{
    console.log(values)
      // USER NESNESİ OLUŞTUR
      var user = {
        "email": email,
        "password": password,
        "name": name,
        "surname": surname,
        "city": values?.city,
        "district": values?.district,
      }

      // API e GÖNDER 
    UpdateUser(userId,user)
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
    <div className='p-10'>
      <Formik
        initialValues={{
          city: city || "",
          district: district || "",
          
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
        }}
      >
        {({ values, handleChange, handleBlur, dirty, isSubmitting }) => (
          <Form>
            <div>
              
              {/* düzenle */}
              <div className='col-span-3 sm:col-span-1'>
                <div className='flex flex-col justify-center w-full gap-2'>
                  <span className='flex'>
                    <label className='mx-5'> Şehir : </label>
                    <Input
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-transparent border-t-0 border-l-0 border-r-0 border-b-2"
                    />
                  </span>
                  <span className='flex'>
                    <label className='mx-5'>İlçe:</label>
                    <Input
                      name="district"
                      value={values.district}
                      onChange={handleChange}
                      onBlur={handleBlur}
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

export default AdresDuzenle;
