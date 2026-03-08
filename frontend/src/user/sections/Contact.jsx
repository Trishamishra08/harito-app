import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-6 md:py-10 bg-[#1E5D57] overflow-hidden relative">
      <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-green-500/10 pointer-events-none rounded-br-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-center lg:text-left">
            <div>
              <span className="text-[#3ed0a5] font-black text-[9px] uppercase tracking-[0.4em] mb-1 block">
                Operational Support
              </span>
              <h2 className="style-font text-2xl md:text-4xl font-black text-white mb-2 italic tracking-tight leading-none">
                Get In <span className="text-[#3ed0a5]">Touch</span>
              </h2>
              <p className="text-white/60 text-[11px] font-medium max-w-[300px] mx-auto lg:mx-0 leading-relaxed italic">
                Harito experts are ready to assist with your queries.
              </p>
            </div>
            
            <div className="space-y-3 pt-4">
              {[
                { icon: Phone, label: "Hotline", val: "+92 (210) 420-0890" },
                { icon: Mail, label: "Comms", val: "INFO@HARITO-AGRI.COM" },
                { icon: MapPin, label: "Hub", val: "UNIT 123, SECTOR-A" }
              ].map((item, id) => (
                <div key={id} className="flex items-center gap-3 group justify-center lg:justify-start">
                  <div className="bg-white/5 p-2 rounded-none group-hover:bg-[#1E5D57] transition-all border border-white/10">
                    <item.icon className="text-[#3ed0a5]" size={14} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[8px] font-black text-[#3ed0a5]/60 uppercase tracking-widest leading-none mb-1">{item.label}</h3>
                    <p className="text-white font-bold text-[11px] uppercase tracking-tight">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-none p-4 lg:p-6 shadow-2xl relative border-t-4 border-[#3ed0a5] animate-fade-in max-w-md mx-auto w-full">
            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-none bg-[#1E5D57] flex items-center justify-center text-[#3ed0a5]">
                 <MessageSquare size={14} />
              </div>
              <div>
                <h3 className="style-font text-base font-black text-[#1E5D57] italic tracking-tight leading-none">Direct Comms</h3>
              </div>
            </div>
            
            <form className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="space-y-0.5">
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity</label>
                  <input 
                    type="text" 
                    placeholder="NAME / ID" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-none py-2 px-3 focus:border-[#1E5D57] outline-none text-[#1E5D57] transition-all font-bold text-[10px] uppercase tracking-wider"
                  />
                </div>
                <div className="space-y-0.5">
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Channel</label>
                  <input 
                    type="email" 
                    placeholder="EMAIL ADDR" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-none py-2 px-3 focus:border-[#1E5D57] outline-none text-[#1E5D57] transition-all font-bold text-[10px] uppercase tracking-wider"
                  />
                </div>
              </div>
              
              <div className="space-y-0.5">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Objective</label>
                <input 
                  type="text" 
                  placeholder="SUBJECT" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-none py-2 px-3 focus:border-[#1E5D57] outline-none text-[#1E5D57] transition-all font-bold text-[10px] uppercase tracking-wider"
                />
              </div>
              
              <div className="space-y-0.5">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Intelligence</label>
                <textarea 
                  rows="2" 
                  placeholder="MESSAGE" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-none py-2 px-3 focus:border-[#1E5D57] outline-none text-[#1E5D57] transition-all font-bold text-[10px] uppercase tracking-wider resize-none"
                ></textarea>
              </div>
              
              <button className="w-full bg-[#1E5D57] hover:bg-[#132c20] text-white font-black text-[10px] uppercase tracking-[0.3em] py-3 rounded-none transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 mt-2 group">
                DISPATCH <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
