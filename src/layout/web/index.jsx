// Layout.js

import React from 'react';
import { Footer } from '../../components/footer';
import {Navbar} from '../../components/navbar'

export function Layout  ({ children }) {
  return (
    <div>
      <Navbar/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
};

