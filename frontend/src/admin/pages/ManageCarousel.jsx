import React, { useState } from 'react';
import { useData } from '../../data/DataContext';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Image as ImageIcon, 
  X, 
  Check, 
  Upload,
  ArrowRight,
  Monitor,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CarouselManagement = () => {
  const { carousel, addCarouselSlide, updateCarouselSlide, deleteCarouselSlide } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });

  const handleOpenModal = (slide = null) => {
    if (slide) {
      setEditingSlide(slide);
      setFormData({ title: slide.title, description: slide.description, image: slide.image });
    } else {
      setEditingSlide(null);
      setFormData({ title: '', description: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      await deleteCarouselSlide(id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingSlide) {
      await updateCarouselSlide(editingSlide.id, formData);
    } else {
      await addCarouselSlide(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-[#1E5D57]/5 rounded-none p-3 border-none shadow-sm mb-2">
        {/* Decorative Corner Shape */}
        <div className="absolute -top-10 -right-10 w-16 h-16 rounded-full bg-[#1E5D57]/10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
          <div>
            <span className="text-[8px] font-bold text-teal-600 uppercase tracking-widest mb-0.5 block">Visual Strategy</span>
            <h1 className="text-base font-bold text-slate-800 tracking-tight leading-none uppercase">Marketing Banners</h1>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-slate-900 hover:bg-teal-600 text-white px-3 py-1.5 rounded-none text-[9px] font-bold transition-all shadow-lg flex items-center gap-2 active:scale-95 uppercase tracking-widest"
          >
            <Plus size={12} /> NEW BANNER
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {carousel.map((slide) => (
          <motion.div 
            key={slide.id} 
            whileHover={{ y: -2 }}
            className="group relative overflow-hidden bg-[#1E5D57]/5 backdrop-blur-md rounded-none border-none transition-all duration-300 shadow-sm flex flex-col items-stretch"
          >
            {/* Banner ornament */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#1E5D57]/10 pointer-events-none transition-transform group-hover:scale-125 focus-within:scale-125" />
            
            <div className="relative h-28 overflow-hidden m-1.5 rounded-none shadow-sm border border-teal-900/5">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a201e]/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute top-1.5 right-1.5 flex gap-1">
                 <button 
                    onClick={() => handleOpenModal(slide)}
                    className="bg-white/90 backdrop-blur-md p-1 rounded-none text-[#1E5D57] hover:bg-[#1E5D57] hover:text-white transition-all shadow-lg transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                 >
                    <Edit3 size={10} />
                 </button>
                 <button 
                    onClick={() => handleDelete(slide.id)}
                    className="bg-white/90 backdrop-blur-md p-1 rounded-none text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-75"
                 >
                    <Trash2 size={10} />
                 </button>
              </div>

              <div className="absolute bottom-2 left-3 right-3">
                 <div className="flex items-center gap-1 mb-0.5">
                    <div className="w-1 h-1 rounded-full bg-teal-400"></div>
                    <span className="text-[6px] font-bold text-teal-100 uppercase tracking-widest">Active</span>
                 </div>
                 <h3 className="text-[9px] font-bold text-white tracking-tight leading-tight uppercase line-clamp-1">{slide.title}</h3>
              </div>
            </div>

            <div className="px-3 pb-3 pt-0.5 flex flex-col flex-grow justify-between relative z-10">
              <p className="text-slate-500 text-[8px] font-medium leading-relaxed mb-2 line-clamp-2 italic">"{slide.description}"</p>
              <div className="flex items-center justify-between border-t border-teal-900/5 pt-1.5">
                 <div className="flex items-center gap-1 text-slate-400">
                    <Eye size={8} />
                    <span className="text-[7px] font-bold uppercase tracking-widest">Preview</span>
                 </div>
                 <div className="h-4 w-4 rounded-none bg-white flex items-center justify-center text-slate-300 group-hover:bg-[#1E5D57] group-hover:text-white transition-colors border border-teal-900/5">
                    <Monitor size={8} />
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Slide Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a201e]/60 backdrop-blur-md" 
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden p-8 border border-white no-scrollbar overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-10">
                <div>
                   <span className="text-[10px] font-medium text-teal-600 uppercase tracking-widest block mb-1">Marketing Suite</span>
                   <h3 className="text-xl font-medium text-slate-800 tracking-tight uppercase leading-none">
                    {editingSlide ? 'Update Hero Slide' : 'Launch New Campaign'}
                  </h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-teal-600 transition-all bg-slate-50 rounded-xl active:scale-90 shadow-sm">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Campaign Headline</label>
                    <input 
                      type="text" required value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="E.G. REVOLUTIONIZING HARVESTS" 
                      className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-700 transition-all font-bold text-xs"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Marketing Body / CTA</label>
                    <textarea 
                      rows="3" required value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Enter a compelling description for this segment..." 
                      className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-700 transition-all font-medium text-xs leading-relaxed"
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Hero Asset Reference (URL)</label>
                    <input 
                      type="text" required value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="/hero/promo-banner.jpg"
                      className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-700 transition-all font-bold text-xs"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                   <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold text-xs py-3 rounded-xl transition-all">Discard</button>
                   <button type="submit" className="flex-[2] bg-[#1E5D57] hover:bg-[#13423E] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                     COMMIT CAMPAIGN <Check size={18} />
                   </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarouselManagement;
