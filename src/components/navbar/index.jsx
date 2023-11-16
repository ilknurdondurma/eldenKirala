import React from 'react';
import { Form, Formik } from 'formik';
import Input from '../Input/text';
import Button from '../button';

const Navbar = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <nav className="bg-primary/40 w-full h-auto">
      {/**logo arama giriş yap sepet */}
      <div className="grid grid-cols-6 text-center">
        {/* Logo */}
        <div className="col-span-1">
          <img src="/logo.png" alt="logo" className="w-auto h-36" />
        </div>

        {/* Arama */}
        <div className="col-span-3 flex flex-col justify-center">
          <Formik
            initialValues={{
              search: ''
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className='p-2'>
                  <Input
                    name="search"
                    variant="secondary"
                    placeholder="Search..."
                  ></Input>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Sepet, Giriş Yap, Üye Ol */}
        <div className="col-span-2 flex flex-row justify-end items-center ps-4 space-x-4">
          <button className='p-5 text-2xl'>🛒</button>
          <Button className="max-w-xs" variant="Purple">Giriş Yap</Button>
          <Button className="max-w-xs" variant="PurpleOutline">Üye Ol</Button>
        </div>
      </div>

      {/* Kategoriler (Side Navbar) */}
      <div className='hidden md:block text-center mt-4'>
        {/* Burada kategorilere ait içerikleri ekleyebilirsiniz */}
        Kategoriler
      </div>
    </nav>
  );
};

export default Navbar;
