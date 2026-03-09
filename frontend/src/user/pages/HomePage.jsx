import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../sections/Carousel.jsx';
import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Categories from '../sections/Categories.jsx';
import Godown from '../sections/Godown.jsx';
import Contact from '../sections/Contact.jsx';
import { useData } from '../../data/DataContext';
import { ArrowRight, ArrowRightCircle, Sprout, Droplets, Leaf, Flower2, User, Search, MapPin } from 'lucide-react';

const FeaturedProducts = () => {
  const { products, getImageUrl } = useData();
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 300;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section id="products" className="relative py-12 bg-[#F9FBF9] overflow-hidden leading-snug">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-10 text-center">
          <span className="text-green-700 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block">Top Quality</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2A3324] font-inter">
            Featured Products
          </h2>
        </div>

        <div className="relative group/scroll">
          {/* Scroll Buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-30 bg-white/10 hover:bg-white/30 text-white p-4 rounded-full border border-white/30 backdrop-blur-md transition-all opacity-0 group-hover/scroll:opacity-100 hidden md:flex items-center justify-center shadow-2xl"
          >
            <ArrowRight size={24} className="rotate-180" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-30 bg-white/10 hover:bg-white/30 text-white p-4 rounded-full border border-white/30 backdrop-blur-md transition-all opacity-0 group-hover/scroll:opacity-100 hidden md:flex items-center justify-center shadow-2xl"
          >
            <ArrowRight size={24} />
          </button>

          <div 
            ref={scrollRef}
            className="flex flex-nowrap overflow-x-auto no-scrollbar gap-x-4 md:gap-x-6 pb-6 scroll-smooth items-stretch"
          >
            {products.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-sm shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col group min-w-[150px] md:min-w-[190px] max-w-[190px]"
              >
                {/* Image top half - strictly edge-to-edge square/rectangle, sharp corners */}
                <div className="h-36 md:h-44 w-full relative bg-white overflow-hidden p-2">
                  <img 
                    src={getImageUrl(item.image)} 
                    alt={item.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                {/* Text bottom half - clean white space like reference */}
                <div className="p-3 md:p-4 text-left flex flex-col flex-1 bg-white border-t border-slate-50">
                   <h3 className="text-[13px] md:text-[14px] font-bold text-[#2A3324] font-inter mb-1 line-clamp-1">
                      {item.name}
                   </h3>
                   
                   <p className="text-[10px] md:text-[11px] text-slate-500 font-medium line-clamp-2 leading-tight">
                      {item.description || "Premium agricultural solutions to enhance growth."}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const searchContainerRef = React.useRef(null);

  React.useEffect(() => {
    let ticking = false;

    const updateOpacity = () => {
      if (searchContainerRef.current) {
        const rect = searchContainerRef.current.getBoundingClientRect();
        // Start fading out when it gets within 300px of the top edge, completely hidden by 150px
        if (rect.top < 300) {
           const newOpacity = Math.max(0, (rect.top - 150) / 150);
           searchContainerRef.current.style.opacity = newOpacity;
           // Optional: disable pointer events when fully hidden so it doesn't block clicks underneath
           searchContainerRef.current.style.pointerEvents = newOpacity === 0 ? 'none' : 'auto';
        } else {
           searchContainerRef.current.style.opacity = 1;
           searchContainerRef.current.style.pointerEvents = 'auto';
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      // Use requestAnimationFrame to ensure smooth 60fps performance without freezing
      if (!ticking) {
        window.requestAnimationFrame(updateOpacity);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="space-y-0 overflow-hidden bg-[#F9FBF9]">
      {/* Hero Section with Slider - Refactored to be compact */}
      <Carousel />
      
      {/* Pill Styled Details / About Hook - Redesigned to match reference */}
      <section className="bg-[#FAF9F6] relative z-20 pb-10 md:pb-16 pt-0 mt-0">
        {/* Overlapping Pill Search Bar EXACTLY between the two divs */}
        <div 
           id="search-pill-container"
           ref={searchContainerRef}
           className="absolute left-0 right-0 top-0 -translate-y-1/2 z-30 px-4"
        >
           <div className="max-w-4xl mx-auto pointer-events-auto">
              <div className="bg-[#A4BC8E] rounded-[3rem] p-2 shadow-xl border border-white/20 flex flex-col md:flex-row items-center gap-2">
              
              {/* White Search Container */}
              <div className="flex-1 bg-white rounded-full flex flex-wrap md:flex-nowrap items-center px-4 py-2.5 w-full border border-[#91A87D]/30 shadow-sm relative overflow-hidden">
                 <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="flex-1 bg-transparent border-none outline-none text-slate-700 text-[13px] placeholder-slate-400 font-medium min-w-[120px]"
                 />
                 <div className="h-5 w-px bg-slate-200 mx-3 hidden md:block"></div>
                 <input 
                    type="text" 
                    placeholder="Categories..." 
                    className="flex-1 bg-transparent border-none outline-none text-slate-700 text-[13px] placeholder-slate-400 font-medium min-w-[120px] mb-2 md:mb-0 hidden md:block"
                 />
                 <div className="flex items-center gap-3 ml-auto">
                    <User size={16} className="text-slate-400 hover:text-green-600 cursor-pointer transition-colors" />
                    <Search size={16} className="text-slate-400 hover:text-green-600 cursor-pointer transition-colors" />
                    <div className="bg-green-700 text-white w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black pointer-events-none">
                       1
                    </div>
                 </div>
              </div>

              {/* Action Button */}
              <button className="bg-[#3A5A38] hover:bg-[#2D472B] text-white px-6 py-2.5 rounded-full font-bold text-[13px] tracking-wide transition-all w-full md:w-auto shadow-md">
                 Explore
              </button>
           </div>
           </div>
        </div>

        {/* 2-Column About layout */}
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center pt-16 md:pt-20">
           {/* Left Image Column */}
           <div className="relative mx-auto w-full max-w-[320px] md:max-w-[380px]">
              <div className="relative rounded-2xl bg-white p-2 shadow-xl rotate-[-2deg] transition-transform hover:rotate-0 duration-500">
                 <img 
                    src="/images/about_farm.png" 
                    alt="Harito Crop Science Facility" 
                    className="w-full h-auto aspect-[4/3] object-cover rounded-xl"
                 />
                 
                 {/* Top Left Badge */}
                 <div className="absolute -left-4 md:-left-6 -top-4 md:-top-6 bg-[#3A5A38] rounded-full w-20 h-20 md:w-24 md:h-24 border-[4px] border-white shadow-lg flex flex-col items-center justify-center text-white z-10 rotate-[10deg] hover:rotate-0 transition-transform duration-300">
                    <Sprout size={24} className="mb-1 hidden md:block" />
                    <Sprout size={18} className="mb-1 md:hidden" />
                    <span className="text-[9px] md:text-[10px] font-black uppercase text-center leading-tight px-1 tracking-wider">Harito<br/>Certified</span>
                 </div>

                 {/* Bottom Right Badge */}
                 <div className="absolute -right-3 md:-right-5 -bottom-3 md:-bottom-5 bg-[#E37A53] rounded-full w-14 h-14 md:w-16 md:h-16 border-[4px] border-white shadow-lg flex items-center justify-center text-white z-10 rotate-[-15deg] hover:rotate-0 transition-transform duration-300">
                    <Leaf size={20} className="fill-current text-[#FAF9F6] hidden md:block" />
                    <Leaf size={16} className="fill-current text-[#FAF9F6] md:hidden" />
                 </div>
              </div>
           </div>

           {/* Right Text Column */}
           <div className="space-y-4 md:pl-2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#2A3324] leading-[1.1] font-inter">
                 Welcome to Harito Crop Science!
              </h2>
              
              <p className="text-slate-500 text-[13px] md:text-sm leading-relaxed font-medium">
                 An ISO 9001:2015 certified manufacturer committed to elite fertilizers and pesticides. We empower farmers with sustainable science and high-yield solutions, bringing innovation directly to your fields.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 pt-2 justify-center md:justify-start">
                 <Link to="/about" className="bg-[#3A5A38] hover:bg-[#2D472B] text-white px-6 py-2.5 rounded-full font-semibold text-[13px] flex items-center gap-2 transition-all shadow-md group">
                    <MapPin size={16} className="group-hover:-translate-y-1 transition-transform" />
                    Read Our Full Story
                 </Link>
                 
                 <Link to="/contact" className="text-slate-600 font-bold text-[13px] hover:text-[#3A5A38] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#3A5A38] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
                    Contact Us Today
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* Main Categories Hook */}
      <Categories />
      
      {/* Featured Products Section */}
      <FeaturedProducts />
      
      {/* Logistics Section - Redesigned to be more compact with fresh background */}
      <section id="logistics" className="py-10 md:py-16 bg-[#EAF1EB] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center gap-8 relative">
            
            {/* Left Image Component */}
            <div className="w-full md:w-5/12 relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl z-10 border-[4px] border-white">
                <img 
                  src="/images/storage_facility_agri.png" 
                  alt="Harito Logistics Facility" 
                  className="w-full h-[220px] md:h-[320px] object-cover"
                />
              </div>
              <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-green-100 rounded-full blur-2xl opacity-60"></div>
            </div>

            {/* Right Content Component */}
            <div className="w-full md:w-7/12 relative z-20">
              <span className="text-[#1E5D57] font-bold uppercase tracking-[0.3em] text-[9px] mb-3 block">
                Logistics & Supply
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2A3324] font-inter leading-tight mb-6">
                Precision <span className="text-[#E37A53]">Storage</span> & <br/>
                Fast Supply Chain
              </h2>

              {/* Overlapping Card */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg shadow-slate-200/40 border border-slate-50 relative md:-ml-16 mt-2">
                <div className="absolute -top-5 left-8 w-10 h-10 bg-[#E37A53] rounded-full flex items-center justify-center text-white shadow-md">
                   <MapPin size={20} />
                </div>
                
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 font-medium italic">
                  "Located in Bareilly, our state-of-the-art facilities ensure safe handling and rapid distribution of all agricultural products."
                </p>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <h4 className="text-[#2A3324] font-bold text-xs md:text-sm">Regional Hub</h4>
                    <p className="text-slate-400 text-[10px] md:text-xs">Uttar Pradesh, Bareilly</p>
                  </div>
                  <Link to="/godown" className="bg-[#1E5D57] hover:bg-[#132c20] text-white px-5 py-2 rounded-full font-bold text-[11px] tracking-wide transition-all shadow-sm">
                    Explore Godown
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Contact Section - Redesigned to be more compact */}
      <section id="contact-hook" className="py-12 md:py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 relative">
            
            {/* Left Content Component */}
            <div className="w-full md:w-7/12 relative z-20">
              <span className="text-green-700 font-bold uppercase tracking-[0.3em] text-[9px] mb-3 block">
                Start Your Journey
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2A3324] font-inter leading-tight mb-8">
                Ready to <span className="text-green-600">Grow?</span> <br/>
                Talk to Our Experts Today.
              </h2>

              {/* Overlapping Card */}
              <div className="bg-white p-6 md:p-10 rounded-[1.5rem] shadow-xl shadow-green-900/5 border border-slate-100 relative md:-mr-10 z-30">
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-medium">
                  Sustainable science for high-yield results is just a conversation away. Our consultants are ready to help you optimize your crop production.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link to="/contact" className="bg-[#3A5A38] hover:bg-[#2D472B] text-white px-8 py-3.5 rounded-full font-bold text-xs tracking-widest transition-all shadow-lg active:scale-95 text-center w-full sm:w-auto">
                    GET IN TOUCH NOW
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Image Component */}
            <div className="w-full md:w-5/12 relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-xl z-10 border-[6px] border-slate-50 rotate-[1deg] hover:rotate-0 transition-transform duration-700">
                <img 
                  src="/images/happy_farmer_consultant.png" 
                  alt="Agricultural Consultant" 
                  className="w-full h-[280px] md:h-[380px] object-cover"
                />
              </div>
              {/* Decorative Circle */}
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-white shadow-md rotate-12 z-20">
                 <Flower2 size={28} className="animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
