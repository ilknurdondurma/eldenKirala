import React, { useState } from 'react';

const FilterComponent = () => {
 const [brand, setBrand] = useState('');
 const [category, setCategory] = useState('');
 const [minPrice, setMinPrice] = useState('');
 const [maxPrice, setMaxPrice] = useState('');
 const [gender, setGender] = useState('');
 const [color, setColor] = useState('');
 const [packagingType, setPackagingType] = useState('');

 const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the filtering logic here
 };

 return (
    <div>
        {/* <Formik
            validationSchema={signupSchema}
            initialValues={{
              email:"",
              password:"",
              password2: "",
              remember:"",
              terms:"",
              city:"",
              district:""

            }}
            onSubmit={(values,{ setSubmitting }) => {
              handleSubmit(values,setSubmitting)
            }}>
      {({ setFieldValue,isSubmitting}) => (
              <Form>
                <label className="">180 Sonuç listeleniyor</label>
                <div className='grid grid-cols-2 gap-1'>
                    <DropDown
                      placeholder="Şehir"
                      name="city"
                      options={cities}
                      onChange={(selectedValue) => {
                        console.log("Seçilen değer:", selectedValue);
                        setFieldValue("city", selectedValue);
                        setSelectedCity(selectedValue);
                        
                    }}
                    />
                  {selectedCity && (
                    <DropDown
                      placeholder='İlçe'
                      name='district'
                      options={districts[selectedCity]}
                      onChange={(selectedValue) => {
                        console.log("Seçilen ilçe:", selectedValue);
                        setFieldValue("district", selectedValue);
                      }}
                    />
                  )}
                  
                    
                </div>
                <Input className="sm:text-xs relative" name="password" type="password" placeholder="Şifre" />
                <Input className="sm:text-xs relative" name="password2" type="password" placeholder="Şifreyi Tekrar Gir" />
                <CheckBox className="line-clamp-1" name="remember" value="remember" label="Beni Hatırla"/>
                <CheckBox className="" name="terms" value="terms" label="Kaydolarak, Koşullarımızı, Gizlilik İlkemizi ve Çerezler İlkemizi kabul etmiş olursun."/>
                <Button
                      className={`w-full rounded-2xl m-2 sm:text-xs ${{isSubmitting} ? '' : 'opacity-50'} `}
                      type="submit"
                      variant="Purple"
                      
                    >
                      {isSubmitting ? "Hesap Oluşturuluyor..." : "Hesap Oluştur"}
                    </Button>                <p className='text-black/50 mt-5'>--- or ---</p>
                <Button className="w-full rounded-2xl bg-white m-2 sm:text-xs" variant="TransparentButton" onClick={() =>console.log("Button clicked")}> Google ile kaydolun </Button>
                <Button className="w-full rounded-2xl bg-white m-2 sm:text-xs mb-10" variant="TransparentButton" onClick={() =>console.log("Button clicked")}> Apple ile kaydol</Button>
                <p className='mt-2'>Zaten bir hesabın var mı ? <a href='/login' className='font-bold text-blue-600' >Giriş yap</a></p>
        
              </Form>
      )}
            </Formik> */}
    </div>
 );
};

export default FilterComponent;