import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../data/DataContext';
import { ChevronLeft, ChevronRight, ArrowRight, Search, MapPin, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Carousel = () => {
  const { carousel, getImageUrl } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carousel.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carousel.length) % carousel.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [carousel.length]);

  if (!carousel || carousel.length === 0) return null;

  return (
    <div id="home" className="relative w-full overflow-hidden">
      <div className="relative h-screen w-full overflow-hidden group">
        <AnimatePresence mode="wait">
          {carousel.map((slide, index) => index === currentIndex && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={getImageUrl(slide.image)}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Minimalist Content Container - Realigned and Resized */}
              <div className="relative h-full flex flex-col justify-center items-start px-6 md:px-24 max-w-7xl mx-auto">
                 <motion.h1 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-2xl max-w-md mb-10 capitalize"
                 >
                    {slide.title || slide.subtitle}
                 </motion.h1>

                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                 >
                    <Link to={slide.link || '/products'} className="bg-green-600 hover:bg-white hover:text-green-800 text-white transition-all px-6 py-2.5 rounded-full font-bold text-[9px] uppercase tracking-[0.2em] shadow-xl flex items-center gap-3 group/btn">
                       EXPLORE CATALOG <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                 </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Minimalist Navigation Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
           {carousel.map((_, i) => (
             <button 
               key={i} 
               onClick={() => setCurrentIndex(i)}
               className={`h-1.5 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-12 bg-green-500' : 'w-4 bg-white/30 hover:bg-white/50'}`}
             />
           ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
