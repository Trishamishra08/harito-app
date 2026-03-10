import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    { id: '1', name: 'Seeds', image: 'category_seeds.jpg' },
    { id: '2', name: 'Fertilizers', image: 'category_fertilizers.jpg' },
    { id: '3', name: 'Pesticides', image: 'category_pesticides.jpg' },
    { id: '4', name: 'Equipment', image: 'category_equipment.jpg' }
  ]);
  const [products, setProducts] = useState([
    { id: '1', name: 'Rizo Plus', image: 'rizo.png', description: 'Advanced bio-fertilizer for enhanced root growth.' },
    { id: '2', name: 'Hira 70', image: 'hira-70.png', description: 'High-potency pesticide for crop protection.' },
    { id: '3', name: 'Rider Plus', image: 'rider-plus.png', description: 'Professional grade growth promoter.' },
    { id: '4', name: 'Vito M45', image: 'vito-m45.png', description: 'Broad-spectrum fungicide for healthy crops.' }
  ]);
  const [carousel, setCarousel] = useState([
    {
      id: 1,
      title: "SMART AGRICULTURE",
      subtitle: "NURTURING NATURE WITH PRECISION SCIENCE",
      description: "ISO 9001:2015 Certified manufacturer providing high-yield solutions for the modern farmer.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
      link: "/products"
    },
    {
      id: 2,
      title: "ISO 9001:2015 CERTIFIED",
      subtitle: "QUALITY YOU CAN TRUST",
      description: "High-grade chemical fertilizers and pesticides manufactured with international safety standards.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80",
      link: "/about"
    },
    {
      id: 3,
      title: "BAREILLY PRECISION",
      subtitle: "EFFICIENT SUPPLY CHAIN SOLUTIONS",
      description: "Safe storage and nationwide distribution of agricultural chemicals from our Uttar Pradesh facility.",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1600&q=80",
      link: "/godown"
    }
  ]);
  const [godowns, setGodowns] = useState([
    { id: 1, name: 'Harito Central Godown', location: 'Bareilly, Uttar Pradesh', capacity: '10,000 MT', storedProducts: 'Fertilizers, Pesticides, Growth Promoters', contactDetails: '+91 62604 91554' },
  ]);
  const [loading, setLoading] = useState(true);

  // Settings state
  const [siteName, setSiteName] = useState('Harito Crop Science Private Limited');
  const [adminEmail, setAdminEmail] = useState('trishamishra@gmail.com');
  const [companyInfo, setCompanyInfo] = useState({
    fullName: 'Harito Crop Science Private Limited',
    certification: 'ISO 9001:2015 Certified Manufacturer and Trader',
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
        console.log('Categories fetched:', data.length);
        if (data.length > 0) {
          setCategories(data.map(cat => ({ ...cat, id: cat._id })));
        }
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
        if (data.length > 0) {
          setProducts(data.map(prod => ({ ...prod, id: prod._id })));
        }
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
      
      // 1. Absolute external URLs (like Unsplash)
      if (path.startsWith('http')) return path;
      
      // 2. Already prefixed with /images/ (Frontend Public)
      if (path.startsWith('/images/')) return path;
      
      // 3. Backend uploads (served from backend)
      if (path.startsWith('/uploads')) {
        const base = API_BASE_URL.replace('/api', '');
        return `${base}${path}`;
      }
      
      // 4. Default fallback: assume it is a frontend public asset in /images/
      // This handles paths like "logo.png" or "/rizo.png"
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `/images${cleanPath}`;
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
      companyInfo, setCompanyInfo,
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

