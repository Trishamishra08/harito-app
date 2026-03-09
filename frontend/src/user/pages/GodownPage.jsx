import React from 'react';
import { useData } from '../../data/DataContext';
import { Warehouse, ShieldCheck, Truck, Clock, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

const GodownPage = () => {
  const { godowns } = useData();

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
            Logistics & Operations
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 italic tracking-tighter"
          >
            Storage & Distribution
          </motion.h1>
          <p className="text-slate-500 text-sm mt-4 uppercase tracking-[0.2em] font-medium">Efficient Supply Chain Solutions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-white">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                   <Warehouse className="text-green-600" /> State-of-the-Art Facilities
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                   At <strong>Harito Crop Science Private Limited</strong>, we maintain a network of sophisticated storage facilities designed specifically for the safe and efficient handling of agricultural chemicals and fertilizers. Our storage protocols strictly adhere to international safety standards, ensuring that our products reach farmers in pristine condition.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-4 bg-slate-50 rounded-2xl flex items-start gap-3">
                      <Clock className="text-green-600 shrink-0" size={20} />
                      <div>
                        <p className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">Temperature Control</p>
                        <p className="text-[10px] text-slate-500 font-medium">Monitoring systems to maintain optimal product efficacy.</p>
                      </div>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl flex items-start gap-3">
                      <ShieldCheck className="text-green-600 shrink-0" size={20} />
                      <div>
                        <p className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">Safety Protocols</p>
                        <p className="text-[10px] text-slate-500 font-medium">Advanced fire suppression and chemical spill management.</p>
                      </div>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl flex items-start gap-3">
                      <Droplets className="text-green-600 shrink-0" size={20} />
                      <div>
                        <p className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">Moisture Control</p>
                        <p className="text-[10px] text-slate-500 font-medium">Keeping fertilizers dry and effective in all seasons.</p>
                      </div>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl flex items-start gap-3">
                      <Truck className="text-green-600 shrink-0" size={20} />
                      <div>
                        <p className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">Ready Inventory</p>
                        <p className="text-[10px] text-slate-500 font-medium">Large-scale capacity to meet seasonal demands instantly.</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="rounded-3xl overflow-hidden shadow-lg h-64">
                 <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Warehouse" className="w-full h-full object-cover" />
               </div>
               <div className="rounded-3xl overflow-hidden shadow-lg h-64">
                 <img src="https://images.unsplash.com/photo-1585713181935-d5f622cc2415?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Supply Chain" className="w-full h-full object-cover" />
               </div>
             </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#1E5D57] text-white p-8 rounded-3xl shadow-xl">
               <h3 className="text-xl font-bold uppercase tracking-widest italic mb-6">Distribution Hubs</h3>
               <div className="space-y-6">
                 {godowns.map(godown => (
                   <div key={godown.id} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                      <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Primary Facility</p>
                      <h4 className="text-lg font-bold mb-2 tracking-tight">{godown.name}</h4>
                      <p className="text-white/60 text-xs font-medium mb-4">{godown.location}</p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold opacity-80">
                           <ShieldCheck size={12} /> Capacity: {godown.capacity}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold opacity-80">
                           <Clock size={12} /> Operating 24/7
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-white text-center">
               <Truck className="text-green-600 mx-auto mb-4" size={40} />
               <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tighter italic mb-2">Our Logistics Reach</h3>
               <p className="text-slate-500 text-[11px] font-medium leading-relaxed">
                  With our centralized hub in Bareilly, we ensure timely delivery of agricultural essentials across the northern belt of India, supporting thousands of retailers and farmers.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GodownPage;
