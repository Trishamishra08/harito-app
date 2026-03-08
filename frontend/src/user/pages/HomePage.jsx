import React from 'react';
import Carousel from '../sections/Carousel.jsx';
import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Categories from '../sections/Categories.jsx';
import Godown from '../sections/Godown.jsx';
import Contact from '../sections/Contact.jsx';
import { useData } from '../../data/DataContext';
import { ArrowRightCircle, Sprout, Droplets, Leaf, Flower2 } from 'lucide-react';

const FeaturedProducts = () => {
  const { products } = useData();
  const icons = [Sprout, Droplets, Leaf, Flower2];
  const [expandedId, setExpandedId] = React.useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleReadMore = (productName) => {
    alert(`Opening details for ${productName}...`);
  };
  
  return (
    <section id="products" className="relative pb-16 bg-[#d0e6d4] overflow-hidden !pt-0">
      {/* Background Header with Image */}
      <div className="relative h-[250px] md:h-[280px] w-full overflow-hidden">
        {/* Zig Zag Torn Design Top Divider added here */}
        <div className="absolute inset-x-0 top-0 w-full h-8 md:h-12 bg-[#d0e6d4] wavy-bottom z-20" style={{ transform: 'rotate(180deg)' }}></div>
        <div className="absolute inset-x-0 top-[-2px] w-full h-[4px] bg-[#d0e6d4] z-20"></div> {/* Covers the hairline gap with the exact same color */}

        <img 
          src="/agri-bg-products.png" 
          alt="Agriculture Services background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex flex-col items-center justify-start text-center px-4 pt-16 md:pt-20">
          <span className="text-green-800 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-3 opacity-90 drop-shadow-md">
            Our Core Catalog
          </span>
          <h2 className="style-font text-5xl md:text-6xl font-black text-[#2d3a1f] md:mb-3 italic tracking-tight drop-shadow-md">
            Products
          </h2>
        </div>
      </div>

      {/* Row-wise Grid Cards Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 relative z-10">
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 pb-8"
        >
          {products.map((item, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div 
                key={item.id} 
                className="bg-white rounded-none p-3 shadow-lg border-b-2 border-slate-100 hover:border-green-600 transition-all duration-500 group flex flex-col items-center text-center h-full"
              >
                {/* Product Image */}
                <div className="h-[140px] w-full mb-2.5 overflow-hidden rounded-none flex items-center justify-center p-1">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                </div>

                {/* Header: Icon + Name */}
                <div className="flex flex-col items-center gap-1 mb-2">
                  <div className={`w-6 h-6 rounded-none flex items-center justify-center transition-colors duration-300 ${idx === 1 || idx === 4 ? 'bg-green-600 text-white' : 'bg-slate-50 text-green-600 group-hover:bg-green-600 group-hover:text-white'}`}>
                    <IconComponent size={12} />
                  </div>
                  <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-tight leading-tight group-hover:text-green-600 transition-colors whitespace-pre-line min-h-[32px] flex items-center">
                    {item.name}
                  </h3>
                </div>
                
                {/* Description and Detailed Data (Conditional) */}
                <div className="flex flex-col flex-grow w-full px-0.5">
                  <p className={`text-slate-500 text-[10px] leading-relaxed mb-3 transition-all duration-300 ${expandedId === item.id ? 'opacity-100' : 'line-clamp-2'}`}>
                    {item.description}
                  </p>
                  
                  {expandedId === item.id && (
                    <div className="mb-3 pt-2 border-t border-slate-50 text-left animate-fade-in">
                       <p className="text-[9px] font-black text-green-600 uppercase tracking-widest mb-1 leading-none">Specifications</p>
                       <ul className="text-[9px] text-slate-400 space-y-0.5 font-medium capitalize">
                         <li>• High-grade purity</li>
                         <li>• Crop health boost</li>
                         <li>• Soil application</li>
                       </ul>
                    </div>
                  )}
                </div>
                
                {/* Read More Footer */}
                <button 
                  onClick={() => toggleExpand(item.id)}
                  className="flex items-center gap-1 text-slate-900 font-extrabold text-[8px] uppercase tracking-widest hover:text-green-600 transition-colors mt-auto cursor-pointer"
                >
                  {expandedId === item.id ? 'LESS' : 'MORE'} 
                  <ArrowRightCircle 
                    size={10} 
                    className={`${(idx === 1 || idx === 4) ? 'text-green-600' : 'text-slate-200 group-hover:text-green-600'} transition-transform duration-300 ${expandedId === item.id ? 'rotate-90' : ''}`} 
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <div className="space-y-0">
      <Carousel />
      <FeaturedProducts />
      <About />
      <Categories />
      <Godown />
      <Contact />
    </div>
  );
};

export default HomePage;
