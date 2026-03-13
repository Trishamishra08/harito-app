import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

import { API_BASE_URL, getImageUrl as getImageUrlHelper } from '../api/config';

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [godowns, setGodowns] = useState([
    { id: 1, name: 'Hirato Central Godown', location: 'Bareilly, Uttar Pradesh', capacity: '10,000 MT', storedProducts: 'Fertilizers, Pesticides, Growth Promoters', contactDetails: '+91 11-69652826' },
  ]);
  const [loading, setLoading] = useState(true);

  // Settings state
  const [siteName, setSiteName] = useState('Hirato Crop Science Private Limited');
  const [adminEmail, setAdminEmail] = useState('hiratocropscience@gmail.com');
  const [companyInfo, setCompanyInfo] = useState({
    fullName: 'Hirato Crop Science Private Limited',
    certification: 'ISO 9001:2015 Certified Marketing By and Trader',
    location: 'Bareilly, Uttar Pradesh, India',
    address: 'Durga Nagar Back in Megha City, Near Mandir & Suresh Sharma Nagar, Mahanagar, Bareilly, Uttar Pradesh – 243006, India',
    tagline: 'Empowering Farmers with Quality Agricultural Solutions',
    mission: 'To provide high-quality fertilizers and pesticides that ensure sustainable agriculture and healthy crops.',
    vision: 'To be the most trusted partner for farmers in India through innovative crop protection solutions.'
  });

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data.map(cat => ({ ...cat, id: cat._id })));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.map(prod => ({ ...prod, id: prod._id })));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`);
      if (response.ok) {
        const data = await response.json();
        if (data.siteName) setSiteName(data.siteName);
        if (data.adminEmail) setAdminEmail(data.adminEmail);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };
  const addCarouselSlide = async (slideData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/carousel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slideData),
      });
      if (response.ok) await fetchCarousel();
    } catch (error) { console.error('Error adding slide:', error); }
  };

  const updateCarouselSlide = async (id, slideData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/carousel/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slideData),
      });
      if (response.ok) await fetchCarousel();
    } catch (error) { console.error('Error updating slide:', error); }
  };

  const deleteCarouselSlide = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/carousel/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) await fetchCarousel();
    } catch (error) { console.error('Error deleting slide:', error); }
  };

  const fetchCarousel = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/carousel`);
      if (response.ok) {
        const data = await response.json();
        setCarousel(data.map(slide => ({ ...slide, id: slide._id })));
      }
    } catch (error) { console.error('Error fetching carousel:', error); }
  };
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      await Promise.all([fetchCategories(), fetchProducts(), fetchSettings()]);
      setLoading(false);
    };
    initData();
  }, []);

  const getImageUrl = (path) => {
    // Keep internal legacy overrides if needed, then fallback to helper
    if (path && path.includes('unsplash.com')) {
      if (path.includes('1500382017468') || path.includes('1523348837708')) return '/images/carousel-1.png';
      if (path.includes('1464226184884')) return '/images/carousel-2.png';
    }
    return getImageUrlHelper(path);
  };

  return (
    <DataContext.Provider value={{
      categories, setCategories,
      products, setProducts,
      carousel,
      godowns, setGodowns,
      fetchCategories,
      fetchProducts,
      getImageUrl,
      siteName, setSiteName,
      adminEmail, setAdminEmail,
      companyInfo, setCompanyInfo,
      addCarouselSlide,
      updateCarouselSlide,
      deleteCarouselSlide,
      loading
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    return {
      categories: [],
      products: [],
      carousel: [],
      godowns: [],
      setCategories: () => {},
      setProducts: () => {},
      setCarousel: () => {},
      setGodowns: () => {},
      fetchCategories: () => {},
      fetchProducts: () => {},
      getImageUrl: () => {},
      siteName: '',
      setSiteName: () => {},
      adminEmail: '',
      setAdminEmail: () => {},
      loading: false
    };
  }
  return context;
};
