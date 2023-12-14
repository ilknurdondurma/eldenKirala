import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import Input from '../Input/text';
import Button from '../button';
import { getCategories } from '../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { VscAccount,VscMenu } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);         //token kontrol
  const [categories ,setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);

  const handleScroll = () => {
    // Sayfa kaydıkça arkaplan opaklığını güncelle
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const newOpacity = Math.min(scrollY / 100, 1); // İstediğiniz opaklık değerini belirleyebilirsiniz
    setBackgroundOpacity(newOpacity);
  };

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
    setIsSearchVisible(!isSearchVisible);
  };
  const navigate=useNavigate();
  const handleLogout = () => {
    // localStorage'deki tokeni sil
    localStorage.removeItem('token');

    // login sayfasına yönlendir
    navigate('/login',{replace:true});
  };

  const token = localStorage.getItem('token');
  useEffect(() => {
    setIsLoggedIn(!!token); // Token varsa isLoggedIn true, yoksa false olacak
    getCategories()
    .then((result)=>{
        setCategories(result?.data.data)
        console.log("kategoriler: "+categories)
    })
    .catch((error)=>{
        console.log(error)
    })
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Sayfa kapatıldığında dinleyiciyi temizleyin
      window.removeEventListener('scroll', handleScroll);
    };

}, [setIsLoggedIn],)

  return (
    <nav className=" w-full h-auto mb-72">
      <div className={`w-full h-auto bg-white fixed top-0 left-0 z-10 opacity-${Math.floor(backgroundOpacity * 100)}`}>
              {/**logo arama giriş yap sepet */}
            <div className=" sabit grid grid-cols-9 ">
                
                {/* Logo */}
                <div className="col-span-2 sm:col-span-2">
                  <img src="/logo.png" alt="logo" className="w-auto  max-h-32 " />
                </div>

                {/* Arama */}
                <div className="col-span-4 flex flex-col justify-center sm:hidden">
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

              {/** tüm kategori butonu  */}
                <div className='col-span-1 text-black/70 sm:hidden text-xl  ps-3 m-1 flex flex-col justify-center hover:font-medium' onClick={menuHandle}> 
                      <span className='text-xl md:text-md '>
                        <Button className="p-3 md:p-3 sm:p-1 text-xl sm:text-sm hover:shadow-none" variant="TransparentButton">
                          <VscMenu />
                        </Button>
                      </span>
                </div>

                {/* Sepet, Giriş Yap, Üye Ol , ekle */}
                <div className="col-span-2 sm:col-start-8 flex flex-row justify-end items-center ps-4 space-x-4">
                  <Button className="p-3 md:p-3 sm:p-1 text-xl sm:text-sm hover:shadow-none hidden sm:block" variant="TransparentButton" onClick={searchHandle}>
                      <CiSearch />
                  </Button>
                  <NavLink to={"/post"}>
                    <Button className="p-3 md:p-3 sm:p-1 text-xl  sm:text-sm hover:shadow-none" variant="TransparentButton">
                      <MdOutlineAddToPhotos />
                    </Button>
                  </NavLink>
                  <NavLink to={"/cart"}>
                    <Button className="p-3 md:p-3 sm:p-1 text-xl sm:text-sm hover:shadow-none" variant="TransparentButton">
                        <IoCartOutline />
                    </Button>
                  </NavLink>



                  {!isLoggedIn ? (
                    <>
                      <NavLink to={"/login"}>
                        <Button className="max-w-xs text-sm md:text-sm sm:text-xs hover:shadow-lg" variant="Purple">
                          Giriş Yap
                        </Button>
                      </NavLink>
                      <NavLink to={"/signup"}>
                        <Button className="max-w-xs text-sm md:text-sm sm:text-xs hover:shadow-lg" variant="PurpleOutline">
                          Üye Ol
                        </Button>
                      </NavLink>
                    </>
                  ) : 
                  <>
                  <NavLink to={"/profile"}>
                    <Button className="p-3 md:p-3 sm:p-1 text-xl sm:text-sm hover:shadow-none" variant="TransparentButton">
                      <VscAccount />
                    </Button>
                  </NavLink>
                  <NavLink to={"/login"}>
                    <Button className="p-3 md:p-3 sm:p-1 text-xl sm:text-sm hover:shadow-none" variant="TransparentButton" onClick={handleLogout}>
                      <AiOutlineLogout />
                    </Button>
                </NavLink>
                  </>
                      }
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
              {/**&& category.subCategories.length > 0 */}
                {categories.map((category, index) => (
                  (category.subCategories && category.subCategories.length > 0 ) && (
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
                      <div className="absolute top-0 left-0 mt-9  w-52  border bg-gray-100 z-10" onMouseEnter={() => handleMouseEnter(index)}onMouseLeave={handleMouseLeave}>
                        {category.subCategories.map((sub, subIndex) => (
                          <NavLink to={`/categories/${sub.id}`} className="hover:shadow-sm">
                              <Button key={subIndex} variant="TransparentButton" className="line-clamp-1 text-start text-lg hover:shadow-none">
                                  {sub.name}
                            </Button>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                  )
                  )).slice(0,6)}

                  
            </div>
            
            {/* sm Kategori dropdown  */}
            <div className='hidden sm:block text-center' onClick={menuHandle}>
                <span className='text-xl '>
                  <Button className="p-3 md:p-3 sm:p-1 text-3xl hover:shadow-none" variant="TransparentButton">
                    <VscMenu />
                  </Button>
                </span>
                Kategoriler
            </div>

            {/** Tüm Kategori Alanı */}
            <div className='flex justify-center m-10'>
                <div className={`${isCategoryVisible ? 'block shadow-md' : 'hidden'} w-3/4 text-left grid grid-cols-5 md:grid-cols-2 sm:w-full sm:grid-cols-2`}>
                  {categories.map((category, index) => (
                    <div className='block' key={index}>
                      <NavLink to={`/categories/${category.id}`} className="font-bold hover:underline">
                        {category.name}
                      </NavLink>
                      <div>
                        {/* Assuming subCategories is an array */}
                        {category.subCategories.map((subCategory, subIndex) => (
                          <NavLink to={`/categories/${subCategory.id}`} className="block hover:underline text-left py-1" key={subIndex}>
                            {subCategory.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
            </div>
      </div>


      

    </nav>
  );
};

export default Navbar;
