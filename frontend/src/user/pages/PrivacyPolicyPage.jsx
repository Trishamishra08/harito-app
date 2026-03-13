import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Mail } from 'lucide-react';

const PrivacyPolicyPage = () => {
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
              <span className="text-[#a4c639] font-black uppercase tracking-[0.3em] text-[10px] block mb-2">Corporate Compliance</span>
              <h1 className="text-2xl md:text-3xl font-black text-[#1e3932] uppercase tracking-tight">Privacy Policy</h1>
            </header>

            <div className="space-y-8 text-slate-600">
              <section className="space-y-3">
                <div className="flex items-center gap-3 text-[#1e3932]">
                  <Eye size={18} />
                  <h2 className="text-sm font-black uppercase tracking-widest">Information Collection</h2>
                </div>
                <p className="text-[11px] leading-relaxed font-bold">
                  At Hirato Crop Science, we collect information necessary to provide elite agricultural solutions. This includes personal identifiers (Name, Email, Phone) provided during inquiries and technical data for website optimization.
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3 text-[#1e3932]">
                  <Lock size={18} />
                  <h2 className="text-sm font-black uppercase tracking-widest">Data Protection</h2>
                </div>
                <p className="text-[11px] leading-relaxed font-bold">
                  We implement industry-standard security protocols to ensure your data remains confidential and protected against unauthorized access.
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3 text-[#1e3932]">
                  <Mail size={18} />
                  <h2 className="text-sm font-black uppercase tracking-widest">Contact Support</h2>
                </div>
                <p className="text-[11px] leading-relaxed font-bold">
                  Inquiries regarding data privacy should be directed to: <br/>
                  <span className="text-[#1e3932] font-black">hiratocropscience@gmail.com</span>
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
              <Shield size={32} className="mx-auto mb-4 text-[#a4c639]" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4">ISO 9001:2015 Verified</h3>
              <div className="border-[6px] border-white/5 shadow-inner bg-white p-2">
                <img 
                  src="/images/iso_certificate.png" 
                  alt="Hirato ISO Certificate" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 cursor-zoom-in"
                  onClick={() => window.open('/images/iso_certificate.png', '_blank')}
                />
              </div>
              <p className="text-[9px] mt-4 font-bold text-[#d4e9e2]/60 uppercase tracking-widest">
                Certificate NO: TSNUK39907
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
