import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShieldCheck, Globe, ArrowUpRight } from 'lucide-react';
import axios from 'axios';

const AdminRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [currentImg, setCurrentImg] = useState(1);
  const images = [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentImg((prev) => (prev + 1) % images.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value.toUpperCase() });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => navigate('/admin/login', { replace: true }), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#1E5D57] flex flex-col items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
          <h1 className="text-3xl font-semibold text-white tracking-tight italic mb-2">Success</h1>
          <p className="text-white/60 text-[11px] font-medium uppercase tracking-[0.2em]">Redirecting to portal...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans antialiased text-slate-800">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col md:flex-row w-full max-w-2xl bg-white rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden relative min-h-[500px]"
      >
        
        {/* Wave Architecture */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
           <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 40 0 C 60 0, 30 50, 60 100 L 100 100 L 100 0 Z" fill="#1E5D57" />
           </svg>
        </div>

        {/* Left Side: Imagery & Logo */}
        <div className="md:w-[50%] flex flex-col p-6 md:p-8 relative z-20">
           {/* Harito Logo & Name at Top (Compact) */}
           <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border border-slate-100">
                 <img src="/logo.png" alt="Harito" className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-black text-[#1E5D57] tracking-tighter italic">Harito</h1>
           </div>

           <div className="flex-1 flex flex-col justify-center items-center py-4">
              <div className="relative w-full aspect-square max-w-[170px] mb-6">
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
                    <User size={14} />
                 </div>
              </div>
           </div>
           
           <button onClick={() => navigate('/')} className="mt-auto flex items-center gap-1.5 text-slate-900 font-bold text-xs tracking-tight hover:opacity-70 transition-opacity">
              <ArrowUpRight size={16}/> Visit site
           </button>
        </div>

        {/* Right Side - Form (Compact) */}
        <div className="flex-1 bg-[#1E5D57] md:bg-transparent flex flex-col p-6 md:p-8 relative z-20">
           <div className="flex-1 flex flex-col justify-center max-w-[260px] mx-auto w-full">
              <h2 className="text-3xl font-semibold text-white tracking-tight mb-2">Register</h2>
              
              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                 <div className="space-y-3">
                    <div className="space-y-0.5">
                       <label className="text-[10px] font-medium text-white/70 ml-1">Full Name</label>
                       <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="ENTER NAME" className="w-full bg-black/20 border-none rounded-xl px-4 py-2.5 text-white text-[12px] outline-none placeholder:text-white/10 uppercase" required />
                    </div>
                    <div className="space-y-0.5">
                       <label className="text-[10px] font-medium text-white/70 ml-1">Email</label>
                       <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="EMAIL@EXAMPLE.COM" className="w-full bg-black/20 border-none rounded-xl px-4 py-2.5 text-white text-[12px] outline-none placeholder:text-white/10 uppercase" />
                    </div>
                    <div className="space-y-0.5">
                       <label className="text-[10px] font-medium text-white/70 ml-1">Contact Number</label>
                       <div className="flex items-center bg-black/20 rounded-xl overflow-hidden px-3">
                          <span className="text-white/30 text-[11px] font-bold">+91</span>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="9876543210" className="w-full bg-transparent border-none px-2.5 py-2.5 text-white text-[12px] outline-none placeholder:text-white/10" required />
                       </div>
                    </div>
                 </div>
                 {error && <p className="text-red-400 text-[10px] font-medium ml-1 italic">{error}</p>}
                 <button type="submit" disabled={isLoading} className="w-full bg-[#3ed0a5]/80 hover:bg-[#3ed0a5] text-white font-medium text-sm py-3 rounded-full transition-all active:scale-95 shadow-md mt-2">
                    {isLoading ? "..." : "Create Account"}
                 </button>
                 <div className="text-center pt-1.5">
                    <Link to="/admin/login" className="text-white/50 text-[10px] font-medium">Already member? <span className="text-white underline underline-offset-4 decoration-white/20 ml-1">Sign In Now</span></Link>
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

export default AdminRegister;
