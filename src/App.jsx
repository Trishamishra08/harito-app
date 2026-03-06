import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './data/DataContext.jsx';
import UserLayout from './user/UserLayout.jsx';
import HomePage from './user/pages/HomePage.jsx';
import ProductsPage from './user/pages/ProductsPage.jsx';

// Admin Imports
import AdminLayout from './admin/AdminLayout.jsx';
import AdminDashboard from './admin/pages/AdminDashboard.jsx';
import ManageCarousel from './admin/pages/ManageCarousel.jsx';
import ManageProducts from './admin/pages/ManageProducts.jsx';
import ManageCategories from './admin/pages/ManageCategories.jsx';
import ManageGodown from './admin/pages/ManageGodown.jsx';
import MediaUpload from './admin/pages/MediaUpload.jsx';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          {/* User Facing Website */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
          </Route>

          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="carousel" element={<ManageCarousel />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="categories" element={<ManageCategories />} />
            <Route path="godown" element={<ManageGodown />} />
            <Route path="media" element={<MediaUpload />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
