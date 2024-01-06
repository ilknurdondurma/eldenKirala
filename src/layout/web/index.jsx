// Layout.js

import React, { useMemo } from 'react';
import { Footer } from '../../components/footer';
import Navbar from '../../components/navbar'
import { Outlet } from 'react-router-dom';
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