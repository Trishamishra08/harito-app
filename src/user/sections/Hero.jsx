import React from 'react';
import { ArrowRight, Leaf, Sprout, Tractor } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-28 md:pt-40 pb-16 md:pb-24 bg-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Structural visual split inspired by reference image */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-6 translate-x-16 pointer-events-none border-l border-slate-100"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text content - Compacted and Bold */}
          <div className="flex-1 space-y-8 animate-fade-in text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-slate-900 shadow-xl shadow-green-500/10 text-white px-4 py-2 rounded-xl font-black text-[9px] tracking-[0.3em] uppercase transition-all">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Precision Agriculture
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1] uppercase tracking-tighter">
              THE RIGHT CHOICE, <br/><span className="text-green-600">FIRST TIME!</span>
            </h1>
            
            <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-black uppercase tracking-widest italic opacity-70">
              Hirato empowers global farmers with specialized data assets and high-yield agricultural solutions.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <button className="bg-slate-900 hover:bg-green-600 text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-slate-200 flex items-center gap-3 active:scale-95">
                DISCOVER ASSETS <ArrowRight size={16} />
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-800 px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all border-2 border-slate-100 shadow-sm">
                PROTOCOL
              </button>
            </div>
          </div>
          
          {/* Image context - Premium Framing */}
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white aspect-[4/3] group">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80" 
                alt="Agricultural Landscape" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
              
              {/* Reference-inspired torn effect overlay */}
              <div className="absolute bottom-0 left-0 w-full h-16 bg-white torn-bottom"></div>
            </div>
            
            {/* Minimalist Floating Stats Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl z-20 flex items-center gap-4 border border-slate-100 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
              <div className="bg-slate-900 text-green-500 p-3.5 rounded-2xl shadow-lg shadow-green-500/10">
                <Leaf size={20} />
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1.5">Ecosystem</p>
                <p className="text-xl font-black text-slate-900 tracking-tighter leading-none">100% PURE</p>
              </div>
            </div>

            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-green-500/5 blur-[120px] -z-10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
