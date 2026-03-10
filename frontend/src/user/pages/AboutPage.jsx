import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Eye, CheckCircle2, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-[#f8faf8] min-h-screen font-inter pb-24">
      {/* Hero Section - Dark Green with Images (same as About.jsx on homepage) */}
      <section className="bg-[#1e3932] pt-28 md:pt-36 pb-16 px-4 font-inter overflow-hidden relative">
        {/* Subtle organic texture/overlay */}
        <div className="absolute inset-0 bg-[url('/images/misty-green-bg.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-3 md:gap-4 items-start">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-4 md:mt-8"
              >
                <img 
                  src="/images/happy_farmer_consultant.png" 
                  alt="Harito Professional" 
                  className="w-full h-[250px] md:h-[350px] object-cover rounded-none grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl border border-white/5"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-8 md:mt-16"
              >
                <img 
                  src="/images/category_pesticides.jpg" 
                  alt="Farmer in Field" 
                  className="w-full h-[300px] md:h-[420px] object-cover rounded-none shadow-2xl border border-white/5"
                />
              </motion.div>
            </div>

            {/* Right Column: Text Content */}
            <div className="lg:col-span-5 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-5"
              >
                <span className="text-[#a4c639] font-bold text-[9px] md:text-[10px] uppercase tracking-[0.4em]">
                   Scientific Agriculture Excellence
                </span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight uppercase font-inter">
                   About Harito<br/>Crop Science
                </h1>
                <p className="text-[#d4e9e2] text-[11px] md:text-xs leading-relaxed font-medium max-w-lg opacity-80">
                  <strong>Harito Crop Science Private Limited</strong> is an <strong>ISO 9001:2015 Certified</strong> (Certificate No: TSNUK39907) manufacturer and trader dedicated to supporting modern agriculture by providing high-quality fertilizers and crop protection solutions. Our goal is to help farmers improve crop productivity while maintaining soil health and sustainable farming practices.
                </p>
                <p className="text-[#d4e9e2] text-[11px] md:text-xs leading-relaxed font-medium max-w-lg opacity-70">
                  With a strong commitment to quality and innovation, we focus on developing effective agricultural solutions that enhance plant growth and protect crops from pests and diseases — contributing to better yield and healthier crops across India.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section Below Image Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* Main Narrative Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-white p-5 md:p-7 shadow-xl border border-slate-100 rounded-none relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1e3932]"></div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#1e3932]">
                <ShieldCheck size={18} />
                <h2 className="text-sm font-black uppercase tracking-widest">Our Legacy & Commitment</h2>
              </div>

              <div className="text-slate-500 leading-relaxed font-bold text-[11px]">
                <p>
                  Harito Crop Science operates with a focus on reliability, quality assurance, and customer satisfaction. The company follows standardized processes and is committed to delivering agricultural products that meet industry standards and support the agricultural community.
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 mt-4 border-t border-slate-50">
                <div className="space-y-2 p-4 bg-[#f8faf8] border border-slate-50">
                  <div className="flex items-center gap-1.5 text-[#1e3932]">
                    <Target size={14} className="text-green-600" />
                    <h3 className="font-black uppercase tracking-widest text-[9px]">Our Mission</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 italic leading-relaxed font-bold">
                    "To provide reliable and high-quality agricultural products that support farmers in achieving better productivity and sustainable crop growth."
                  </p>
                </div>

                <div className="space-y-2 p-4 bg-[#f8faf8] border border-slate-50">
                  <div className="flex items-center gap-1.5 text-[#1e3932]">
                    <Eye size={14} className="text-green-600" />
                    <h3 className="font-black uppercase tracking-widest text-[9px]">Our Vision</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 italic leading-relaxed font-bold">
                    "To become a trusted agricultural solutions provider by delivering innovative fertilizers and crop protection products that contribute to the growth of modern farming."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar: Why Choose Us */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#1e3932] text-white p-5 shadow-2xl rounded-none relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Award size={100} />
              </div>

              <h3 className="text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-3 mb-4">Why Choose Harito</h3>

              <ul className="space-y-3">
                {[
                  "High-quality fertilizers and crop protection products",
                  "Focus on improving crop productivity",
                  "Commitment to quality and reliability",
                  "Support for sustainable farming practices",
                  "Trusted agricultural solutions for farmers"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <CheckCircle2 size={13} className="text-green-400 shrink-0 mt-0.5" />
                    <span className="text-[11px] font-bold uppercase tracking-tight text-[#d4e9e2] group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-3 border-t border-white/10 text-[8px] font-black uppercase tracking-[0.3em] text-green-400">
                ISO 9001:2015 · CERT NO. TSNUK39907
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;
