import React from 'react';
import { Camera, Layers, Check, Search, Filter } from 'lucide-react';

const MediaManagement = () => {
  const [activeTab, setActiveTab] = React.useState('all');
  
  const mediaItems = [
    { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&w=400&q=80', size: '1.2 MB', name: 'hero-farm.jpg' },
    { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1588636402435-0955f11116c4?auto=format&fit=crop&w=400&q=80', size: '840 KB', name: 'seeds-pack.jpg' },
    { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1628189675276-80db61b2e673?auto=format&fit=crop&w=400&q=80', size: '1.1 MB', name: 'biopesticide.jpg' },
    { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c13?auto=format&fit=crop&w=400&q=80', size: '2.4 MB', name: 'fertilizer-bag.jpg' },
    { id: 5, type: 'image', url: 'https://images.unsplash.com/photo-1593444030119-94b29bb3e314?auto=format&fit=crop&w=400&q=80', size: '1.5 MB', name: 'seeds-close.jpg' },
    { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1522851147748-0ca5eebb6f5f?auto=format&fit=crop&w=400&q=80', size: '3.1 MB', name: 'tractor-demo.jpg' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <span className="text-[9px] font-black text-green-600 uppercase tracking-[0.3em]">Asset Repository</span>
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase leading-none mt-1">Media Library</h1>
          <p className="text-xs text-slate-500 font-medium italic mt-2">Manage all digital assets used across the Hirato ecosystem.</p>
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <button className="bg-slate-900 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-2">
            <Camera size={16} /> UPLOAD NEW ASSET
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            {['all', 'images', 'documents'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-green-600 transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="SEARCH MEDIA..." 
              className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-6 focus:ring-2 focus:ring-green-500/50 outline-none text-slate-800 transition-all font-black text-[10px] uppercase tracking-widest"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {mediaItems.map(item => (
            <div key={item.id} className="group relative aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:border-green-300 transition-all cursor-pointer">
              <img src={item.url} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                 <p className="text-white text-[9px] font-black uppercase tracking-tight mb-1 truncate w-full">{item.name}</p>
                 <p className="text-green-500 text-[8px] font-black uppercase tracking-widest">{item.size}</p>
                 <div className="mt-3 flex gap-2">
                   <button className="bg-white/10 hover:bg-white text-white hover:text-slate-900 p-2 rounded-lg transition-colors">
                     <Layers size={12} />
                   </button>
                   <button className="bg-white/10 hover:bg-red-600 text-white p-2 rounded-lg transition-colors">
                     <Filter size={12} />
                   </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaManagement;
