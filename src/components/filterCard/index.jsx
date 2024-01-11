import { Formik,Form } from 'formik';
import  Input  from '../Input/text';
import CheckBox from "../Input/checkbox"
import Button from "../button"
import React, { useEffect, useState } from 'react';
import { getAllBrand, getCategories } from '../../api';
import PropTypes from "prop-types";
import DropDown from '../Input/dropdown';

export default function FilterCard  (){
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState([]);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [selectedBrands, setSelectedBrands] = useState([]); // Track selected brands
  const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
  const [selectedStars, setSelectedStars] = useState([]); // Track selected stars
  const [selectedPrices, setSelectedPrices] = useState([]); // Track selected prices
  const [brandSearch, setBrandSearch] = useState(''); // Track brand search input
  const [categorySearch, setCategorySearch] = useState(''); // Track category search input


 const priceRanges = [
  { min: 0, max: 80, label: '0 TL - 80 TL' },
  { min: 80, max: 175, label: '80 TL - 175 TL' },
  { min: 175, max: 500, label: '175 TL - 500 TL' },
  { min: 500, max: 1500, label: '500 TL - 1500 TL' },
  { min: 1500, max: 12500, label: '1500 TL - 12500 TL' },
  { min: 12500, max: 600000, label: '12500 TL - 600000 TL' },
];
const productRatings = [
  { label: '4.5 Yıldız Ve Üzeri' },
  { label: '4 Yıldız Ve Üzeri' },
  { label: '3 Yıldız Ve Üzeri' },
  { label: '2 Yıldız Ve Üzeri' },
  { label: '1 Yıldız Ve Üzeri' },
];

const handleSubmit = (values) => {
  console.log(values)
  console.log("barndsssss",selectedBrands)
  console.log("catego",selectedCategories)
  console.log("prices",selectedPrices)
  console.log("star",selectedStars)
};

useEffect(() => {
  getAllBrand()
    .then((result) => {
      // Filter brands based on search input
      const filteredBrands = result?.data.data.filter((brand) =>
        brand.name.toLowerCase().includes(brandSearch.toLowerCase())
      );
      setBrands(filteredBrands || []);
    })
    .catch((err) => console.log(err));
}, [brandSearch]);

useEffect(() => {
  getCategories()
    .then((result) => {
      // Filter categories based on search input
      const filteredCategories = result?.data.data.filter((cat) =>
        cat.name.toLowerCase().includes(categorySearch.toLowerCase())
      );
      setCategory(filteredCategories || []);
    })
    .catch((err) => console.log(err));
}, [categorySearch]);

 return (
    
      <div className='mr-5 grid sm:grid-cols-none'>
         <Formik
            initialValues={{
              brand: [],
              category: [],
              star:[],
              price:[],
              min: "",
              max: "",
            }}
            onSubmit={(values,{ setSubmitting }) => {
              handleSubmit(values,)
            }}>
      {({ setFieldValue,values}) => (
              <Form>
                <div className=' rounded-2xl overflow-y-scroll overflow-x-hidden'>


                    <div className='m-1'>
                        Markalar
                        <Input variant="primary" size="xsmall" className="w-3/5" name="brandSearch" placeholder="Markalarda Ara.."onChange={(e) => setBrandSearch(e.target.value)}></Input>
                        <div className='max-h-40 text-sm mr-5 overflow-y-scroll overflow-x-hidden rounded-lg p-1 '>
                            {brands.map((brand) => (
                              <div key={brand.id} className="p-1">
                                <input 
                                    type='checkbox'
                                    value={brand.id}
                                    name={brand.name}
                                    checked={selectedBrands.includes(brand.name)}
                                    onChange={(event) => {
                                      const checked = event.target.checked;
                                      setFieldValue("brand", checked ? [...values.brand, brand.name] : values.brand.filter((item) => item !== brand.name));
                                      setSelectedBrands((prevSelectedBrands) => {
                                        if (checked) {
                                          return [...(prevSelectedBrands || []), brand.name];
                                        } else {
                                          return (prevSelectedBrands || []).filter((item) => item !== brand.name);
                                        }
                                      });
                                    }}
                                  /> {brand.name}
                              </div>
                            ))}
                        </div>
                    </div>


                    <div  className='m-1 '>
                        Kategoriler
                        <Input variant="primary" size="xsmall" className="w-3/5" name="categorySearch" placeholder="Kategorilerde Ara.."onChange={(e) => setCategorySearch(e.target.value)}></Input>
                        <div className='max-h-40 text-sm  mr-5 overflow-y-scroll overflow-x-hidden rounded-lg p-1 '>
                            {category.map((cat) => (
                                <div key={cat.id}  className="p-1">
                                  <input 
                                    type='checkbox'
                                    value={cat.id}
                                    name={cat.name}
                                    checked={selectedCategories.includes(cat.name)}
                                    onChange={(event) => {
                                      const checked = event.target.checked;
                                      setFieldValue("category", checked ? [...values.category, cat.name] : values.category.filter((item) => item !== cat.name));
                                      setSelectedCategories((prevSelectedCategories) => {
                                        if (checked) {
                                          return [...(prevSelectedCategories || []), cat.name];
                                        } else {
                                          return (prevSelectedCategories || []).filter((item) => item !== cat.name);
                                        }
                                      });
                                    }}
                                  /> {cat.name}
                                </div>
                              ))}
                        </div>
                    </div>

                    <div className='m-1'>
                        Fiyat
                        <div className='max-h-60 text-sm mr-5 overflow-y-scroll overflow-x-hidden rounded-lg p-1'>
                          <div className='grid grid-cols-2 gap-2 self-center me-2'>
                            <Input className='h-6 text-sm' name="min" value={values.min || ''}onChange={(e) => setFieldValue('min', e.target.value)} placeholder="En Az:"></Input>
                            <Input className='h-6 text-sm' name="max" value={values.max || ''}onChange={(e) => setFieldValue('max', e.target.value)}placeholder="En Çok:"></Input>
                          </div>
                          <div className='max-h-40 text-md mr-5 overflow-y-scroll overflow-x-hidden rounded-lg p-1 '>
                            {priceRanges.map((price) => (
                                <div key={price.label}  className="p-1">
                                  <input  
                                    type='checkbox'
                                    value={price.label}
                                    name={price.label}
                                    checked={selectedPrices.includes(price.label)}
                                    onChange={(event) => {
                                      const checked = event.target.checked;
                                      setFieldValue("price", checked ? [...values.price, price.label] : values.price.filter((item) => item !== price.label));
                                      setSelectedPrices((prevSelectedPrices) => {
                                        if (checked) {
                                          return [...(prevSelectedPrices || []), price.label];
                                        } else {
                                          return (prevSelectedPrices || []).filter((item) => item !== price.label);
                                        }
                                      });
                                    }}
                                  /> {price.label}
                                </div>
                              ))}
                        </div>
                        </div>
                    </div>

                    <div  className='m-1 '>
                        Ürün Değerlendirmeleri
                        <div className='max-h-40 text-sm  mr-5 overflow-y-scroll overflow-x-hidden rounded-lg p-1 '>
                            {productRatings.map((rat) => (
                                <div key={rat.label}  className="p-1">
                                  <input 
                                    type='checkbox'
                                    value={rat.label}
                                    name={rat.label}
                                    checked={selectedStars.includes(rat.label)}
                                    onChange={(event) => {
                                      const checked = event.target.checked;
                                      setFieldValue("star", checked ? [...values.star, rat.label] : values.star.filter((item) => item !== rat.label));
                                      setSelectedStars((prevSelectedStars) => {
                                        if (checked) {
                                          return [...(prevSelectedStars || []), rat.label];
                                        } else {
                                          return (prevSelectedStars || []).filter((item) => item !== rat.label);
                                        }
                                      });
                                    }}
                                  /> {rat.label}
                                </div>
                              ))}
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
