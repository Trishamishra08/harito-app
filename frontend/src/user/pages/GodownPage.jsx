import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Warehouse } from 'lucide-react';

const GodownPage = () => {
  return (
    <div className="bg-[#1e3932] min-h-screen pt-36 pb-12 px-4 font-inter overflow-hidden relative text-white">
      {/* Subtle organic texture/overlay matched with About page */}
      <div className="absolute inset-0 bg-[url('/images/misty-green-bg.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Image Gallery (Facility Focused) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 items-start">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mt-2 md:mt-4"
            >
              <img 
                src="/images/storage_facility_agri.png" 
                alt="Storage Facility" 
                className="w-full h-[200px] md:h-[280px] object-cover rounded-none grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl border border-white/5"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 md:mt-10"
            >
              <img 
                src="/images/storage_facility_agri.png" 
                alt="Manufacturing Logistics" 
                className="w-full h-[240px] md:h-[340px] object-cover rounded-none shadow-2xl border border-white/5"
              />
            </motion.div>
          </div>

          {/* Right Column: Text Content (Aggressively Compact) */}
          <div className="lg:col-span-5 space-y-3 md:space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-[#a4c639]" />
                <span className="text-[#d4e9e2]/60 font-black uppercase tracking-[0.4em] text-[8px] md:text-[9px]">
                   Certified Excellence
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight uppercase font-inter">
                 ISO 9001:2015 <br/>
                 Quality Hub
              </h2>

              <div className="space-y-3 pt-2 border-t border-white/5">
                 <p className="text-[#d4e9e2]/80 text-[10px] md:text-[11px] leading-relaxed font-bold">
                    <strong>Hirato Crop Science Private Limited</strong> is an independently certified Manufacturer and Trader of high-grade chemical fertilizers and pesticides.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-3 py-1">
                    <div className="space-y-0.5">
                       <p className="text-[7px] font-black uppercase tracking-widest text-white/30">Certificate No.</p>
                       <p className="text-[9px] font-bold text-white uppercase">TSNUK39907</p>
                    </div>
                    <div className="space-y-0.5">
                       <p className="text-[7px] font-black uppercase tracking-widest text-white/30">Issue Date</p>
                       <p className="text-[9px] font-bold text-white uppercase">28/03/2025</p>
                    </div>
                 </div>

                 <div className="bg-white/[0.03] p-3 border border-white/5 space-y-1.5">
                    <p className="text-[8px] text-[#a4c639] font-black uppercase tracking-widest flex items-center gap-1.5">
                       <Warehouse size={10} /> Registered Facility
                    </p>
                    <p className="text-[#d4e9e2]/70 text-[9px] leading-normal font-medium uppercase tracking-tight">
                       Durga Nagar Back in Megha City, Nr Mandir & Suresh Sharma Nagar, Bareilly, UP-243006
                    </p>
                 </div>

                 <button onClick={() => window.location.href='/contact'} className="inline-flex items-center bg-[#a4c639] text-[#1e3932] px-6 py-2.5 rounded-none font-black uppercase tracking-widest text-[8px] hover:bg-white transition-all shadow-xl active:scale-95 mt-2">
                    Inquire About Trade
                 </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GodownPage;
