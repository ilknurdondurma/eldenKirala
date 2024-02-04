// Layout.js

import React, { useEffect, useMemo, useState } from 'react';
import { Footer } from '../../components/footer';
import Navbar from '../../components/navbar'
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './index.css'

export function Layout  ({ children }) {
  const bellekteTutulanNavbar = useMemo(() => <Navbar />, []);
  const bellekteTutulanFooter = useMemo(() => <Footer />, []);

  return (
    <div>
      {bellekteTutulanNavbar}
        <main className='flex-grow min-h-screen main'>
          {children}
          <Outlet />
          </main>
      <footer>{bellekteTutulanFooter}</footer>
      
    </div>
  );
};
export function LayoutProfile({ children }) {
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
      <div className='flex flex-col m-5 py-5 '>
        <h1 className='text-2xl px-2 my-5'>Profilim</h1>
        <div className='grid grid-cols-4 gap-5 sm:grid-cols-1'>
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
          <div className='w-full  border-2 rounded-xl col-span-3'>
            {children}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}


export function AuthLayout  ({ children }) {
  const bellekteTutulanNavbar = useMemo(() => <Navbar />, []);
  const bellekteTutulanFooter = useMemo(() => <Footer />, []);

  return (
    <div>  
      {bellekteTutulanNavbar}
        <main className='flex-grow min-h-screen main'>
          {children}
          <Outlet />
          </main>
      <footer>{bellekteTutulanFooter}</footer>
      
    </div>
  );
};

export default AuthLayout