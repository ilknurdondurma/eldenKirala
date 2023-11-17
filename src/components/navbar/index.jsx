import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import Input from '../Input/text';
import Button from '../button';
import SelectBox from '../Input/dropdown'
import { getCategories } from '../../api';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  const [categories ,setCategories] = useState([]);

  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredCategory(index);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };
  const menuHandle =()=>{
    setIsCategoryVisible(!isCategoryVisible);
  }
  const searchHandle = () => {
    setIsSearchVisible(!isSearchVisible); // Toggle search visibility

  };
  
  useEffect(() => {
    getCategories()
    .then((result)=>{
        setCategories(result?.data.data)
        console.log("kategoriler: "+categories)
    })
    .catch((error)=>{
        console.log(error)

    })
}, [])

  return (
    <nav className=" w-full h-auto">
      {/**logo arama giriş yap sepet */}
      <div className="grid grid-cols-6 ">
        {/* Logo */}
        <div className="col-span-1 sm:col-span-2">
          <img src="/logo.png" alt="logo" className="w-auto  min-h-24 " />
        </div>

        {/* Arama */}
        <div className="col-span-3 flex flex-col justify-center sm:hidden">
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
                <div className='p-1'>
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
        <div className="col-span-2 sm:col-start-5 flex flex-row justify-end items-center ps-4 space-x-4">
          <button className="searchButton p-3 md:p-3 sm:p-1 text-2xl hidden sm:block " onClick={searchHandle}> ⌕  </button>
          <NavLink to={"/cart"}><button className='p-5 md:p-3 sm:p-1 text-2xl hover:shadow-xl'>🛒</button></NavLink>
          <NavLink to={"/login"}><Button className="max-w-xs md:text-sm sm:text-xs hover:shadow-lg" variant="Purple">Giriş Yap</Button></NavLink>
          <NavLink to={"/signup"}><Button className="max-w-xs md:text-sm sm:text-xs" variant="PurpleOutline">Üye Ol</Button></NavLink>
        </div>
      </div>

        {/* sm search alanı*/}
      <div className={`${isSearchVisible ? 'block' : 'hidden'}`}>
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
                          <div className='p-1'>
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


      {/* Kategoriler*/} 
      <div className="flex justify-center sm:hidden">
          {categories.map((category, index) => (
            (category.subCategories && category.subCategories.length > 0) && (
            <div key={index} className="relative">
                <NavLink to={`/categories/${category.id}`}>
                  <Button
                  key={index}
                  className="shadow-md mx-2"
                    variant="TransparentButton"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {category.name}
                  </Button>
                </NavLink>
              {hoveredCategory === index && category.subCategories && category.subCategories.length > 0 &&(
                <div className="absolute top-0 left-0 mt-10  w-48  border bg-my_border_color/10" onMouseEnter={() => handleMouseEnter(index)}onMouseLeave={handleMouseLeave}>
                  {category.subCategories.map((sub, subIndex) => (
                    <NavLink to={`/categories/${category.id}/${sub.id}`}>
                        <Button key={subIndex} variant="TransparentButton">
                            {sub.subCategoryName}
                       </Button>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
            )
             )).slice(0,6)}

            <div className=' text-black/70 text-center text-2xl ps-3 m-1 hover:font-medium' onClick={menuHandle}>
              ☰ 
              <span className='text-xl'> Kategoriler </span>
            </div> 
      </div>
      
      {/* sm Kategori dropdown  */}
      <div className='hidden sm:block text-center mt-5' onClick={menuHandle}>
          <span className='text-2xl '>☰ </span>
          Kategoriler
      </div>

      {/** sm Kategori Alanı */}
      <div className={`${isCategoryVisible ? 'block' : 'hidden'} grid grid-cols-4 sm:grid-cols-2 bg-my_border_color/10`}>
            {categories.map((categories,index)=>(
              <NavLink to={`/categories/${categories.id}`}><Button variant="TransparentButton" className="hover:shadow-sm">{categories.name}</Button></NavLink>
            ))}
      </div>

      

    </nav>
  );
};

export default Navbar;
