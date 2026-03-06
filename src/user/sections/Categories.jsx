import React from 'react';
import { useData } from '../../data/DataContext';
import { ArrowRight, Layers } from 'lucide-react';

const Categories = () => {
  const { categories } = useData();

  return (
    <section id="categories" className="relative py-24 overflow-hidden bg-[#d0e6d4]">
      {/* Misty Green Field Background - Full Scene */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/misty-green-bg.png" 
          alt="Misty Green Background" 
          className="w-full h-full object-cover"
        />
        {/* Soft light overlay for better card readability */}
        <div className="absolute inset-0 bg-white/5"></div>
      </div>

      {/* Torn Paper Edge at Top - Transition from About */}
      <div className="absolute top-0 left-0 w-full h-10 z-20 pointer-events-none -translate-y-[1px]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-full fill-[#faf9f6]"
        >
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.45C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        <div className="mb-14">
          <h2 className="style-font text-5xl md:text-6xl font-black text-[#1b3d2c] italic tracking-tight drop-shadow-sm">
            Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((item) => (
            <div 
              key={item.id} 
              id={`category-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer scroll-mt-24"
            >
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>

              <div className="bg-white py-6 px-4">
                <h3 className="text-sm md:text-base font-black text-slate-800 uppercase tracking-tight leading-tight group-hover:text-green-600 transition-colors">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
           <button className="bg-[#4a6b22] hover:bg-[#3d5a1c] text-white px-10 py-3.5 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl flex items-center gap-2 mx-auto active:scale-95">
             VIEW ALL SERVICES <ArrowRight size={16} />
           </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
