import React, { useState } from 'react'
import Input from '../../components/Input/text';
import Button from '../../components/button';
import { Form, Formik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckBox from '../Input/checkbox';
import { login } from '../../api';
export default function LoginForm({}){

  const navigate = useNavigate();
    const handleSubmit=(values)=>{
      //console.log(values);

      const formData = new FormData();
      formData.append("email", values?.email);
      formData.append("pass", values?.password);

      login(formData)
      .then(async response => {
        console.log("API cevabı: ", response);

        // Check if the response contains the expected data
        if (response && response.data && response.status === 200) {
          const responseData = response.data;
          const token = responseData.data.token;
          localStorage.setItem('token', token);
          console.log(localStorage.getItem('token'));
          await toast.success('Login successful!', {
            position: 'top-right',
            autoClose: 3000, // Close the notification after 3000 milliseconds (3 seconds)
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          navigate("/",{replace:true});
        } else {
          console.error("Invalid API response format");
        }
      })
      .catch(error => {
        console.error("Sign-up error:", error);
      });

    };
    return (
        <div className='loginForm flex justify-center p-5 sm:p-2 mt-5'>
          <div className='flex justify-center text-center border rounded-2xl bg-my_border_color/60 w-1/2 sm:w-3/4'>
            <div className='w-full xl:w-1/2 2xl:w-1/2 p-5'>
              <Formik
                initialValues={{
                  email:"",
                  password:"",
                  remember:""
                }}
                  onSubmit={values => {
                    handleSubmit(values)
                  }}>
          {({ setFieldValue,}) => (
                  <Form>
                    <label className="font-bold text-2xl sm:text-md ">Giriş Yap</label>
                    
                    <Input className="sm:text-xs" name="email" placeholder="ornek@gmail.com"/>
                    <Input className="sm:text-xs relative" name="password" type="password" placeholder="*********" />
                    <CheckBox className="line-clamp-1" name="remember" value="remember" label="Beni Hatırla"/>
                    <Button className="w-full rounded-2xl m-2 sm:text-xs" type="submit" variant="Purple" onClick={() =>console.log("Button clicked")}> Giriş</Button>
                    <p className='text-black/50 mt-5'>--- or ---</p>
                    <Button className="w-full rounded-2xl bg-white m-2 sm:text-xs" variant="TransparentButton" onClick={() =>console.log("Button clicked")}> Google ile oturum açın</Button>
                    <Button className="w-full rounded-2xl bg-white m-2 sm:text-xs mb-10" variant="TransparentButton" onClick={() =>console.log("Button clicked")}> Apple ile giriş yap</Button>
                    <Button className="w-full rounded-2xl bg-transparent  border-4 m-2 sm:text-xs" variant="TransparentButton" onClick={() =>console.log("Button clicked")}> Şifreni mi unuttun ? </Button>
                    <p className='mt-2'>Henüz bir hesabın yok mu?<NavLink to={"/signup"}><a className='font-bold text-blue-600'>Kaydol</a></NavLink></p>
                  </Form>
          )}
                </Formik>
            </div>
          </div>
          <ToastContainer/>
    </div>
    );

}