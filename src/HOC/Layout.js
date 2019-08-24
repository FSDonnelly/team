import React from 'react';

import Header from '../Components/header_footer/Header';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
