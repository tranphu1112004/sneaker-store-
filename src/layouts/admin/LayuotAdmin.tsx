import React from 'react';
import HeaderAdmin from './HeaderAdmin';
import Sibar from './Sibar';
import { Outlet } from 'react-router-dom';
import FooterAdmin from './FooterAdmin';

const LayoutAdmin = () => {
  return (
    <div className="  min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-[1fr_3.8fr]">
      {/* Header taking full width */}
      <HeaderAdmin className="row-start-1 z-10  row-end-2 col-span-full" />
      
      {/* Sibar taking 1/4 of the page width */}
      <Sibar className="pt-14 row-start-2 row-end-3   col-start-1 col-end-2 " />
      
      {/* Outlet taking the remaining 3/4 of the page width */}
      <div className="pt-20 shadow row-start-2 row-end-3 col-start-2 col-end-3 p-4">
        <Outlet />
      </div>
      
      {/* Footer taking full width */}
      <FooterAdmin className="Z- row-start-3 row-end-4 col-span-full" />
    </div>
  );
};

export default LayoutAdmin;
