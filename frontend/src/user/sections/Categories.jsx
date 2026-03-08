import React from 'react';
import { useData } from '../../data/DataContext';
import { ArrowRight, Layers } from 'lucide-react';

const Categories = () => {
  const { categories } = useData();
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
          src="/misty-green-bg.png" 
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
        <div className="mb-14">
          <h2 className="style-font text-4xl md:text-5xl font-black text-[#1b3d2c] italic tracking-tight drop-shadow-sm">
            Categories
          </h2>
          <div className="w-12 h-1 bg-[#1E5D57]/30 mx-auto mt-2"></div>
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
            className="flex flex-nowrap overflow-x-auto no-scrollbar gap-x-8 md:gap-x-12 px-2 md:px-0 pb-10 scroll-smooth items-start justify-start md:justify-center"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {categories.map((item) => (
              <div 
                key={item.id} 
                id={`category-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group flex flex-col items-center cursor-pointer shrink-0 transition-all duration-500 w-[140px] md:w-[220px]"
              >
                <div className="relative w-32 h-32 md:w-52 md:h-52 rounded-full overflow-hidden shadow-2xl group-hover:shadow-green-900/20 group-hover:scale-105 transition-all duration-500 ring-0 hover:ring-8 hover:ring-white/10 border-4 border-white">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-transparent to-black/10 group-hover:to-black/20 transition-all"></div>
                </div>

                <div className="mt-6">
                  <h3 className="text-[10px] md:text-[13px] font-black text-slate-800 uppercase tracking-[0.2em] leading-tight group-hover:text-[#1E5D57] transition-colors">
                    {item.name}
                  </h3>
                  <div className="w-6 group-hover:w-full h-1 bg-[#1E5D57] mx-auto transition-all duration-500 mt-2 opacity-30"></div>
                </div>
              </div>
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
