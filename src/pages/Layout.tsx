import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../components/main-components/Footer';
import Header from '../components/main-components/Header';

function Layout() {
  return (
    <div className="div-body-style">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Layout;
