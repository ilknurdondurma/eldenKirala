import { Formik,Form } from 'formik';
import  Input  from '../Input/text';
import CheckBox from "../Input/checkbox"
import Button from "../button"
import React, { useEffect, useState } from 'react';
import { getAllBrand, getCategories } from '../../api';

const FilterComponent = () => {
 const [brands, setBrands] = useState([]);
 const [category, setCategory] = useState([]);
 const [minPrice, setMinPrice] = useState();
 const [maxPrice, setMaxPrice] = useState();
 const [favorites, setFilteredFavorites] = useState([]);

 const priceRanges = [
  { min: 0, max: 80, label: '0 TL - 80 TL' },
  { min: 80, max: 175, label: '80 TL - 175 TL' },
  { min: 175, max: 500, label: '175 TL - 500 TL' },
  { min: 500, max: 1500, label: '500 TL - 1500 TL' },
  { min: 1500, max: 12500, label: '1500 TL - 12500 TL' },
  { min: 12500, max: 600000, label: '12500 TL - 600000 TL' },
];
 


const handleSubmit = (values) => {
  console.log(values)
};

 useEffect(() => {
  getAllBrand()
    .then((result) => {
      setBrands(result?.data.data || []);
    })
    .catch((err) => console.log(err));


    getCategories()
      .then((result) => {
        setCategory(result?.data.data || []);
      })
      .catch((err)=> console.log(err));
}, []);

 return (
    <div className='mr-5 grid sm:grid-cols-none'>
         <Formik
            initialValues={{
              min:"",
              max:"",
              priceRange:"",
              selectedBrands: [],
              selectedCategories: [],

            }}
            onSubmit={(values,{ setSubmitting }) => {
              handleSubmit(values,)
            }}>
      {({ setFieldValue,values}) => (
              <Form>
                <div className=' rounded-2xl overflow-y-scroll overflow-x-hidden'>


                    <div className='m-1'>
                        Markalar
                        <Input variant="primary" size="xsmall" className="w-4/5" name="brandSearch" placeholder="Markalarda Ara.."></Input>
                        <div className='max-h-52 m-5 overflow-y-scroll overflow-x-hidden rounded-lg p-1 '>
                            {brands.map((brand) => (
                                <div key={brand.id}  className="">
                                  <CheckBox name={brand.name} value="selectedBrands" label={brand.name} onChange={(checked) => {
                                      setFieldValue(`selectedBrands.${brand.name}`, checked);
                                    }} />
                                </div>
                              ))}
                        </div>
                    </div>


                    <div  className='m-1 '>
                        Kategoriler
                        <Input variant="primary" size="xsmall" className="w-4/5" name="categorySearch" placeholder="Kategorilerde Ara.."></Input>
                        <div className='max-h-60  m-5 overflow-y-scroll overflow-x-hidden rounded-lg p-1 '>
                            {category.map((cat) => (
                                <div key={cat.id}  className="">
                                  <CheckBox name={cat.name} value="selectedCategories" label={cat.name} onChange={(checked) => {
                                      setFieldValue(`selectedCategories.${cat.name}`, checked);
                                    }}/>
                                </div>
                              ))}
                        </div>
                    </div>

                    <div>
                        Fiyat
                        <div className='max-h-60 m-5 overflow-y-scroll overflow-x-hidden rounded-lg p-1'>
                          <div className='grid grid-cols-2 gap-2 self-center me-2'>
                            <Input className='h-6 text-sm' name="min" placeholder="En Az:"></Input>
                            <Input className='h-6 text-sm' name="max" placeholder="En Çok:"></Input>
                          </div>
                          <div >
                              {priceRanges.map((range) => (
                                <div key={range.label}>
                                  <input
                                    className='m-2'
                                    type='radio'
                                    id={`priceRange_${range.label}`}
                                    name='priceRange'
                                    value={range.label}
                                    checked={values.priceRange === range.label}
                                    onChange={() => setFieldValue('priceRange', range.label)}
                                  />
                                  <label htmlFor={`priceRange_${range.label}`}>{range.label}</label>
                                </div>
                              ))}
                          </div>
                        </div>
                    </div>

                            <Button type="submit">Filtrele</Button>
                </div>
                               
              </Form>
      )}
            </Formik>
    </div>
 );
};

export default FilterComponent;
