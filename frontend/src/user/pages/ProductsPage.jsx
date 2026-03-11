import React, { useState, useEffect } from 'react';
import { useData } from '../../data/DataContext';
import { Search, ChevronRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { products, categories, getImageUrl } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSub, setActiveSub] = useState('All');

  // Handle category from URL search params
  useEffect(() => {
    const categoryId = searchParams.get('category');
    if (categoryId && categories.length > 0) {
      const category = categories.find(c => c.id === categoryId || c._id === categoryId);
      if (category) {
        setSelectedCategory(category.name);
      }
    }
  }, [searchParams, categories]);

  // Derive subcategories based on products in selected category
  const subcategories = ['All', ...new Set(
    products
      .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
      .map(p => p.subcategory)
  )];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSub = activeSub === 'All' || p.subcategory === activeSub;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSub && matchesSearch;
  });

  return (
    <div className="bg-[#f8faf8] min-h-screen pb-24 font-inter">
      {/* Page Header Segment - Dark Combo */}
      <div className="bg-[#1e3932] pt-20 md:pt-24 pb-10 md:pb-14 text-white text-center relative overflow-hidden">
        {/* Decorative elements for dark background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[#00704A]/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
           <div className="w-full max-w-2xl mx-auto space-y-3">
              <span className="text-[#d4e9e2] font-black uppercase tracking-[0.3em] text-[10px]">
                 Scientific Crop Protection
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white font-inter">
                 The highest yields of the year
              </h1>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative mt-10 z-20">
        {/* Horizontal Category Filters - Compact */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
           <button 
             onClick={() => {setSelectedCategory('All'); setActiveSub('All');}}
             className={`px-4 py-1.5 rounded-none text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm border ${selectedCategory === 'All' ? 'bg-[#3A5A38] text-white border-[#3A5A38] shadow-md' : 'bg-white text-slate-500 border-white hover:text-[#3A5A38] hover:bg-slate-50 hover:shadow-md'}`}
           >
             All Solutions
           </button>
           {categories.map(cat => (
             <button 
               key={cat.id} 
               onClick={() => {setSelectedCategory(cat.name); setActiveSub('All');}}
               className={`px-4 py-1.5 rounded-none text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm border ${selectedCategory === cat.name ? 'bg-[#3A5A38] text-white border-[#3A5A38] shadow-md' : 'bg-white text-slate-500 border-white hover:text-[#3A5A38] hover:bg-slate-50 hover:shadow-md'}`}
             >
               {cat.name}
             </button>
           ))}
        </div>

        {selectedCategory !== 'All' && subcategories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 animate-fade-in pb-1">
             {subcategories.map(sub => (
               <button 
                 key={sub} 
                 onClick={() => setActiveSub(sub)}
                 className={`px-3 py-1 rounded-none text-[8px] font-black transition-colors uppercase tracking-widest border ${activeSub === sub ? 'border-[#00704A] text-[#00704A] bg-[#00704A]/5' : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600'}`}
               >
                 {sub}
               </button>
             ))}
          </div>
        )}

        <div className="flex flex-col">
          {/* Starbucks-Style 3D Product Grid - Full Width */}
          <main className="flex-grow w-full mt-6 md:mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 lg:gap-x-8 gap-y-24 pt-4 pb-16">
               {filteredProducts.map((product, index) => (
                 <motion.div 
                   key={product.id} 
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ duration: 0.5, delay: index % 5 * 0.1 }}
                   onClick={() => navigate(`/products/${product._id || product.id}`)}
                   className="relative group cursor-pointer perspective-1000 mt-8 md:mt-0"
                 >
                   
                   {/* Product Image Popping Out (3D Effect) - Balanced */}
                   <div className="absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 z-20 w-24 h-24 md:w-28 md:h-28 transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-110 group-hover:-translate-y-2 filter drop-shadow-2xl text-center">
                     <img 
                       src={getImageUrl(product.image)} 
                       alt={product.name} 
                       className="w-full h-full object-contain mx-auto" 
                     />
                   </div>

                   {/* Card Background Container - Balanced Compact Version */}
                   <div className="bg-[#fcf8f1] group-hover:bg-[#1e3932] rounded-none p-3 pt-16 md:pt-18 pb-4 transition-all duration-500 shadow-sm border border-[#eee8dc] group-hover:border-[#1e3932] hover:shadow-xl relative z-10 flex flex-col items-center text-center h-[200px] md:h-[230px]">
                     
                     {/* Arrows indicator visible on hover */}
                     <div className="absolute top-1/4 left-2 text-white opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500 hidden md:block">
                       <ChevronRight className="rotate-180" size={12} />
                     </div>
                     <div className="absolute top-1/4 right-2 text-white opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-500 hidden md:block">
                       <ChevronRight size={12} />
                     </div>

                     {/* Title */}
                     <h3 className="text-[#2A3324] group-hover:text-white font-bold text-[13px] md:text-[14px] mb-2 transition-colors duration-500 line-clamp-2 leading-tight min-h-[2.5rem] flex items-center justify-center font-inter">
                        {product.name}
                     </h3>
                     
                     {/* Detailed Specs area - Balanced */}
                     <div className="w-full space-y-1.5 mt-auto mb-1 text-left transition-all duration-500">
                        {/* Row 1 */}
                        <div className="flex justify-between items-center border-b border-black/5 group-hover:border-white/10 pb-1 transition-colors">
                           <span className="text-slate-500 group-hover:text-[#d4e9e2] text-[9px] font-bold uppercase tracking-wider">Category</span>
                           <span className="text-slate-800 group-hover:text-white text-[10px] font-bold">{product.category}</span>
                        </div>
                        {/* Row 2 */}
                        <div className="flex justify-between items-center border-b border-black/5 group-hover:border-white/10 pb-1 transition-colors">
                           <span className="text-slate-500 group-hover:text-[#d4e9e2] text-[9px] font-bold uppercase tracking-wider">Brand</span>
                           <span className="text-slate-800 group-hover:text-white text-[10px] font-bold">{product.brand}</span>
                        </div>
                     </div>

                   </div>
                 </motion.div>
               ))}
            </div>
            
            {filteredProducts.length === 0 && (
               <div className="text-center py-20 bg-[#f2f0ea] rounded-[2.5rem] mt-16 animate-fade-in shadow-sm">
                  <Search size={32} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">No solutions found</p>
               </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
