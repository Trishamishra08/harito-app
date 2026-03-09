import React from 'react';
import { useData } from '../../data/DataContext';
import { Sprout, Droplets, Leaf, Flower2, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  const { categories } = useData();

  const getCatIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('fertilizer')) return <Droplets className="text-blue-500" size={32} />;
    if (n.includes('pesticide')) return <ShieldAlert className="text-red-500" size={32} />;
    if (n.includes('protection')) return <Leaf className="text-green-600" size={32} />;
    if (n.includes('growth')) return <Sprout className="text-teal-600" size={32} />;
    return <Flower2 className="text-orange-500" size={32} />;
  };

  const getCatDesc = (name) => {
    const n = name.toLowerCase();
    if (n.includes('fertilizer')) return 'High-grade chemical and organic fertilizers designed to replenish soil nutrients and maximize crop yields sustainably.';
    if (n.includes('pesticide')) return 'Advanced pest control solutions that target harmful insects while maintaining the safety of the crop and the environment.';
    if (n.includes('protection')) return 'Comprehensive crop protection solutions against fungi, weeds, and diseases to ensure a healthy harvest.';
    if (n.includes('growth')) return 'Specialized plant growth regulators and bio-stimulants that enhance physical development and stress tolerance.';
    return 'Reliable agricultural solutions tailored to meet the specific needs of Indian farmers across all crop types.';
  };

  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 font-bold uppercase tracking-widest text-xs mb-4 block"
          >
            Product Specializations
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 italic tracking-tighter"
          >
            Our Categories
          </motion.h1>
          <p className="text-slate-500 text-sm mt-4 uppercase tracking-[0.2em] font-medium max-w-2xl mx-auto">
            Science-backed solutions for every stage of the agricultural lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {categories.map((cat, idx) => (
            <motion.div 
               key={cat.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="bg-white p-10 rounded-[2.5rem] border border-white shadow-sm hover:shadow-xl hover:border-green-600/20 transition-all duration-500 group relative overflow-hidden"
            >
               {/* Decorative Gradient Background */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -z-0 group-hover:bg-green-50 transition-colors"></div>
               
               <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:shadow-lg transition-all duration-500">
                     {getCatIcon(cat.name)}
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter italic uppercase group-hover:text-green-600 transition-colors">
                    {cat.name}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                    {getCatDesc(cat.name)}
                  </p>
                  
                  <Link 
                    to={`/products?category=${cat.id}`}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 group-hover:text-green-600 transition-colors"
                  >
                    View Catalog <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight Section */}
        <div className="bg-[#1E5D57] rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
           <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
           
           <div className="relative z-10 max-w-xl">
              <h4 className="text-2xl font-bold italic tracking-tight mb-4 leading-tight">Need a custom crop protection plan for your farm?</h4>
              <p className="text-white/60 text-sm font-medium">Our agro-scientists can help you select the exactly right combination of categories for your local soil conditions.</p>
           </div>
           
           <Link to="/contact" className="relative z-10 bg-white text-[#1E5D57] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#3ed0a5] hover:text-white transition-all shadow-xl active:scale-95">
              Consult an Expert
           </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
