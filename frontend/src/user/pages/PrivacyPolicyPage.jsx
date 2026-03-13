import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Mail } from 'lucide-react';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfdfc] min-h-[60vh] pt-28 pb-12 font-inter">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 md:p-8 shadow-sm border border-slate-100 rounded-none relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#1e3932]"></div>
          
          <header className="mb-6 flex justify-between items-center border-b border-slate-50 pb-4">
            <div>
              <span className="text-[#a4c639] font-black uppercase tracking-[0.2em] text-[9px] block mb-1">Corporate Compliance</span>
              <h1 className="text-xl md:text-2xl font-black text-[#1e3932] uppercase tracking-tight">Privacy Policy</h1>
            </div>
            <Shield className="text-[#1e3932]/10" size={40} />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 text-slate-600">
            <section className="space-y-2">
              <div className="flex items-center gap-2 text-[#1e3932]">
                <Eye size={16} />
                <h2 className="text-[11px] font-black uppercase tracking-widest">Collection & Usage</h2>
              </div>
              <p className="text-[10px] leading-relaxed font-bold opacity-80">
                Hirato Crop Science collects minimal data (Name, Email, Phone) via inquiries to provide agricultural support. We do not sell or trade your personal information.
              </p>
            </section>

            <section className="space-y-2">
              <div className="flex items-center gap-2 text-[#1e3932]">
                <Shield size={16} />
                <h2 className="text-[11px] font-black uppercase tracking-widest">Data Protection</h2>
              </div>
              <p className="text-[10px] leading-relaxed font-bold opacity-80">
                All transmissions are encrypted. We maintain internal security protocols to safeguard your identifying information against unauthorized access.
              </p>
            </section>

            <section className="space-y-2 md:col-span-2 pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2 text-[#1e3932]">
                <Mail size={16} />
                <h2 className="text-[11px] font-black uppercase tracking-widest">Support Access</h2>
              </div>
              <p className="text-[10px] leading-relaxed font-bold opacity-80">
                For data modifications or erasure requests, contact our compliance team: <br/>
                <span className="text-[#1e3932] font-black text-xs">hiratocropscience@gmail.com</span>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
