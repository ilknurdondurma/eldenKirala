import React, { useState } from 'react'
import Input from '../../components/Input/text';
import Button from '../../components/button';
import { Form, Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi'; 
import CheckBox from '../Input/checkbox';
export default function LoginForm({}){
    const handleSubmit=(values)=>{
      console.log(values);

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
    </div>
    );

}