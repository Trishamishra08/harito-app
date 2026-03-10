import React, { useState } from 'react';
import { useData } from '../../data/DataContext';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, ArrowRight, ChevronRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const { companyInfo } = useData();
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-[#f8faf8] min-h-screen pb-24 font-inter">
      {/* Page Header Segment - Dark Combo (Matched with other pages) */}
      <div className="bg-[#1e3932] pt-20 md:pt-24 pb-10 md:pb-14 text-white text-center relative overflow-hidden">
        {/* Decorative elements for dark background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[#00704A]/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
           <div className="w-full max-w-2xl mx-auto space-y-3">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#d4e9e2] font-black uppercase tracking-[0.3em] text-[10px]"
              >
                 Get in Touch
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white font-inter uppercase"
              >
                 Contact Harito Team
              </motion.h1>
              <p className="text-[#d4e9e2]/60 text-[10px] md:text-xs uppercase tracking-[0.25em] font-medium max-w-lg mx-auto leading-relaxed">
                Connect with our agriculture experts for high-quality product support.
              </p>
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-20 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Official Details (Sharp & Compact) */}
          <div className="lg:col-span-5 space-y-4">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               className="bg-[#1e3932] text-white p-6 md:p-8 shadow-2xl relative overflow-hidden rounded-none border border-white/5"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Globe size={80} />
              </div>
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-1.5 border-b border-white/10 pb-4">
                  <h3 className="text-lg md:text-xl font-black tracking-tight uppercase">Official Channels</h3>
                  <div className="flex items-center gap-1.5 text-[8px] font-bold text-[#a4c639] uppercase tracking-[0.3em]">
                    <ShieldCheck size={10} /> Certified Communication
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                       <MapPin size={16} className="text-[#a4c639]" />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-[#d4e9e2]/40 uppercase tracking-widest mb-1.5 leading-none">Registered Office</p>
                      <p className="text-[11px] font-bold leading-relaxed text-[#d4e9e2] uppercase">{companyInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                       <Mail size={16} className="text-[#a4c639]" />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-[#d4e9e2]/40 uppercase tracking-widest mb-1.5 leading-none">Email Support</p>
                      <p className="text-xs font-bold tracking-tight">contact@haritocrop.com</p>
                      <p className="text-[10px] text-white/50 font-medium">trishamishra@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                       <Phone size={16} className="text-[#a4c639]" />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-[#d4e9e2]/40 uppercase tracking-widest mb-1.5 leading-none">Inquiry Hotline</p>
                      <p className="text-xs font-bold tracking-tight">+91 62604 91554</p>
                      <p className="text-[10px] text-white/50 font-medium">+91 91316 26127</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-[#a4c639] border-t border-white/5 opacity-80">
                   ISO 9001:2015 REGISTERED FACILITY
                </div>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="bg-white border border-slate-100 p-5 rounded-none flex items-center justify-between group cursor-pointer hover:border-[#1e3932] transition-all shadow-sm"
            >
               <div>
                 <p className="text-[10px] font-black text-slate-800 uppercase tracking-tight">Corporate Relations</p>
                 <p className="text-[9px] text-slate-400 font-medium mt-0.5">Explore our scientific partnership divisions</p>
               </div>
               <div className="w-8 h-8 rounded-none bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#1e3932] group-hover:text-white transition-all">
                  <ArrowRight size={14} />
               </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form (Sharp & Premium) */}
          <div className="lg:col-span-7">
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               className="bg-white p-6 md:p-10 rounded-none border border-slate-100 shadow-xl relative overflow-hidden"
             >
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center"
                  >
                     <div className="w-16 h-16 bg-[#f0fcf4] text-[#a4c639] flex items-center justify-center mx-auto mb-5 border border-[#a4c639]/10">
                        <Send size={24} />
                     </div>
                     <h3 className="text-xl font-black text-[#1e3932] mb-2 uppercase tracking-tight">Transmission Successful</h3>
                     <p className="text-slate-500 text-[11px] max-w-[240px] mx-auto mb-8 font-medium">Our experts will verify your inquiry and coordinate a response within 24 business hours.</p>
                     <button onClick={() => setSubmitted(false)} className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1e3932] hover:bg-slate-50 border border-slate-100 px-8 py-3 transition-all">New Communication</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                          <input 
                            type="text" required value={formState.name}
                            onChange={(e) => setFormState({...formState, name: e.target.value})}
                            placeholder="Type name here..."
                            className="w-full bg-[#fcfdfc] border border-slate-100 rounded-none py-3.5 px-5 focus:border-[#1e3932] outline-none text-[#1e3932] transition-all font-bold text-[11px] placeholder:text-slate-200 placeholder:font-medium"
                          />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                          <input 
                            type="email" required value={formState.email}
                            onChange={(e) => setFormState({...formState, email: e.target.value})}
                            placeholder="email@example.com"
                            className="w-full bg-[#fcfdfc] border border-slate-100 rounded-none py-3.5 px-5 focus:border-[#1e3932] outline-none text-[#1e3932] transition-all font-bold text-[11px] placeholder:text-slate-200 placeholder:font-medium"
                          />
                       </div>
                    </div>
                    
                    <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Inquiry Subject</label>
                       <input 
                         type="text" required value={formState.subject}
                         onChange={(e) => setFormState({...formState, subject: e.target.value})}
                         placeholder="e.g. Bulk Pesticide Inquiry"
                         className="w-full bg-[#fcfdfc] border border-slate-100 rounded-none py-3.5 px-5 focus:border-[#1e3932] outline-none text-[#1e3932] transition-all font-bold text-[11px] placeholder:text-slate-200 placeholder:font-medium"
                       />
                    </div>

                    <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Inquiry Details</label>
                       <textarea 
                         rows="4" required value={formState.message}
                         onChange={(e) => setFormState({...formState, message: e.target.value})}
                         placeholder="Please describe your requirements..."
                         className="w-full bg-[#fcfdfc] border border-slate-100 rounded-none py-3.5 px-5 focus:border-[#1e3932] outline-none text-[#1e3932] transition-all font-bold text-[11px] leading-relaxed placeholder:text-slate-200 placeholder:font-medium"
                       ></textarea>
                    </div>

                    <button 
                       type="submit" disabled={isSubmitting}
                       className="w-full bg-[#1e3932] hover:bg-[#a4c639] text-white hover:text-[#1e3932] font-black uppercase tracking-[0.2em] text-[10px] py-4 rounded-none transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 group"
                    >
                       {isSubmitting ? 'TRANSMITTING...' : <>Initialize Communication <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /></>}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 pt-2">
                       <div className="h-[1px] w-8 bg-slate-100"></div>
                       <p className="text-center text-[8px] text-slate-300 font-black uppercase tracking-widest">
                          Encrypted Transmission Active
                       </p>
                       <div className="h-[1px] w-8 bg-slate-100"></div>
                    </div>
                  </form>
                )}
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
