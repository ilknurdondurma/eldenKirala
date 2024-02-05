import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';

function Profile() {
    const sidebarElements = [
        {
          id: 1,
          title: 'Hesabım',
          route: 'hesabim',
        },
        {
          id: 2,
          title: 'Bildirim Tercihlerim',
          route: 'bildirim-tercihlerim',
        },
        {
          id: 3,
          title: 'Güvenlik',
          route: 'guvenlik',
        },
        {
          id: 4,
          title: 'Adres Düzenle',
          route: 'adres-duzenle',
        },
      ];
    
      const location = useLocation();
      const [active, setActive] = useState('');
    
      useEffect(() => {
        // Extract the route from the location pathname
        const currentRoute = location.pathname.split('/').pop();
        setActive(currentRoute);
      }, [location.pathname]);
  return (
    <div>
      <div className='w-full  col-span-1 flex flex-col'>
            {sidebarElements.map((menu) => (
              <NavLink key={menu.id} to={`/profile/${menu.route}`}>
                <div
                  className={`flex justify-end m-2 border-2 rounded-xl p-1 px-2 hover:bg-primary hover:text-white active:bg-primary ${
                    active === menu.route ? 'bg-primary text-white' : ''
                  }`}
                  onClick={() => setActive(menu.route)}
                >
                  {menu.title}
                </div>
              </NavLink>
            ))}
          </div>
    </div>
  )
}

export default Profile
