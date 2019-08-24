import React from 'react';

import Header from '../Components/header_footer/Header';
import Footer from '../Components/header_footer/Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
