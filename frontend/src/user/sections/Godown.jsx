import React from 'react';
import { useData } from '../../data/DataContext';
import { MapPin, Warehouse, Box, PhoneCall } from 'lucide-react';

const Godown = () => {
  const { godowns } = useData();

  return (
    <section id="godown" className="relative py-12 md:py-16 bg-white">
      {/* Wavy Top Divider */}
      <div className="absolute top-0 left-0 w-full h-10 md:h-16 bg-[#d0e6d4] wavy-bottom" style={{ transform: 'rotate(180deg)' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 md:pt-12">
        <div className="mb-12 text-center">
          <h2 className="style-font text-3xl md:text-4xl font-black italic tracking-tight mb-2 text-slate-800">
            Godown Facilities
          </h2>
          <span className="text-[#1E5D57] font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] opacity-80">
            Strategic Storage and Distribution Centers
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {godowns.map((godown) => (
            <div key={godown.id} className="bg-[#1E5D57] border border-[#2d5a42] p-4 rounded-none hover:bg-[#132c20] transition-all duration-300 shadow-xl group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-white/10 rounded-none flex items-center justify-center border border-white/20 group-hover:bg-[#1E5D57]/20 transition-colors">
                  <Warehouse className="text-[#3ed0a5]" size={18} />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm uppercase tracking-tight leading-none mb-1">{godown.name}</h3>
                  <p className="text-[#3ed0a5] text-[8px] font-black uppercase tracking-[0.2em]">{godown.capacity}</p>
                </div>
              </div>
              
              <div className="space-y-3 mt-4 border-t border-white/10 pt-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 px-1.5 bg-white/5 rounded-none border border-white/10 text-white/50 group-hover:text-[#3ed0a5] transition-colors">
                    <MapPin size={12} />
                  </div>
                  <div>
                    <p className="text-white/40 text-[7px] uppercase font-black tracking-[0.2em] leading-none mb-1">Location</p>
                    <p className="text-white/90 text-[10px] font-bold tracking-wide">{godown.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 px-1.5 bg-white/5 rounded-none border border-white/10 text-white/50 group-hover:text-[#3ed0a5] transition-colors">
                    <Box size={12} />
                  </div>
                  <div>
                    <p className="text-white/40 text-[7px] uppercase font-black tracking-[0.2em] leading-none mb-1">Stored Goods</p>
                    <p className="text-white/90 text-[10px] font-bold tracking-wide leading-snug line-clamp-1">{godown.storedProducts}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 px-1.5 bg-white/5 rounded-none border border-white/10 text-white/50 group-hover:text-[#3ed0a5] transition-colors">
                    <PhoneCall size={12} />
                  </div>
                  <div>
                    <p className="text-white/40 text-[7px] uppercase font-black tracking-[0.2em] leading-none mb-1">Contact</p>
                    <p className="text-white/90 text-[10px] font-bold tracking-wide">{godown.contactDetails}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Godown;
