// Layout.js

import React, { useEffect, useMemo, useState } from 'react';
import { Footer } from '../../components/footer';
import Navbar from '../../components/navbar'
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './index.css'
import SendBox from '../../pages/chat/sendBox';
import Profile from '../../pages/profile';

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
export function ProfileLayout({ children }) {
  

  return (
    <div>
      <div className='flex flex-col m-5 py-5 '>
        <h1 className='text-2xl px-2 my-5'>Profilim</h1>
        <div className='grid grid-cols-4 gap-5 sm:grid-cols-1'>
          <Profile/>
          <div className='w-full  border-2 rounded-xl col-span-3'>
            {children}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
export function ChatLayout({ children }) {
  return (
    <div>
      <div className='flex flex-col m-5 py-5'>
        <div className='grid grid-cols-7 gap-5 sm:grid-cols-1'>
          <div className='col-span-2'>
            <SendBox />
          </div>
          <div className='w-full border-2 rounded-xl col-span-5'>
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