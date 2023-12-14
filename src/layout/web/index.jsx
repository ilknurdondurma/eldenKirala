// Layout.js

import React from 'react';
import { Footer } from '../../components/footer';
import Navbar from '../../components/navbar'
import { Outlet } from 'react-router-dom';

export default function Layout  ({ children }) {
  return (
    <div>
      <Navbar/>
        <main className='flex-grow min-h-screen'>
          {children}
          <Outlet />
          </main>
      <footer><Footer/></footer>
      
    </div>
  );
};

