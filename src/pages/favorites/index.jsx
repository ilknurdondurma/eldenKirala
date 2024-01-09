import React, { useEffect, useState } from 'react';
import { getFavoritesByUserId } from '../../api';
import errorMessage from '../../helper/toasts/errorMessage';
import { useAuth } from '../../context/authContext/authContext';
import { ProductCard } from '../../components/productCard';
import { MdFavorite,MdDelete} from "react-icons/md";
import { Link } from 'react-router-dom';
import Button from '../../components/button';
import FilterComponent from '../../components/filterCard';

function Favorites() {
  const {user}=useAuth();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser ? storedUser.id : null;
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [activeButton, setActiveButton] = useState('all'); // Durumu ekledik

  useEffect(() => {
    window.scrollTo(0, 0);
    getFavoritesByUserId(userId)
      .then((result)=>{
        console.log(result?.data.data);
        setFavorites(result?.data.data);
        setFilteredFavorites(result?.data.data);
      })
  }, [userId]);
  const buttons = [
    { key: 'all', label: 'Tüm Favoriler' },
    { key: 'priceDrop', label: 'Fiyatı Düşenler' },
    { key: 'notRented', label: 'Kirada Olmayanlar' },
    { key: 'rented', label: 'Kirada Olanlar' },
  ];
  const filterFavorites = (filterType) => {
    switch (filterType) {
      case 'all':
        setFilteredFavorites(favorites);
        break;
      case 'priceDrop':
        // Burada fiyatı düşenleri filtreleme mantığı ekleyebilirsiniz.
        // Örneğin, fiyatı düşen ürünleri sıralayabilir veya bir filtreleme işlemi uygulayabilirsiniz.
        // setFilteredFavorites(filteredData); // Filtrelenmiş verileri set etmek
        break;
      case 'notRented':
        setFilteredFavorites(favorites.filter(fav => fav.isActive === true));
        
        break;
      case 'rented':
        setFilteredFavorites(favorites.filter(fav => fav.isActive === false));
        
        break;
      default:
        break;
    }
    setActiveButton(filterType); 
  };

  return (
    <div className='grid grid-cols-5 m-5 '>
      <div><FilterComponent/></div>
      <div className='col-span-4 col-start-2 self-end'>
          {/* baslık */}
          <div className=' '>
            <div className=' text-xl flex mb-1 border-b-2 font-sans'><MdFavorite className='mx-2' color=''/> Favorilerim  </div>
            <div className=' sm:w-full   mb-10 gap-5 grid grid-cols-8 md:grid-cols-4 border-b-2 sm:grid-cols-2'>
              {buttons.map(button => (
                  <Button
                    key={button.key}
                    className={`p-5 m-1  rounded-lg my-5 justify-start ${activeButton === button.key ? 'underline font-extrabold' : ''}`}
                    size="small"
                    variant={activeButton === button.key ? 'Green' : 'GreenOutline'}
                    onClick={() => filterFavorites(button.key)}
                  >
                    {button.label}
                  </Button>
                ))}
            </div>
          </div>
          {/* ürünler */}
          <div className='flex p-1 '>
            <div className='grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 gap-5 md:grid-cols-3 sm:grid-cols-2 sm:w-full'>
              {filteredFavorites.map((fav) => (
                    <ProductCard 
                      key={fav.id}
                      product={fav}
                      route={`/product/${fav.productId}`}
                      icon={"delete"}
                    />
                    ))}
                </div>
          </div>
      </div>
    </div>
    
)}

export default Favorites
