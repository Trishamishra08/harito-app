import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowUpRight, ChevronLeft, Globe, ShieldCheck, Sprout } from 'lucide-react';
import axios from 'axios';

const AdminLogin = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [currentImg, setCurrentImg] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${apiBase}/auth/send-otp`, { phone });
      if (response.data.success) setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Check your contact number.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value !== "" && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    setIsLoading(true);
    setError('');
    const otpValue = otp.join('');
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${apiBase}/auth/verify-otp`, { phone, otp: otpValue });
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.user));
        navigate('/admin', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid passcode.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans antialiased text-slate-800">
      
      {/* Compact Container - Exact Wave, Font & Logo Match */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col md:flex-row w-full max-w-2xl bg-white rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden relative min-h-[460px]"
      >
        
        {/* Wave Architecture */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
           <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M 40 0 C 60 0, 30 50, 60 100 L 100 100 L 100 0 Z" 
                fill="#1E5D57" 
              />
           </svg>
        </div>

        {/* Left Side: Imagery & Logo */}
        <div className="md:w-[50%] flex flex-col p-6 md:p-8 relative z-20">
           {/* Harito Logo & Name at Top (Compact) */}
           <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border border-slate-100">
                 <img src="/images/logo.png" alt="Harito" className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-black text-[#1E5D57] tracking-tighter italic">Harito</h1>
           </div>

           <div className="flex-1 flex flex-col justify-center items-center py-4">
              <div className="relative w-full aspect-video md:aspect-square max-w-[160px] mb-6">
                 <AnimatePresence mode="wait">
                   <motion.img 
                      key={currentImg}
                      src={images[currentImg]} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full h-full object-cover rounded-[1.5rem] shadow-lg border-2 border-slate-50"
                   />
                 </AnimatePresence>
                 <div className="absolute -bottom-2 -right-2 bg-[#3ed0a5] p-2 rounded-xl shadow-md text-white">
                    <Sprout size={14} />
                 </div>
              </div>
           </div>
           
           <button 
              onClick={() => navigate('/')}
              className="mt-auto flex items-center gap-1.5 text-slate-900 font-bold text-xs tracking-tight hover:opacity-70 transition-opacity"
           >
              <ArrowUpRight size={16}/> Visit site
           </button>
        </div>

        {/* Right Side: Form (Compact) */}
        <div className="flex-1 bg-[#1E5D57] md:bg-transparent flex flex-col p-6 md:p-8 relative z-20">
           <div className="flex-1 flex flex-col justify-center max-w-[260px] mx-auto w-full">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div key="st1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                     <h2 className="text-3xl font-semibold text-white tracking-tight">Login</h2>
                     
                     <div className="space-y-4 pt-1">
                        <div className="space-y-1">
                           <label className="text-[11px] font-medium text-white/70 ml-1">Contact Number</label>
                           <div className="flex items-center bg-black/20 rounded-2xl overflow-hidden px-4">
                              <span className="text-white/30 text-[12px] font-bold">+91</span>
                              <input 
                                 type="tel" value={phone} 
                                 onChange={e => setPhone(e.target.value)}
                                 placeholder="9876543210" 
                                 className="w-full bg-transparent border-none px-3 py-3 text-white text-[13px] outline-none placeholder:text-white/10"
                              />
                           </div>
                        </div>

                        {error && <p className="text-red-400 text-[10px] font-medium ml-1">{error}</p>}

                        <button 
                           onClick={handlePhoneSubmit} 
                           disabled={isLoading} 
                           className="w-full bg-[#3ed0a5]/80 hover:bg-[#3ed0a5] text-white font-medium text-sm py-3 rounded-full transition-all active:scale-95 mt-1"
                        >
                           {isLoading ? "..." : "Get OTP"}
                        </button>

                        <div className="text-center pt-1">
                           <p className="text-white/50 text-[10px] font-medium">
                              Don't have account? <Link to="/admin/register" className="text-white underline underline-offset-4 decoration-white/20 ml-1">Register Now</Link>
                           </p>
                        </div>
                     </div>
                  </motion.div>
                ) : (
                  <motion.div key="st2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                     <div className="flex items-center gap-2">
                        <button onClick={() => setStep(1)}><ChevronLeft size={18} className="text-white/40 hover:text-white"/></button>
                        <h2 className="text-2xl font-semibold text-white tracking-tight">Passcode</h2>
                     </div>
                     <div className="grid grid-cols-6 gap-1.5 mb-1">
                        {otp.map((d, i) => (
                           <input key={i} type="text" maxLength="1" value={d} onChange={e => handleOtpChange(e.target, i)} className="w-full h-10 bg-black/20 text-center text-white font-semibold text-base outline-none focus:ring-1 focus:ring-[#3ed0a5] rounded-xl" />
                        ))}
                     </div>
                     <button onClick={handleVerifyOtp} className="w-full bg-[#3ed0a5]/80 hover:bg-[#3ed0a5] text-white font-medium text-sm py-3 rounded-full transition-all mt-6 shadow-lg">Verify & Login</button>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
           
           <div className="mt-auto flex justify-end items-center pt-4 border-t border-white/5">
              <div className="flex items-center gap-1.5 text-[8px] font-semibold text-white/30 uppercase tracking-widest italic font-black"><ShieldCheck size={9}/> Harito Module</div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
