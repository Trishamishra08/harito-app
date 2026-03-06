import React, { useState } from 'react';
import { useData } from '../../data/DataContext';
import { Search, Filter, Layers, Info, ChevronRight, LayoutGrid, List } from 'lucide-react';

const ProductsPage = () => {
  const { products, categories } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSub, setActiveSub] = useState('All');

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
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Page Header Segment */}
      <div className="bg-slate-900 pt-40 md:pt-52 pb-12 md:pb-16 text-white text-center shadow-xl relative overflow-hidden mb-8 border-b-4 border-green-600">
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-1">
          <span className="section-subtitle opacity-50">Operational Archive</span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">Catalog Assets</h1>
          <p className="text-[9px] md:text-[10px] text-slate-400 max-w-xl mx-auto font-black uppercase tracking-[0.3em] pt-3 opacity-60">High-Precision Intelligence for Modern Agricultural Excellence.</p>
        </div>
        {/* Dynamic decorative element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-800 -skew-x-12 translate-x-12 border-l border-white/5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Unified Search & Toolbar */}
        <div className="bg-white p-3 rounded-[1.5rem] shadow-sm border border-slate-100 mb-8 flex flex-col lg:flex-row gap-3 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="LOCATE ASSETS OR MANUFACTURERS..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-xl py-3 pl-11 pr-6 focus:ring-2 focus:ring-green-500/50 outline-none font-black text-[9px] text-slate-900 uppercase tracking-widest"
            />
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
             <div className="flex bg-slate-100 p-1 rounded-xl">
               <button className="bg-white p-2.5 rounded-lg shadow-sm text-green-600 border border-slate-100"><LayoutGrid size={14} /></button>
               <button className="p-2.5 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"><List size={14} /></button>
             </div>
             <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl hover:bg-green-600 transition-all active:scale-95">
               <Filter size={12} /> FILTER ENGINE
             </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Refined Sidebar Navigation */}
          <aside className="lg:w-60 shrink-0 space-y-8">
            <div className="group">
              <h3 className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <div className="w-4 h-px bg-slate-200 group-hover:bg-green-500 transition-colors"></div> Sector Classes
              </h3>
              <div className="space-y-1 text-left">
                <button 
                  onClick={() => {setSelectedCategory('All'); setActiveSub('All');}}
                  className={`w-full text-left px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedCategory === 'All' ? 'bg-slate-900 text-white shadow-xl' : 'bg-transparent text-slate-400 hover:bg-white hover:text-green-600 border border-transparent hover:border-slate-100'}`}
                >
                  GLOBAL INDEX
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id} 
                    onClick={() => {setSelectedCategory(cat.name); setActiveSub('All');}}
                    className={`w-full text-left px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat.name ? 'bg-slate-900 text-white shadow-xl' : 'bg-transparent text-slate-400 hover:bg-white hover:text-green-600 border border-transparent hover:border-slate-100'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {selectedCategory !== 'All' && (
              <div className="animate-fade-in group">
                <h3 className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <div className="w-4 h-px bg-slate-200 group-hover:bg-green-500 transition-colors"></div> Structural Sub-Units
                </h3>
                <div className="space-y-0.5">
                   {subcategories.map(sub => (
                     <button 
                       key={sub} 
                       onClick={() => setActiveSub(sub)}
                       className={`w-full text-left px-4 py-2.5 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] flex items-center justify-between transition-colors ${activeSub === sub ? 'text-green-600 bg-green-50' : 'text-slate-400 hover:text-slate-900'}`}
                     >
                       {sub}
                       <ChevronRight size={10} className={`transition-transform ${activeSub === sub ? 'translate-x-1' : 'opacity-0'}`} />
                     </button>
                   ))}
                </div>
              </div>
            )}
          </aside>

          {/* High-Density Grid */}
          <main className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="premium-card group flex flex-col">
                  <div className="relative h-52 overflow-hidden m-3 rounded-[1.2rem] bg-slate-100 border border-slate-50">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute top-2.5 right-2.5 bg-slate-900 text-white px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-[0.2em] border border-white/5 shadow-xl">{product.category}</div>
                  </div>
                  <div className="p-5 pt-0 space-y-3 flex-grow flex flex-col">
                    <div className="space-y-0.5">
                      <p className="text-green-600 font-black text-[8px] uppercase tracking-widest leading-none mb-1.5">{product.brand}</p>
                      <h4 className="text-[14px] font-black text-slate-900 tracking-tight uppercase leading-tight line-clamp-1">{product.name}</h4>
                    </div>
                    <p className="text-slate-400 text-[10px] font-medium italic line-clamp-2 opacity-80 leading-relaxed mb-4">"{product.description}"</p>
                    <div className="flex flex-wrap gap-1 mt-auto">
                       <span className="bg-slate-50 text-slate-500 px-2 py-1 rounded-md text-[7px] font-black uppercase tracking-tighter flex items-center gap-1 border border-slate-100 transition-colors group-hover:border-green-100"><Layers size={9} className="text-green-500" /> {product.subcategory}</span>
                    </div>
                    <button className="w-full bg-slate-50 group-hover:bg-slate-900 group-hover:text-white text-slate-400 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] mt-4 transition-all flex items-center justify-center gap-2 border border-slate-100 group-hover:border-slate-900 shadow-sm group-hover:shadow-green-500/10 active:scale-95">
                       INTEL CORE <Info size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
               <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 animate-fade-in shadow-sm">
                  <Search size={32} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">NO ASSETS MATCHING QUERY</p>
               </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
