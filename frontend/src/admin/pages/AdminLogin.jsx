import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowUpRight, ChevronLeft, Globe, ShieldCheck, Sprout } from 'lucide-react';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    // Check if user is already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin', { replace: true });
    }

    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || (window.location.protocol === 'https:' ? 'https://localhost:5000/api' : 'http://localhost:5000/api');
      const response = await axios.post(`${apiBase}/auth/login`, { email, password });
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.user));
        navigate('/admin', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans antialiased text-slate-800">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col md:flex-row w-full max-w-2xl bg-white rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden relative min-h-[500px]"
      >
        <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
           <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 40 0 C 60 0, 30 50, 60 100 L 100 100 L 100 0 Z" fill="#1E5D57" />
           </svg>
        </div>

        <div className="md:w-[50%] flex flex-col p-6 md:p-8 relative z-20">
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
           
           <button onClick={() => navigate('/')} className="mt-auto flex items-center gap-1.5 text-slate-900 font-bold text-xs tracking-tight hover:opacity-70 transition-opacity">
              <ArrowUpRight size={16}/> Visit site
           </button>
        </div>

        <div className="flex-1 bg-[#1E5D57] md:bg-transparent flex flex-col p-6 md:p-8 relative z-20">
           <div className="flex-1 flex flex-col justify-center max-w-[260px] mx-auto w-full">
              <form onSubmit={handleLogin} className="space-y-5">
                 <h2 className="text-3xl font-semibold text-white tracking-tight">Login</h2>
                 
                 <div className="space-y-4 pt-1">
                    <div className="space-y-1">
                       <label htmlFor="email" className="text-[11px] font-medium text-white/70 ml-1">Email Address</label>
                       <div className="bg-black/20 rounded-2xl overflow-hidden px-4">
                          <input 
                             id="email"
                             name="email"
                             type="email" required value={email} 
                             onChange={e => setEmail(e.target.value)}
                             placeholder="admin@gmail.com" 
                             className="w-full bg-transparent border-none py-3 text-white text-[13px] outline-none placeholder:text-white/20"
                          />
                       </div>
                    </div>

                    <div className="space-y-1">
                       <label htmlFor="password" className="text-[11px] font-medium text-white/70 ml-1">Password</label>
                       <div className="bg-black/20 rounded-2xl overflow-hidden px-4">
                          <input 
                             id="password"
                             name="password"
                             type="password" required value={password} 
                             onChange={e => setPassword(e.target.value)}
                             placeholder="••••••••" 
                             className="w-full bg-transparent border-none py-3 text-white text-[13px] outline-none placeholder:text-white/20"
                          />
                       </div>
                    </div>

                    {error && <p className="text-red-400 text-[10px] font-medium ml-1">{error}</p>}

                    <button 
                       type="submit" disabled={isLoading} 
                       className="w-full bg-[#3ed0a5]/80 hover:bg-[#3ed0a5] text-white font-black uppercase tracking-widest text-[10px] py-3.5 rounded-full transition-all active:scale-95 mt-1"
                    >
                       {isLoading ? "Signing In..." : "Login to Portal"}
                    </button>

                    <div className="text-center pt-1">
                       <p className="text-white/30 text-[9px] font-medium uppercase tracking-widest">
                          Authorized Access Only
                       </p>
                    </div>
                 </div>
              </form>
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
