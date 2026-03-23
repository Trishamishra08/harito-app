import React, { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider } from './data/DataContext.jsx';
import UserLayout from './user/UserLayout.jsx';
import HomePage from './user/pages/HomePage.jsx';
import ProductsPage from './user/pages/ProductsPage.jsx';
import AboutPage from './user/pages/AboutPage.jsx';
import CategoriesPage from './user/pages/CategoriesPage.jsx';
import GodownPage from './user/pages/GodownPage.jsx';
import ContactPage from './user/pages/ContactPage.jsx';
import PrivacyPolicyPage from './user/pages/PrivacyPolicyPage.jsx';
import TermsAndConditionsPage from './user/pages/TermsAndConditionsPage.jsx';
import ProductDetailsPage from './user/pages/ProductDetailsPage.jsx';

// Admin Imports
import AdminLayout from './admin/AdminLayout.jsx';
import AdminDashboard from './admin/pages/AdminDashboard.jsx';
import ManageProducts from './admin/pages/ManageProducts.jsx';
import ManageCategories from './admin/pages/ManageCategories.jsx';
import ManageGodown from './admin/pages/ManageGodown.jsx';
import MediaUpload from './admin/pages/MediaUpload.jsx';
import Settings from './admin/pages/Settings.jsx';
import AdminLogin from './admin/pages/AdminLogin.jsx';

function SmoothScroll({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isAdmin]);

  return children;
}

function App() {
  return (
    <DataProvider>
      <Router>
        <SmoothScroll>
          <Routes>
            {/* User Facing Website */}
            <Route path="/" element={<UserLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="godown" element={<GodownPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="privacy" element={<PrivacyPolicyPage />} />
              <Route path="terms" element={<TermsAndConditionsPage />} />
              <Route path="products/:id" element={<ProductDetailsPage />} />
            </Route>

            {/* Admin Dashboard */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="godown" element={<ManageGodown />} />
              <Route path="assets" element={<MediaUpload />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </SmoothScroll>
      </Router>
    </DataProvider>
  );
}

export default App;
