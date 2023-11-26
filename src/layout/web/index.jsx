// Layout.js

import React from 'react';
import { Footer } from '../../components/footer';
import Navbar from '../../components/navbar'
import { Outlet } from 'react-router-dom';

export default function Layout  ({ children }) {
  return (
    <div>
      <Navbar/>
        <main>
          {children}
          <Outlet />
          </main>
      <Footer/>
      
    </div>
  );
};

