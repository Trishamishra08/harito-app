import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-8 md:py-12 bg-[#1b3d2c] overflow-hidden relative">
      <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-green-500/10 pointer-events-none rounded-br-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-center lg:text-left">
            <div>
              <span className="text-green-500 font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] opacity-80 mb-1 block">
                Operational Support
              </span>
              <h2 className="style-font text-3xl md:text-5xl font-black text-white mb-2 italic tracking-tight">
                Get In <span className="text-green-500">Touch</span>
              </h2>
              <p className="text-white/80 text-xs font-bold max-w-sm mx-auto lg:mx-0 opacity-80 leading-relaxed italic">
                Hirato landscaping & agriculture experts are ready to assist with your product queries and facility information.
              </p>
            </div>
            
            <div className="space-y-3 pt-2">
              {[
                { icon: Phone, label: "Hotline", val: "+92 (210) 420-0890" },
                { icon: Mail, label: "Comms", val: "INFO@HIRATO-AGRI.COM" },
                { icon: MapPin, label: "Hub", val: "UNIT 123, SECTOR-A, INDUSTRIAL ZONE" }
              ].map((item, id) => (
                <div key={id} className="flex items-center gap-3 group justify-center lg:justify-start">
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-green-500 transition-all border border-white/10">
                    <item.icon className="text-white" size={14} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[9px] font-black text-green-400 uppercase tracking-widest leading-none mb-1 opacity-80">{item.label}</h3>
                    <p className="text-white font-bold text-xs uppercase tracking-tight">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-[1.5rem] p-5 lg:p-6 shadow-2xl relative border-b-4 border-[#1b3d2c] animate-fade-in max-w-lg mx-auto w-full">
            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-[#1b3d2c] flex items-center justify-center text-green-400">
                 <MessageSquare size={14} />
              </div>
              <h3 className="style-font text-base font-black text-[#1b3d2c] italic tracking-tight">Direct Comms</h3>
            </div>
            
            <form className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input 
                  type="text" 
                  placeholder="Identifier / Name" 
                  className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-[#1b3d2c]/50 outline-none text-[#1b3d2c] transition-all font-bold text-[11px]"
                />
                <input 
                  type="email" 
                  placeholder="Email Channel" 
                  className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-[#1b3d2c]/50 outline-none text-[#1b3d2c] transition-all font-bold text-[11px]"
                />
              </div>
              
              <input 
                type="text" 
                placeholder="Subject of Interest" 
                className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-[#1b3d2c]/50 outline-none text-[#1b3d2c] transition-all font-bold text-[11px]"
              />
              
              <textarea 
                rows="2" 
                placeholder="Detailed Intel" 
                className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-[#1b3d2c]/50 outline-none text-[#1b3d2c] transition-all font-bold text-[11px]"
              ></textarea>
              
              <button className="w-full bg-[#1b3d2c] hover:bg-green-600 text-white font-black text-[9px] uppercase tracking-[0.2em] py-3 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 mt-1">
                DISPATCH MESSAGE <Send size={12} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
