import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import Input from '../Input/text';
import Button from '../button';
import { getCategories } from '../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { VscAccount,VscMenu } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { FcCamera } from "react-icons/fc";
import { AiOutlineLogout } from "react-icons/ai";
import '../../layout/web/index'
import { useAuth } from '../../context/authContext/authContext';
import { debounce } from 'lodash';
import { MdFavoriteBorder} from "react-icons/md";


const Navbar =React.memo( () => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const {user , setUser }=useAuth();
  const [categories ,setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);


  const handleScroll = () => {
      // Sayfa kaydıkça arkaplan opaklığını güncelle
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const newOpacity = Math.min(scrollY+1 / 100, 1); // İstediğiniz opaklık değerini belirleyebilirsiniz
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
 const returnHomeHandle =()=>{
  navigate("/")
 }
  const navigate=useNavigate();
  const handleLogout = () => {
    setUser(false);
    setTimeout(() => {
      navigate("/login",{replace:true});
    }, 2000);
  };
  
  useEffect(() => {
    const gecikmeliHandleScroll = debounce(handleScroll, 200);
    getCategories()
      .then((result) => {
        setCategories(result?.data.data);
        console.log("kategoriler: " + categories);
      })
      .catch((error) => {
        console.log(error);
      });
  
    window.addEventListener('scroll', gecikmeliHandleScroll);
    setBackgroundOpacity(1);
    return () => {
      // Sayfa kapatıldığında dinleyiciyi temizleyin
      window.removeEventListener('scroll', gecikmeliHandleScroll);
      window.removeEventListener('wheel', gecikmeliHandleScroll);
      gecikmeliHandleScroll.cancel();
    };
  }, []);
  

  return (
    <nav className=" w-full h-auto mb-44 sm:mb-32">
      <div className={`w-full h-auto main fixed top-0 left-0 z-10 opacity-${Math.floor(backgroundOpacity * 100)}`}>
              {/**logo arama giriş yap sepet */}
            <div className=" sabit grid grid-cols-9 ">
                
                {/* Logo */}
                <div className="col-span-2 sm:col-span-2" onClick={returnHomeHandle}>
                  <img src="/logo.png" alt="logo" className="w-auto  max-h-32 "/>
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
                  {user ?(
                    <NavLink to={"/post"} className="border border-1 text-center rounded-md ">
                    <Button className=" md:m-1 sm:m-1 text-2xl  sm:text-md hover:shadow-none" variant="TransparentButton">
                      <FcCamera size="20px" />
                    </Button>
                    <div className='p-0 m-0 text-lg md:text-md sm:text-xs'>İlan Ver</div>
                  </NavLink>
                  ):("")
                  }
                  <NavLink to={"/favorites"}>
                    <Button className="p-3 md:p-1 sm:p-1 text-xl sm:text-sm hover:shadow-none" variant="TransparentButton">
                        <MdFavoriteBorder/>
                    </Button>
                  </NavLink>



                  {!user ? (
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
                  <NavLink to={"/profile/hesabim"}>
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
            <div className={`flex justify-center sm:hidden`}>
              {/**&& category.subCategories.length > 0 */}
                {categories.map((category, index) => (
                  (category.subCategories && category.subCategories.length > 0 ) && (
                  <div key={index} className="relative">
                      <NavLink to={`/categories/${category.id}`}>
                        <Button
                          key={index}
                          className="shadow-md mx-2"
                          size="small"
                          variant="TransparentButton"
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {category.name}
                        </Button>
                      </NavLink>
                      
                    {hoveredCategory === index && category.subCategories && category.subCategories.length > 0 &&(
                      <div className="absolute top-0 left-0 mt-8  w-60  border bg-gray-100 z-10" onMouseEnter={() => handleMouseEnter(index)}onMouseLeave={handleMouseLeave}>
                        {category.subCategories.map((sub, subIndex) => (
                          <NavLink to={`/categories/${sub.id}`} className="hover:shadow-sm flex flex-col">
                              <Button key={subIndex} variant="TransparentButton" className="self-start text-md hover:shadow-none">
                                  {sub.name}
                            </Button>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                  )
                  )).slice(0,8)}

                  
            </div>
            
            {/* sm Kategori dropdown  */}
            <div className={`hidden sm:block text-center `} onClick={menuHandle}>
                <span className='text-xl '>
                  <Button className="p-3 md:p-3 sm:p-1 text-3xl hover:shadow-none" variant="TransparentButton">
                    <VscMenu />
                  </Button>
                </span>
                Kategoriler
            </div>

            {/** Tüm Kategori Alanı */}
            <div className='flex justify-center m-1'>
                <div className={`${isCategoryVisible ? 'block shadow-md' : 'hidden'} w-3/4 text-left grid grid-cols-5 md:grid-cols-2 sm:w-full sm:grid-cols-2`}>
                  {categories.map((category) => (
                    <div className='block py-5 px-10' key={category.id}>
                      <NavLink to={`/categories/${category.id}`} className="font-bold hover:underline ">
                        {category.name}
                      </NavLink>
                      <div>
                        
                      {category.subCategories.length > 0 ? (
                          category.subCategories.map((subCategory) => (
                            <NavLink to={`/categories/${subCategory.id}`} className="block hover:underline text-left py-1" key={subCategory.id}>
                              {subCategory.name}
                            </NavLink>
                          ))
                        ) : (
                          <span>Alt kategori bulunmamaktadır.</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
            </div>
      </div>
    </nav>
  );
});

export default Navbar;