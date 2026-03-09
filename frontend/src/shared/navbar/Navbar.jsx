import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../data/DataContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { categories } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Product', path: '/products' },
    { name: 'Category', path: '/categories' },
    { name: 'Godown', path: '/godown' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const NavLink = ({ link, className = "" }) => (
    <Link to={link.path} onClick={() => setIsOpen(false)} className={`text-slate-800 px-4 py-2 text-[11px] font-black uppercase tracking-widest group relative ${className}`}>
      <span className="relative z-10 group-hover:text-green-600 transition-colors duration-300">{link.name}</span>
      <span className="absolute inset-0 bg-green-50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-0 rounded-full"></span>
    </Link>
  );

  return (
    <header className={`fixed w-full z-[100] top-0 left-0 transition-all duration-500 p-2 md:p-4`}>
      <nav className={`max-w-6xl mx-auto transition-all duration-500 bg-white/70 backdrop-blur-md rounded-full border border-white/20 shadow-xl relative`}>
        <div className="flex justify-between items-center px-8 h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
             <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white shadow-sm overflow-hidden shrink-0">
                <img src="/images/logo.png" alt="H" className="w-full h-full object-contain p-1.5" />
             </div>
             <span className="font-black text-xl text-slate-900 tracking-tighter uppercase group-hover:text-green-600 transition-colors">Harito</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
             {navLinks.map((link) => {
               if (link.name === 'Category') {
                 return (
                   <div 
                     key={link.name}
                     className="relative group"
                     onMouseEnter={() => setIsCategoryOpen(true)}
                     onMouseLeave={() => setIsCategoryOpen(false)}
                   >
                     <Link to="/categories" className="flex items-center gap-1 text-slate-800 px-4 py-2 text-[11px] font-black uppercase tracking-widest group hover:text-green-600 transition-all">
                       {link.name}
                       <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180 mb-0.5' : ''}`} />
                     </Link>
                     <div className={`absolute left-0 top-full pt-2 transition-all duration-300 origin-top ${isCategoryOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
                        <div className="bg-white/95 backdrop-blur-2xl border border-slate-100 rounded-2xl shadow-2xl min-w-[200px] overflow-hidden">
                           {categories.map(cat => (
                             <Link 
                                key={cat.id} 
                                to={`/products?category=${cat.id}`}
                                className="block px-6 py-3 text-[10px] font-bold text-slate-500 hover:text-green-600 hover:bg-green-50 transition-all uppercase tracking-widest border-b border-slate-50 last:border-0"
                             >
                               {cat.name}
                             </Link>
                           ))}
                        </div>
                     </div>
                   </div>
                 );
               }
               return <NavLink key={link.name} link={link} />;
             })}
          </div>

          <div className="flex items-center gap-3">
             <button className="hidden sm:flex bg-green-800 text-white px-6 py-2 btn-pill text-[9px]">
                GET UPDATES
             </button>
             <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-slate-900">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full p-4 lg:hidden"
            >
              <div className="bg-white border border-slate-100 rounded-[2rem] shadow-2xl p-8 flex flex-col items-center space-y-4">
                 {navLinks.map((link) => (
                   <Link 
                      key={link.name} 
                      to={link.path} 
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-black text-slate-900 italic uppercase tracking-tighter hover:text-green-600 transition-colors"
                   >
                     {link.name}
                   </Link>
                 ))}
                 <div className="w-12 h-1 bg-green-100 rounded-full my-4"></div>
                 {categories.slice(0, 4).map(cat => (
                    <Link key={cat.id} to={`/products?category=${cat.id}`} className="text-sm font-bold text-slate-400 uppercase tracking-widest hover:text-green-600">{cat.name}</Link>
                 ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;


