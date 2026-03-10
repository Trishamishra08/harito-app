import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 relative border-t border-slate-900">
      <div className="py-8 md:py-10 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
               <div className="h-10 w-10 flex items-center justify-center overflow-hidden rounded-xl shrink-0">
                  <img src="/images/logo.png" alt="Harito Logo" className="h-full w-full object-contain" />
               </div>
               <span className="style-font font-black text-xl tracking-tighter italic leading-tight mt-1">Harito</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] md:text-xs">
              Transforming agricultural data into high-yield assets since 2010. Precision intelligence and landscape solutions for the modern farmer.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-white font-bold text-xs uppercase tracking-wide mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Products', to: '/products' },
                { label: 'Categories', to: '/categories' },
                { label: 'Godown Facilities', to: '/godown' }
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.to} 
                    onClick={handleScrollToTop}
                    className="text-[11px] font-medium hover:text-[#3ed0a5] transition-colors flex items-center gap-2 group"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wide mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="text-[#3ed0a5] shrink-0 mt-0.5" size={14} />
                <span className="text-[11px] font-medium leading-relaxed">
                  123 Farming Road, Agriculture Center,<br />
                  TX 78201, USA
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="text-[#3ed0a5] shrink-0" size={14} />
                <span className="text-[11px] font-medium">(210) 420-0890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="text-[#3ed0a5] shrink-0" size={14} />
                <span className="text-[11px] font-medium">info@harito-agri.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <p className="text-[10px] md:text-[11px] font-medium text-slate-500">
            © {new Date().getFullYear()} Harito Agriculture. All rights reserved.
          </p>
          <div className="flex gap-4 text-[10px] md:text-[11px] font-medium text-slate-600">
             <Link to="/privacy" onClick={handleScrollToTop} className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link to="/terms" onClick={handleScrollToTop} className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
