import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

const initialCategories = [
  { id: 1, name: 'Pesticides', description: 'Protect your crops from pests.', image: '/category_pesticides.jpg' },
  { id: 2, name: 'Fertilizers', description: 'Enhance crop growth and yield.', image: '/category_fertilizers.jpg' },
  { id: 3, name: 'Seeds', description: 'High quality seeds for better harvest.', image: '/category_seeds.jpg' },
  { id: 4, name: 'Agricultural Equipment', description: 'Modern farming machinery.', image: '/category_equipment.jpg' },
];

const initialProducts = [
  { id: 1, name: 'Eco-Friendly Biopesticide', category: 'Pesticides', subcategory: 'Bio Pesticides', brand: 'AgroCare', description: 'Organic solution to keep insects away safely.', cropUsage: 'Wheat, Rice, Cotton', applicationMethod: 'Foliar Spray', image: 'https://images.unsplash.com/photo-1628189675276-80db61b2e673?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'SuperGrow NPK', category: 'Fertilizers', subcategory: 'Chemical', brand: 'YieldBoost', description: 'Balanced nutrients for all stages of growth.', cropUsage: 'Vegetables, Fruits', applicationMethod: 'Soil Application', image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c13?auto=format&fit=crop&w=400&q=80' },
];

const initialCarousel = [
  { id: 1, title: 'FRESH HARVEST, DIRECT TO YOU', description: 'Experience the quality of farm-fresh produce picked at the peak of ripeness.', image: '/carousel-1.png' },
  { id: 2, title: 'PRECISION CROP PROTECTION', description: 'Advanced solutions for healthy growth and maximum yield through modern agricultural techniques.', image: '/carousel-2.png' },
];

const initialGodowns = [
  { id: 1, name: 'Central Silo Storage', location: 'San Antonio, TX', capacity: '5000 MT', storedProducts: 'Wheat, Corn Seeds, Fertilizer Bulk', contactDetails: '(210) 420-0890' },
];

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);
  const [carousel, setCarousel] = useState(initialCarousel);
  const [godowns, setGodowns] = useState(initialGodowns);

  return (
    <DataContext.Provider value={{
      categories, setCategories,
      products, setProducts,
      carousel, setCarousel,
      godowns, setGodowns
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
