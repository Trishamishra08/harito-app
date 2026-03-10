import React from 'react';
import { useData } from '../../data/DataContext';
import { Sprout, Droplets, Leaf, Flower2, ShieldAlert, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  const { categories } = useData();

  const getCatIcon = (name) => {
    const n = name.toLowerCase();
    const commonClasses = "text-white";
    if (n.includes('fertilizer')) return <Droplets className={commonClasses} size={18} strokeWidth={2.5} />;
    if (n.includes('pesticide')) return <ShieldAlert className={commonClasses} size={18} strokeWidth={2.5} />;
    if (n.includes('protection')) return <Leaf className={commonClasses} size={18} strokeWidth={2.5} />;
    if (n.includes('growth')) return <Sprout className={commonClasses} size={18} strokeWidth={2.5} />;
    return <Flower2 className={commonClasses} size={18} strokeWidth={2.5} />;
  };

  const getCatDesc = (name) => {
    const n = name.toLowerCase();
    if (n.includes('fertilizer')) return 'High-grade fertilizers to replenish soil and maximize yields.';
    if (n.includes('pesticide')) return 'Advanced pest control solutions for crop and environmental safety.';
    if (n.includes('protection')) return 'Effective protection against fungi, weeds, and diseases.';
    if (n.includes('growth')) return 'Growth regulators that enhance development and tolerance.';
    return 'Reliable solutions tailored to specific Indian farming needs.';
  };

  const getCatBgColor = (name) => {
    return 'bg-[#E6F4ED] border-[#d8ebe1]'; 
  };

  return (
    <div className="bg-[#f8faf8] min-h-screen pb-24 font-inter">
      {/* Page Header Segment - Dark Combo (Matched with Product Page) */}
      <div className="bg-[#1e3932] pt-20 md:pt-24 pb-10 md:pb-14 text-white text-center relative overflow-hidden">
        {/* Decorative elements for dark background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[#00704A]/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
           <div className="w-full max-w-2xl mx-auto space-y-3">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#d4e9e2] font-black uppercase tracking-[0.3em] text-[10px]"
              >
                 Scientific Crop Protection
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white font-inter uppercase"
              >
                 Our Categories
              </motion.h1>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mt-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 px-2 lg:px-0">
          {categories.map((cat, idx) => (
            <motion.div 
               key={cat.id}
               id={`cat-${cat.id}`}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="group relative"
            >
               {/* Icon Circle (Overlapping) */}
               <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 bg-[#3A5A38] rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 border-[3px] border-white">
                  {getCatIcon(cat.name)}
               </div>

               <Link 
                  to={`/products?category=${cat.id}`}
                  className={`block ml-4 pl-7 pr-4 py-5 md:py-6 border ${getCatBgColor(cat.name)} transition-all duration-500 shadow-sm hover:shadow-xl rounded-none h-full relative overflow-hidden`}
               >
                  {/* Hover Accent */}
                  <div className="absolute top-0 right-0 w-1 h-0 bg-[#3A5A38] transition-all duration-500 group-hover:h-full"></div>
                  
                  <div className="flex flex-col h-full space-y-1.5">
                     <h3 className="text-[13px] md:text-sm font-bold text-[#2A3324] tracking-tight group-hover:text-[#3A5A38] transition-colors font-inter uppercase">
                       {cat.name}
                     </h3>
                     
                     <p className="text-slate-500 text-[10px] md:text-[11px] leading-relaxed line-clamp-2">
                       {getCatDesc(cat.name)}
                     </p>

                     <div className="pt-1.5 flex items-center gap-1.5 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300 group-hover:text-[#3A5A38] transition-colors">
                        Catalog <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
                     </div>
                  </div>
               </Link>
            </motion.div>
          ))}
        </div>

        {/* Highlight Section (Compacted) */}
        <div className="bg-[#1e3932] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden rounded-none shadow-2xl">
           <div className="absolute inset-0 bg-[url('/images/misty-green-bg.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
           
           <div className="relative z-10 max-w-xl text-center md:text-left">
              <h4 className="text-xl md:text-2xl font-bold tracking-tight mb-2 leading-tight">Need a custom crop protection plan?</h4>
              <p className="text-[#d4e9e2] text-[11px] md:text-xs font-medium opacity-70">Our experts help select solutions for your local soil conditions.</p>
           </div>
           
           <Link to="/contact" className="relative z-10 bg-[#3A5A38] text-white px-8 py-3 rounded-none font-bold uppercase tracking-widest text-[9px] hover:bg-white hover:text-[#1e3932] transition-all shadow-xl active:scale-95">
              Consult an Expert
           </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
