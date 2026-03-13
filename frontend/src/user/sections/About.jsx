import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="bg-[#1e3932] pt-44 pb-16 px-4 font-inter overflow-hidden relative">
      {/* Subtle organic texture/overlay */}
      <div className="absolute inset-0 bg-[url('/images/misty-green-bg.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Image Gallery (Compacted) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 md:gap-4 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-4 md:mt-8"
            >
              <img 
                src="/images/happy_farmer_consultant.png" 
                alt="Hirato Professional" 
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
          <div className="lg:col-span-5 space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-3"
            >
              <span className="text-[#d4e9e2]/80 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.3em]">
                 The Hirato Legacy
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight uppercase font-inter">
                 More About Our Work
              </h2>
              <p className="text-[#d4e9e2] text-[11px] md:text-xs leading-relaxed font-medum max-w-lg opacity-80">
                <strong>Hirato Crop Science Private Limited</strong> is an <strong>ISO 9001:2015 Certified</strong> (Certificate No: TSNUK39907) Marketing By and Trader specialized in chemical fertilizers and pesticides. Based in Bareilly, Uttar Pradesh, we provide innovative crop protection solutions that serve as a cornerstone for sustainable agriculture, maximizing yields to ensure food security across India.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
