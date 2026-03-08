import React, { useState, useEffect } from 'react';
import { useData } from '../../data/DataContext';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const Carousel = () => {
  const { carousel } = useData();
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
    <div id="home" className="relative min-h-[85vh] md:min-h-screen w-full overflow-hidden group">
      {carousel.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-slate-900">
            <img
              src={slide.image}
              alt=""
              className="h-full w-full object-cover grayscale-[20%]"
            />
            {/* Dark Overlay with Top Gradient to protect navbar */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/50" />
          </div>

          {/* Content Container */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-48 pb-32">
            <div className="max-w-4xl space-y-6 md:space-y-8 animate-fade-in">
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold italic text-white leading-[1.2] tracking-tighter drop-shadow-2xl">
                <span className="text-[#22c55e] block mb-2 drop-shadow-[0_2px_15px_rgba(34,197,94,0.3)]">Smart Solutions for</span>
                <span className="block text-white/95">Healthy Crops</span>
              </h1>
            </div>
          </div>

          {/* Wavy Mask Bottom Effect */}
          <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-[#d0e6d4] wavy-bottom z-10" />
        </div>
      ))}

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-[#1E5D57] text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-[#1E5D57] text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {carousel.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              index === currentIndex ? 'w-8 bg-[#1E5D57]' : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

