import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gavel, Info, AlertCircle, Shield } from 'lucide-react';

const TermsAndConditionsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfdfc] min-h-[60vh] pt-28 pb-12 font-inter">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Legal Content - Compact */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 bg-white p-6 md:p-8 shadow-sm border border-slate-100 rounded-none relative flex flex-col justify-center"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#1e3932]"></div>
            
            <header className="mb-6 border-b border-slate-50 pb-4">
              <span className="text-[#a4c639] font-black uppercase tracking-[0.2em] text-[9px] block mb-1">Legal Framework</span>
              <h1 className="text-xl md:text-2xl font-black text-[#1e3932] uppercase tracking-tight">Terms & Conditions</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600">
              <section className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#1e3932]">
                  <Info size={14} />
                  <h2 className="text-[10px] font-black uppercase tracking-widest">Usage Agreement</h2>
                </div>
                <p className="text-[10px] leading-relaxed font-bold opacity-80">By using our services, you agree to comply with Indian agricultural regulations and our brand's intellectual property rights.</p>
              </section>

              <section className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#1e3932]">
                  <AlertCircle size={14} />
                  <h2 className="text-[10px] font-black uppercase tracking-widest">Efficacy & Liability</h2>
                </div>
                <p className="text-[10px] leading-relaxed font-bold opacity-80">Product performance depends on farming methods. Hirato is liable only for manufacturing standards, not external application outcomes.</p>
              </section>

              <section className="space-y-1.5 md:col-span-2 pt-3 border-t border-slate-50 mt-2">
                <div className="flex items-center gap-2 text-[#1e3932]">
                  <Gavel size={14} />
                  <h2 className="text-[10px] font-black uppercase tracking-widest">Governing Law</h2>
                </div>
                <p className="text-[10px] leading-relaxed font-bold opacity-80">Jurisdiction: <span className="text-[#1e3932]">Bareilly, Uttar Pradesh, India</span>. All disputes shall be settled in local courts.</p>
              </section>
            </div>
          </motion.div>

          {/* Mini Certificate Sidebar - Compact */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 bg-[#1e3932] p-6 text-white text-center flex flex-col items-center justify-center shadow-lg"
          >
            <Shield size={24} className="mb-3 text-[#a4c639]" />
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] mb-4">ISO 9001:2015 Verified</h3>
            <div className="bg-white p-1 shadow-2xl border border-white/10 w-full max-w-[180px]">
              <img 
                src="/images/iso_certificate.png" 
                alt="ISO Cert" 
                className="w-full h-auto cursor-zoom-in"
                onClick={() => window.open('/images/iso_certificate.png', '_blank')}
              />
            </div>
            <p className="text-[8px] mt-4 font-bold text-[#d4e9e2]/40 uppercase tracking-widest">TSNUK39907</p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
