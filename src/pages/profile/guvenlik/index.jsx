import React, { useState } from 'react'
import Button from '../../../components/button/index'
import PhoneInput from 'react-phone-number-input';

import 'react-phone-number-input/style.css';

function Guvenlik() {
  const [phoneNumber, setPhoneNumber] = useState();

  return (
    <div className='flex flex-col p-3'>
      <div className='my-3 self-center'>Çift Faktörlü Korumayı Etkinleştirmek İçin Telefon Numarası Giriniz.</div>
      <div className='self-center m-2 mb-5'><CustomPhoneInput value={phoneNumber} onChange={setPhoneNumber} /></div>
      <Button className="w-24 self-center">Etkinleştir</Button>
    </div>
  )
}

export default Guvenlik


const CustomPhoneInput = ({ value, onChange }) => {
  return (
    <div className='h-full'>
      <label htmlFor="phone" className='flex justify-center'>Telefon Numarası:</label>
      <PhoneInput
      className='border-2  h-16 rounded-full px-3'
        id="phone"
        name="phone"
        placeholder="Telefon numaranızı girin"
        value={value}
        onChange={onChange}
        defaultCountry="TR" // Türkiye için varsayılan ülke kodu
      />
    </div>
  );
};

