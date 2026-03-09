import React, { useState } from 'react';
import { useData } from '../../data/DataContext';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
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
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 underline-offset-8">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 font-bold uppercase tracking-widest text-xs mb-4 block"
          >
            Get In Touch
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 italic tracking-tighter"
          >
            Contact Harito Team
          </motion.h1>
          <p className="text-slate-500 text-sm mt-4 uppercase tracking-[0.2em] font-medium max-w-2xl mx-auto">
            Our experts are ready to assist you with agricultural queries and high-quality product support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1E5D57] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
              {/* Decorative Circle */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold italic tracking-tight mb-8">Official Communication</h3>
                
                <div className="space-y-10">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-green-800 transition-all duration-300">
                       <MapPin size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1.5 leading-none">Registered Office</p>
                      <p className="text-sm font-medium leading-relaxed text-white/80">{companyInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-green-800 transition-all duration-300">
                       <Mail size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1.5 leading-none">Email Support</p>
                      <p className="text-sm font-bold tracking-wide italic">contact@haritocrop.com</p>
                      <p className="text-sm font-bold tracking-wide italic mt-1">trishamishra@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-green-800 transition-all duration-300">
                       <Phone size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1.5 leading-none">Inquiry Line</p>
                      <p className="text-sm font-bold tracking-wide italic">+91 62604 91554</p>
                      <p className="text-sm font-bold tracking-wide italic mt-1">+91 91316 26127</p>
                    </div>
                  </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-teal-400 italic">
                   <ShieldCheck size={14} fill="currentColor" className="text-teal-900" /> ISO 9001:2015 REGISTERED
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-green-600 transition-all">
               <div>
                 <p className="text-xs font-bold text-slate-800 uppercase tracking-tight">Visit Corporate Site</p>
                 <p className="text-[10px] text-slate-400 font-medium mt-0.5">Learn more about our scientific divisions</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm">
                  <ArrowRight size={18} />
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
             <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-20 text-center"
                  >
                     <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send size={32} />
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-2 italic">Message Sent!</h3>
                     <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">Thank you for reaching out. A Harito expert will contact you within 24 business hours.</p>
                     <button onClick={() => setSubmitted(false)} className="text-xs font-black uppercase tracking-widest text-green-600 hover:bg-green-50 px-6 py-2 rounded-full transition-all">Send Another</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Name</label>
                          <input 
                            type="text" required value={formState.name}
                            onChange={(e) => setFormState({...formState, name: e.target.value})}
                            placeholder="John Doe"
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-4 focus:ring-green-500/5 focus:bg-white outline-none text-slate-800 transition-all font-bold text-xs"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                          <input 
                            type="email" required value={formState.email}
                            onChange={(e) => setFormState({...formState, email: e.target.value})}
                            placeholder="john@example.com"
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-4 focus:ring-green-500/5 focus:bg-white outline-none text-slate-800 transition-all font-bold text-xs"
                          />
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                       <input 
                         type="text" required value={formState.subject}
                         onChange={(e) => setFormState({...formState, subject: e.target.value})}
                         placeholder="Product Inquiry / Partnership"
                         className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-4 focus:ring-green-500/5 focus:bg-white outline-none text-slate-800 transition-all font-bold text-xs"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                       <textarea 
                         rows="5" required value={formState.message}
                         onChange={(e) => setFormState({...formState, message: e.target.value})}
                         placeholder="How can our agriculture experts help you today?"
                         className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-4 focus:ring-green-500/5 focus:bg-white outline-none text-slate-800 transition-all font-bold text-xs leading-relaxed"
                       ></textarea>
                    </div>

                    <button 
                       type="submit" disabled={isSubmitting}
                       className="w-full bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-widest text-[11px] py-5 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-green-200 flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                       {isSubmitting ? 'TRANSMITTING...' : <>SUBMIT COMMUNICATION <Send size={16} /></>}
                    </button>
                    
                    <p className="text-center text-[9px] text-slate-400 font-medium uppercase tracking-widest">
                       Secure Encryption Enabled <MessageSquare size={10} className="inline ml-1" />
                    </p>
                  </form>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
