import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useData } from '../../data/DataContext';

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { companyInfo } = useData();

  return (
    <footer className="bg-slate-950 text-slate-400 relative border-t border-slate-900 font-inter">
      <div className="py-6 md:py-8 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
               <div className="h-9 w-9 flex items-center justify-center overflow-hidden rounded-xl shrink-0">
                  <img src="/images/logo.png" alt="Harito Logo" className="h-full w-full object-contain" />
               </div>
               <span className="font-semibold text-base tracking-tight leading-tight">Harito</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px] font-normal">
              ISO 9001:2015 Certified manufacturer and trader of chemical fertilizers and pesticides.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-3">Quick Links</h3>
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
                    className="text-[11px] font-normal text-slate-400 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details - Address Only (as per ISO Certificate) */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-3">Registered Office</h3>
            <div className="flex items-start gap-2">
              <MapPin className="text-green-500 shrink-0 mt-0.5" size={13} />
              <p className="text-[11px] font-normal text-slate-400 leading-relaxed">
                Durga Nagar Back in Megha City,<br />
                Nr Mandir & Suresh Sharma Nagar,<br />
                Mahanagar, Bareilly,<br />
                Uttar Pradesh – 243006, India
              </p>
            </div>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[11px] font-normal text-slate-600">
            © {new Date().getFullYear()} Harito Crop Science Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-4 text-[11px] font-normal text-slate-600">
             <Link to="/privacy" onClick={handleScrollToTop} className="hover:text-green-400 transition-colors">Privacy Policy</Link>
             <Link to="/terms" onClick={handleScrollToTop} className="hover:text-green-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
