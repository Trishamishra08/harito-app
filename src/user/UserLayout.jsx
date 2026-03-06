import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/navbar/Navbar.jsx';
import Footer from '../shared/footer/Footer.jsx';

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <Navbar />
      <main className="flex-grow pt-0"> {/* Overlay permitted for hero sections */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
