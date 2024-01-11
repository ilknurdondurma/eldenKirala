import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Formik, Form } from 'formik';
import Button from '../button';
import { getAllBrand, getCategories } from '../../api';

export default function FilterDropdown() {
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState([]);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [favorites, setFilteredFavorites] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]); // Track selected brands
  const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
  const [selectedStars, setSelectedStars] = useState([]); // Track selected stars
  const [selectedPrices, setSelectedPrices] = useState([]); // Track selected prices

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
    console.log(values);
    console.log('barndsssss', selectedBrands);
    console.log('catego', selectedCategories);
    console.log('prices', selectedPrices);
    console.log('star', selectedStars);
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
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='mr-5 grid sm:grid-cols-none'>
      <Formik
        initialValues={{
          brand: [],
          category: [],
          star: [],
          price: [],
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className='rounded-2xl flex my-5 border-t-2 border-b-2 z-10'>
              <div className='m-1 text-xs'>
                Markalar
                <Select
                  name='brand'
                  options={brands.map((brand) => ({
                    label: brand.name,
                    value: brand.id,
                  }))}
                  onChange={(selectedValues) => {
                    setFieldValue('brand', selectedValues);
                    setSelectedBrands(selectedValues.map((option) => option.label)); // Extract labels
                  }}
                  isMulti
                />
              </div>

              <div className='m-1 text-xs'>
                Kategoriler
                <Select
                  name='category'
                  options={category.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))}
                  onChange={(selectedValues) => {
                    setFieldValue('category', selectedValues);
                    setSelectedCategories(selectedValues.map((option) => option.label)); // Extract labels
                  }}
                  isMulti
                />
              </div>

              <div className='m-1 text-xs'>
                Fiyat
                <Select
                  name='price'
                  options={priceRanges.map((price) => ({
                    label: price.label,
                    value: price.label,
                  }))}
                  onChange={(selectedValues) => {
                    setFieldValue('price', selectedValues);
                    setSelectedPrices(selectedValues.map((option) => option.label)); // Extract labels
                  }}
                  isMulti
                />
              </div>

              <div className='m-1 text-xs'>
                Yıldız
                <Select
                  name='star'
                  options={productRatings.map((rating) => ({
                    label: rating.label,
                    value: rating.label,
                  }))}
                  onChange={(selectedValues) => {
                    setFieldValue('star', selectedValues);
                    setSelectedStars(selectedValues.map((option) => option.label)); // Extract labels
                  }}
                  isMulti
                />
              </div>

              <div className='m-1 mx-4 text-sm flex flex-col justify-center'>
                <Button type='submit' size='xsmall'>
                  Filtrele
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
