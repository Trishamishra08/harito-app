import React, { useState } from 'react';
import { Camera, Layers, Check, Search, Filter, Upload, Image as ImageIcon, FileText, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../../data/DataContext';

const MediaManagement = () => {
  const { products, setProducts, categories, setCategories, carousel, setCarousel } = useData();
  const [activeTab, setActiveTab] = useState('all');
  
  // Dynamically collect all images from DataContext
  const mediaItems = [
    ...products.map(p => ({ id: `p-${p.id}`, originalId: p.id, name: p.name.replace('\n', ' '), url: p.image, type: 'product', size: '1.2 MB' })),
    ...categories.map(c => ({ id: `c-${c.id}`, originalId: c.id, name: c.name, url: c.image, type: 'category', size: '2.4 MB' })),
    ...carousel.map(i => ({ id: `i-${i.id}`, originalId: i.id, name: i.title, url: i.image, type: 'carousel', size: '3.1 MB' }))
  ];

  const filteredItems = mediaItems.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'products') return item.type === 'product';
    if (activeTab === 'categories') return item.type === 'category';
    if (activeTab === 'carousel') return item.type === 'carousel';
    return true;
  });

  const handleDelete = (item) => {
    if (!window.confirm(`Delete "${item.name}"? This will remove the item from the system.`)) return;
    
    if (item.type === 'product') {
      setProducts(prev => prev.filter(p => p.id !== item.originalId));
    } else if (item.type === 'category') {
      setCategories(prev => prev.filter(c => c.id !== item.originalId));
    } else if (item.type === 'carousel') {
      setCarousel(prev => prev.filter(c => c.id !== item.originalId));
    }
  };

  return (
    <div className="space-y-3 animate-in fade-in zoom-in-95 duration-500 pb-4">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-[#1E5D57]/5 rounded-none p-3 border-none shadow-sm mb-2">
        {/* Decorative Corner Shape */}
        <div className="absolute -top-10 -right-10 w-16 h-16 rounded-full bg-[#1E5D57]/10 pointer-events-none" />
        
        <div className="relative z-10">
          <div>
            <span className="text-[8px] font-bold text-teal-600 uppercase tracking-widest mb-0.5 block">Digital Warehouse</span>
            <h1 className="text-base font-bold text-slate-800 tracking-tight leading-none uppercase">Media Assets</h1>
          </div>
        </div>
      </div>

      <div className="bg-[#1E5D57]/5 backdrop-blur-md rounded-none p-3 border-none shadow-sm">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
          <div className="flex bg-white/50 p-1 rounded-none w-full md:w-auto border border-teal-900/5 shadow-sm">
            {[
               { id: 'all', label: 'All', icon: Layers },
               { id: 'products', label: 'Products', icon: ImageIcon },
               { id: 'categories', label: 'Categories', icon: ImageIcon },
               { id: 'carousel', label: 'Banners', icon: ImageIcon }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 md:flex-none px-3 py-1 rounded-none text-[8px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === tab.id ? 'bg-[#1E5D57] text-white shadow-sm' : 'text-slate-400 hover:text-teal-600'
                }`}
              >
                <tab.icon size={10} /> {tab.label}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-teal-500 transition-all" size={12} />
            <input 
              type="text" 
              placeholder="Filter resources..." 
              className="bg-white border border-teal-900/5 rounded-none py-1.5 pl-9 pr-3 w-full focus:ring-4 focus:ring-teal-500/5 outline-none transition-all font-bold text-[10px] text-slate-600 shadow-sm uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
          {filteredItems.map(item => (
            <motion.div 
               key={item.id} 
               whileHover={{ y: -2 }}
               className="group relative aspect-square rounded-none overflow-hidden border border-teal-900/5 bg-white shadow-sm transition-all duration-300 cursor-pointer"
            >
              <img src={item.url} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#0a201e]/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-2 text-center backdrop-blur-[1px]">
                 <p className="text-white text-[7px] font-bold uppercase tracking-widest mb-1 truncate w-full px-1">{item.name}</p>
                 <p className="text-teal-400 text-[6px] font-bold uppercase tracking-tighter opacity-80">{item.type}</p>
                 <div className="mt-3 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <button 
                      onClick={() => handleDelete(item)}
                      className="bg-red-500/80 hover:bg-red-600 text-white p-1.5 rounded-none transition-all border border-red-400/30"
                    >
                      <Trash2 size={12} />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaManagement;
