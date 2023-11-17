import React from 'react'
import Layout from '../../layout/web'
import Input from '../../components/Input/text';
import Button from '../../components/button';
import { Form, Formik } from 'formik';

function Login() {
  const handleSubmit=()=>{

  }
  return (
    <Layout>
    <div className='loginForm flex justify-center p-10 sm:p-2'>
          <div className='flex justify-center text-center border rounded-2xl bg-my_border_color/90 w-1/2 sm:w-3/4'>
            <div className='w-full xl:w-1/2 2xl:w-1/2 p-5'>
              <Formik
                initialValues={{
                  ad:"",
                  soyad:"",
                  opt1:""

                }}
                  onSubmit={values => {
                    handleSubmit(values)
                  }}>
          {({ setFieldValue,}) => (
                  <Form>
                    <label className="font-bold text-2xl sm:text-xs">Giriş Yap</label>
                    <Button className="w-full rounded-2xl bg-white m-2 sm:text-xs" variant="TransparentButton" onClick={() =>console.log("Button clicked")}> Google ile oturum açın</Button>
                    <Button className="w-full rounded-2xl bg-white m-2 sm:text-xs mb-10" variant="TransparentButton" onClick={() =>console.log("Button clicked")}> Apple ile giriş yap</Button>
                    <p className='text-black/50'>--- or ---</p>
                    <Input className="sm:text-xs" name="email" placeholder="ornek@gmail.com"/>
                    <Input className="sm:text-xs" name="password" placeholder="*********" />
                    <Button className="w-full rounded-2xl m-2 sm:text-xs" type="submit" variant="Purple" onClick={() =>console.log("Button clicked")}> Giriş</Button>
                    <Button className="w-full rounded-2xl bg-transparent  border-4 m-2 sm:text-xs" variant="TransparentButton" onClick={() =>console.log("Button clicked")}> Şifreni mi unuttun ? </Button>
                    <p className='mt-5'>Henüz bir hesabın yok mu?<a className='font-bold text-blue-600'>Kaydol</a></p>
                  </Form>
          )}
                </Formik>
            </div>
          </div>
    </div>
    </Layout>
  )
}

export default Login

