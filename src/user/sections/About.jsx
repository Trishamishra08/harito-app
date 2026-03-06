import React from 'react';
import { Target, Lightbulb, Users, CheckCircle2, Leaf } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="relative py-20 bg-[#faf9f6] overflow-hidden">
      {/* Torn Paper Edge at Top */}
      <div className="absolute top-0 left-0 w-full h-10 z-20 pointer-events-none -translate-y-[1px]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-full fill-white"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.45C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>

      {/* Left Leaf Cluster */}
      <div className="absolute left-0 top-0 bottom-0 w-1/4 md:w-1/3 opacity-80 pointer-events-none z-0 overflow-hidden">
        <img 
          src="/leaf-left.png" 
          alt="Watercolor Leaf Left" 
          className="w-full h-full object-contain object-left"
        />
      </div>

      {/* Right Leaf Cluster */}
      <div className="absolute right-0 top-0 bottom-0 w-1/4 md:w-1/3 opacity-80 pointer-events-none z-0 overflow-hidden">
        <img 
          src="/leaf-right.png" 
          alt="Watercolor Leaf Right" 
          className="w-full h-full object-contain object-right"
        />
      </div>

      <div className="relative z-10 text-center py-4">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="style-font text-5xl md:text-6xl font-black text-[#2d3a1f] mb-3 italic tracking-tight">
            About Us
          </h2>
          <span className="text-green-800 font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-10 block opacity-80">
            HIRATO LANDSCAPING SERVICES
          </span>
          
          <div className="max-w-2xl mx-auto">
             <p className="text-[#4a553c] text-sm md:text-base leading-relaxed font-bold italic text-slate-500/90 [text-shadow:0_1px_rgba(255,255,255,0.5)]">
               Since 2010, Hirato Landscaping has provided year-round landscaping services for residential 
               and commercial properties in the global agricultural area. In addition to routine maintenance, design, 
               and installation of shrubs, trees, and plants, we also create unique hardscapes on your property 
               such as outdoor kitchens, fire pits, and pergolas.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

