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

  const allProducts = [
    { id: 1, name: 'GLYVID-71\nHerbicide', img: '/glyvid-71.png', desc: 'Ammonium Salt of Glyphosate 71% SG. Effective weed control.' },
    { id: 2, name: 'VITO-M45\nFungicide', img: '/vito-m45.png', desc: 'Mancozeb 75% WP. Protection against fungal diseases.' },
    { id: 3, name: 'RIDER PLUS\nInsecticide', img: '/rider-plus.png', desc: 'Fipronil 0.6 W/W GR. Advanced protection for crops.' },
    { id: 4, name: 'HIRA-70\nFungicide', img: '/hira-70.png', desc: 'Thiophanate Methyl 70% W.P. Trusted plant health.' },
    { id: 5, name: 'RIZO\nBio Fertilizer', img: '/rizo.png', desc: 'Vesicular Arbuscular Mycorrhizal Bio Fertilizer. Keeps roots stronger.' },
    { id: 6, name: 'HILDAN-90\nFertilizer', img: '/hildan-90.png', desc: 'Sulphur 90% WDG. Essential sulphur nutrition for crops.' },
    { id: 7, name: 'GLYVID\nSG Herbicide', img: '/glyvid-new.png', desc: 'Next-gen SG formulation for superior weed management.' }
  ];

  const handleReadMore = (productName) => {
    alert(`Opening details for ${productName}...`);
  };
  
  return (
    <section id="products" className="relative pb-16 bg-[#d0e6d4] overflow-hidden !pt-0">
      {/* Background Header with Image */}
      <div className="relative h-[250px] md:h-[280px] w-full overflow-hidden">
        {/* Zig Zag Torn Design Top Divider added here */}
        <div className="absolute inset-x-0 top-0 w-full h-8 md:h-12 bg-[#d0e6d4] torn-bottom z-20" style={{ transform: 'rotate(180deg)' }}></div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 relative z-10">
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-8"
        >
          {allProducts.map((item, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div 
                key={item.id} 
                className="bg-white rounded-[1.25rem] p-5 shadow-xl border-b-2 border-slate-100 hover:border-green-600 transition-all duration-500 group flex flex-col items-center text-center h-full"
              >
                {/* Product Image */}
                <div className="h-[120px] w-full mb-4 overflow-hidden rounded-xl flex items-center justify-center p-2">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                </div>

                {/* Header: Icon + Name */}
                <div className="flex flex-col items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${idx === 1 || idx === 4 ? 'bg-green-600 text-white' : 'bg-slate-50 text-green-600 group-hover:bg-green-600 group-hover:text-white'}`}>
                    <IconComponent size={16} />
                  </div>
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight leading-tight group-hover:text-green-600 transition-colors whitespace-pre-line min-h-[32px] flex items-center">
                    {item.name}
                  </h3>
                </div>
                
                {/* Description and Detailed Data (Conditional) */}
                <div className="flex flex-col flex-grow w-full px-1">
                  <p className={`text-slate-500 text-[10px] leading-relaxed mb-4 transition-all duration-300 ${expandedId === item.id ? 'opacity-100' : 'line-clamp-2'}`}>
                    {item.desc}
                  </p>
                  
                  {expandedId === item.id && (
                    <div className="mb-4 pt-2 border-t border-slate-50 text-left animate-fade-in">
                       <p className="text-[9px] font-black text-green-600 uppercase tracking-widest mb-1.5">Specifications</p>
                       <ul className="text-[9px] text-slate-400 space-y-1 font-medium capitalize">
                         <li>• High-grade chemical purity</li>
                         <li>• Optimized for crop health</li>
                         <li>• Ready for soil application</li>
                       </ul>
                    </div>
                  )}
                </div>
                
                {/* Read More Footer - Clickable Link Container */}
                <button 
                  onClick={() => toggleExpand(item.id)}
                  className="flex items-center gap-1 text-slate-900 font-extrabold text-[8px] uppercase tracking-widest hover:text-green-600 transition-colors mt-auto cursor-pointer"
                >
                  {expandedId === item.id ? 'SHOW LESS' : 'READ MORE'} 
                  <ArrowRightCircle 
                    size={14} 
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
