import React from 'react';
import { useData } from '../../data/DataContext';
import { ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { categories, getImageUrl } = useData();
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 300;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="categories" className="relative py-24 overflow-hidden bg-[#d0e6d4]">
      {/* Misty Green Field Background - Full Scene */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/images/misty-green-bg.png" 
          alt="Misty Green Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/5"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-10 z-20 pointer-events-none -translate-y-[1px]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-full fill-[#faf9f6]"
        >
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.45C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2A3324] font-inter">
            Explore Our Categories
          </h2>
        </div>

        <div className="relative group/scroll">
          {/* Scroll Buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-30 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full border border-white/30 backdrop-blur-md transition-all opacity-0 group-hover/scroll:opacity-100 hidden md:flex items-center justify-center shadow-2xl"
          >
            <ArrowRight size={24} className="rotate-180" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-30 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full border border-white/30 backdrop-blur-md transition-all opacity-0 group-hover/scroll:opacity-100 hidden md:flex items-center justify-center shadow-2xl"
          >
            <ArrowRight size={24} />
          </button>
 
          <div 
            ref={scrollRef}
            className="flex flex-nowrap overflow-x-auto no-scrollbar gap-x-5 md:gap-x-6 px-10 md:px-20 pb-10 scroll-smooth items-stretch justify-start"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {categories.map((item) => (
              <Link 
                key={item.id} 
                to={`/products?category=${item.id}`}
                className="group flex flex-col cursor-pointer shrink-0 transition-all duration-500 w-[140px] md:w-[190px] bg-white rounded-xl shadow-lg border border-white/20 overflow-hidden"
              >
                {/* Header at Top */}
                <div className="bg-white py-3 md:py-4 px-2 border-b border-slate-50 text-center overflow-hidden flex items-center justify-center min-h-[50px] md:min-h-[60px]">
                  <h3 className="text-[9px] md:text-[11px] font-bold text-[#2A3324] font-inter uppercase tracking-wide group-hover:text-green-700 transition-colors whitespace-nowrap px-1">
                    {item.name}
                  </h3>
                </div>

                {/* Image at Bottom */}
                <div className="relative aspect-[4/3] md:aspect-square overflow-hidden bg-white">
                  <img 
                    src={getImageUrl(item.image)} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14">
           <button className="bg-[#1E5D57] hover:bg-[#132c20] text-white px-10 py-3 rounded-none text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl flex items-center gap-2 mx-auto active:scale-95">
             EXPLORE CATALOG <ArrowRight size={14} />
           </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
