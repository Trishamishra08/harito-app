import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info, Gavel, AlertCircle, MapPin } from 'lucide-react';

const TermsAndConditionsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f8faf8] min-h-screen pt-28 pb-16 font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Content Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 bg-white p-6 md:p-10 shadow-xl border border-slate-100 rounded-none relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1e3932]"></div>
            
            <header className="mb-8">
              <span className="text-[#a4c639] font-black uppercase tracking-[0.3em] text-[10px] block mb-2">Legal Framework</span>
              <h1 className="text-2xl md:text-3xl font-black text-[#1e3932] uppercase tracking-tight">Terms & Conditions</h1>
            </header>

            <div className="space-y-8 text-slate-600">
              <section className="space-y-3">
                <div className="flex items-center gap-3 text-[#1e3932]">
                  <Info size={18} />
                  <h2 className="text-sm font-black uppercase tracking-widest">Usage Agreement</h2>
                </div>
                <p className="text-[11px] leading-relaxed font-bold">
                  By accessing Hirato Crop Science platforms, you agree to comply with all regional agricultural regulations and intellectual property laws related to our brand and biological solutions.
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3 text-[#1e3932]">
                  <AlertCircle size={18} />
                  <h2 className="text-sm font-black uppercase tracking-widest">Product Warranty</h2>
                </div>
                <p className="text-[11px] leading-relaxed font-bold">
                  Product efficacy is dependent on environmental factors and application methods. Hirato provides high-grade formulations but is not liable for outcomes beyond controlled manufacturing standards.
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3 text-[#1e3932]">
                  <Gavel size={18} />
                  <h2 className="text-sm font-black uppercase tracking-widest">Governing Law</h2>
                </div>
                <p className="text-[11px] leading-relaxed font-bold">
                  These terms are governed by the laws of <span className="text-[#1e3932] font-black underline">Bareilly, Uttar Pradesh, India</span>. All legal proceedings shall fall under the jurisdiction of Bareilly courts.
                </p>
              </section>
            </div>
          </motion.div>

          {/* Right: Certificate Sidebar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="bg-[#1e3932] p-6 text-white text-center shadow-2xl">
              <div className="flex justify-center gap-4 mb-4">
                 <MapPin size={32} className="text-[#a4c639]" />
                 <div className="w-px h-8 bg-white/10"></div>
                 <div className="w-8 h-8 flex items-center justify-center">
                    <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
                 </div>
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4">Certified Manufacturer</h3>
              <div className="border-[6px] border-white/5 shadow-inner bg-white p-2">
                <img 
                  src="/images/iso_certificate.png" 
                  alt="Hirato ISO Certificate" 
                  className="w-full h-auto"
                />
              </div>
              <p className="text-[9px] mt-4 font-bold text-[#d4e9e2]/60 uppercase tracking-widest">
                Registered in Bareilly, Uttar Pradesh
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
