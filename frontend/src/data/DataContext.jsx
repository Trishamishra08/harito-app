import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [godowns, setGodowns] = useState([
    { id: 1, name: 'Central Silo Storage', location: 'San Antonio, TX', capacity: '5000 MT', storedProducts: 'Wheat, Corn Seeds, Fertilizer Bulk', contactDetails: '(210) 420-0890' },
  ]);
  const [loading, setLoading] = useState(true);

  // Settings state
  const [siteName, setSiteName] = useState('Harito Agriculture');
  const [adminEmail, setAdminEmail] = useState('admin@harito.com');

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (response.ok) {
        const data = await response.json();
        console.log('Categories fetched:', data.length);
        setCategories(data.map(cat => ({ ...cat, id: cat._id })));
      } else {
        console.error('Failed to fetch categories:', response.status);
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
        console.log('Products fetched:', data.length);
        setProducts(data.map(prod => ({ ...prod, id: prod._id })));
      } else {
        console.error('Failed to fetch products:', response.status);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCarousel = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/carousel`);
      if (response.ok) {
        const data = await response.json();
        console.log('Carousel fetched:', data.length);
        if (data.length === 0) {
          // Seed defaults
          await fetch(`${API_BASE_URL}/carousel/seed`, { method: 'POST' });
          const seeded = await fetch(`${API_BASE_URL}/carousel`);
          if (seeded.ok) {
            const seedData = await seeded.json();
            setCarousel(seedData.map(s => ({ ...s, id: s._id })));
          }
        } else {
          setCarousel(data.map(s => ({ ...s, id: s._id })));
        }
      } else {
        console.error('Failed to fetch carousel:', response.status);
      }
    } catch (error) {
      console.error('Error fetching carousel:', error);
    }
  };

  // Carousel CRUD helpers
  const addCarouselSlide = async (slideData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/carousel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slideData)
      });
      if (response.ok) {
        await fetchCarousel();
        return true;
      }
    } catch (error) {
      console.error('Error adding carousel slide:', error);
    }
    return false;
  };

  const updateCarouselSlide = async (id, slideData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/carousel/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slideData)
      });
      if (response.ok) {
        await fetchCarousel();
        return true;
      }
    } catch (error) {
      console.error('Error updating carousel slide:', error);
    }
    return false;
  };

  const deleteCarouselSlide = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/carousel/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await fetchCarousel();
        return true;
      }
    } catch (error) {
      console.error('Error deleting carousel slide:', error);
    }
    return false;
  };

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      await Promise.all([fetchCategories(), fetchProducts(), fetchCarousel()]);
      setLoading(false);
    };
    initData();
  }, []);

    const getImageUrl = (path) => {
      if (!path) return '';
      if (path.startsWith('http')) return path;
      if (path.startsWith('/images')) return path; // Static public images
      return `${API_BASE_URL.replace('/api', '')}${path}`;
    };

    return (
    <DataContext.Provider value={{
      categories, setCategories,
      products, setProducts,
      carousel, setCarousel,
      godowns, setGodowns,
      fetchCategories,
      fetchProducts,
      fetchCarousel,
      addCarouselSlide,
      updateCarouselSlide,
      deleteCarouselSlide,
      getImageUrl,
      siteName, setSiteName,
      adminEmail, setAdminEmail,
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
      fetchCarousel: () => {},
      addCarouselSlide: () => {},
      updateCarouselSlide: () => {},
      deleteCarouselSlide: () => {},
      siteName: '',
      setSiteName: () => {},
      adminEmail: '',
      setAdminEmail: () => {},
      loading: false
    };
  }
  return context;
};

