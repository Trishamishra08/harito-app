import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 relative border-t border-slate-900">
      <div className="py-12 md:py-16 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-white">
               <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-xl shrink-0">
                  <img src="/images/logo.png" alt="Harito Logo" className="h-full w-full object-contain" />
               </div>
               <span className="style-font font-black text-2xl tracking-tighter italic leading-tight mt-1">Harito</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Transforming agricultural data into high-yield assets since 2010. Precision intelligence and landscape solutions for the modern farmer.
            </p>
            {/* Social Icons Removed as per user request */}
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '#home' },
                { label: 'About Us', to: '#about' },
                { label: 'Products', to: '/products' },
                { label: 'Categories', to: '#categories' },
                { label: 'Godown Facilities', to: '#godown' }
              ].map((link, i) => (
                <li key={i}>
                  {link.to.startsWith('/') ? (
                    <Link to={link.to} className="text-xs font-medium hover:text-[#3ed0a5] transition-colors flex items-center gap-2 group">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.to} className="text-xs font-medium hover:text-[#3ed0a5] transition-colors flex items-center gap-2 group">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#3ed0a5] shrink-0 mt-0.5" size={16} />
                <span className="text-xs font-medium leading-relaxed">
                  123 Farming Road, Agriculture Center,<br />
                  TX 78201, USA
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#3ed0a5] shrink-0" size={16} />
                <span className="text-xs font-medium">(210) 420-0890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#3ed0a5] shrink-0" size={16} />
                <span className="text-xs font-medium">info@harito-agri.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs font-medium text-slate-500">
            © {new Date().getFullYear()} Harito Agriculture. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-medium text-slate-600">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
