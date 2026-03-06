import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useData } from '../../data/DataContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { categories } = useData();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Product', path: '#products' },
    { name: 'Godown', path: '#godown' },
    { name: 'Contact Us', path: '#contact' },
  ];

  const NavLink = ({ link, className = "" }) => {
    const isAnchor = link.path.startsWith('#');
    const content = (
      <span className="relative py-1 group-hover:text-green-400 transition-colors duration-300">
        {link.name}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
      </span>
    );

    const baseClass = `text-white px-2 py-1 text-[13px] xl:px-4 md:text-[14px] font-medium italic tracking-wide group whitespace-nowrap style-font ${className}`;

    if (isAnchor) {
      return (
        <a 
          href={link.path} 
          onClick={() => setIsOpen(false)}
          className={baseClass}
        >
          {content}
        </a>
      );
    }

    return (
      <Link to={link.path} onClick={() => setIsOpen(false)} className={baseClass}>
        {content}
      </Link>
    );
  };

  return (
    <header className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md shadow-2xl border-b border-white/5' : 'bg-transparent'}`}>
      <style>{`
        .style-font {
          font-family: 'Poppins', sans-serif !important;
        }
      `}</style>
      <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16 transition-all duration-500">
          
          {/* Logo & Brand - Left Aligned */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center gap-3 md:gap-4 group cursor-pointer">
              <div className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center transition-all duration-500 transform group-hover:scale-105">
                <img src="/logo.png" alt="Hirato Logo" className="h-full w-full object-contain filter drop-shadow-2xl" />
              </div>
              <div className="flex items-center text-white">
                <span className="style-font italic font-black text-2xl md:text-3xl tracking-tighter leading-none">
                  Hirato
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation - Right Aligned */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.slice(0, 2).map((link) => <NavLink key={link.name} link={link} />)}
            
            {/* Product Link */}
            <NavLink key={navLinks[2].name} link={navLinks[2]} />

            {/* Category Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="flex items-center gap-1 text-white px-2 py-1 text-[13px] xl:px-4 md:text-[14px] font-medium italic tracking-wide group whitespace-nowrap style-font">
                <span className="relative py-1 group-hover:text-green-400 transition-colors duration-300">
                  Category
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180 mb-1' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute left-0 top-full pt-1 transition-all duration-300 origin-top ${isCategoryOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
                <div className="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[220px]">
                  {categories.map((cat) => (
                    <a 
                      key={cat.id} 
                      href={`#category-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-6 py-3.5 text-[11px] font-bold text-white/70 hover:text-green-400 hover:bg-white/5 transition-all uppercase tracking-widest border-b border-white/5 last:border-0"
                      onClick={() => setIsCategoryOpen(false)}
                    >
                      {cat.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(3).map((link) => <NavLink key={link.name} link={link} />)}

            <Link to="/admin" className="ml-4 bg-green-600 hover:bg-white text-white hover:text-black px-6 py-2 rounded-lg text-[12px] font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-xl z-50 p-6 flex flex-col items-center justify-center space-y-6 animate-fade-in">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white"><X size={32} /></button>
            {navLinks.map((link) => (
              <NavLink key={link.name} link={link} className="text-lg" />
            ))}
            <div className="w-full h-px bg-white/10 max-w-xs"></div>
            {categories.map(cat => (
              <a 
                key={cat.id} 
                href={`#category-${cat.name.toLowerCase().replace(/\s+/g, '-')}`} 
                onClick={() => setIsOpen(false)} 
                className="text-white/60 hover:text-green-400 py-1 text-sm italic font-medium"
              >
                {cat.name}
              </a>
            ))}
            <Link 
              to="/admin" 
              onClick={() => setIsOpen(false)}
              className="bg-green-600 text-white w-full max-w-xs py-4 rounded-xl text-xs font-black uppercase tracking-[0.3em] text-center"
            >
              ADMIN
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

