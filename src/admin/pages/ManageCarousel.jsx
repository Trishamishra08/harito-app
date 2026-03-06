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
  ArrowRight
} from 'lucide-react';

const CarouselManagement = () => {
  const { carousel, setCarousel } = useData();
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

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      setCarousel(carousel.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSlide) {
      setCarousel(carousel.map(item => item.id === editingSlide.id ? { ...item, ...formData } : item));
    } else {
      const newSlide = {
        id: Date.now(),
        ...formData
      };
      setCarousel([...carousel, newSlide]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-[9px] font-black text-green-600 uppercase tracking-[0.3em]">Front-End Display</span>
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase leading-none mt-1">Hero Banners</h1>
          <p className="text-xs text-slate-500 font-medium italic mt-2">Manage high-impact visual segments for the homepage.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-green-600 hover:bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
        >
          <Plus size={16} /> NEW BANNER
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {carousel.map((slide) => (
          <div key={slide.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col items-stretch">
            <div className="relative h-56 overflow-hidden m-3 rounded-[1.5rem]">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                 <button 
                   onClick={() => handleOpenModal(slide)}
                   className="bg-white p-3 rounded-xl text-slate-800 hover:bg-slate-900 hover:text-white transition-all shadow-xl"
                 >
                   <Edit3 size={18} />
                 </button>
                 <button 
                   onClick={() => handleDelete(slide.id)}
                   className="bg-white p-3 rounded-xl text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-xl"
                 >
                   <Trash2 size={18} />
                 </button>
              </div>
            </div>
            <div className="p-6 pt-1 flex-grow space-y-3">
              <h3 className="text-sm font-black text-slate-800 group-hover:text-green-600 transition-colors uppercase tracking-tight line-clamp-1">{slide.title}</h3>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-tighter leading-relaxed line-clamp-2 opacity-60">"{slide.description}"</p>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Modal - Tighter */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden p-8 animate-fade-in border-b-4 border-green-600">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase">
                {editingSlide ? 'EDIT BANNER' : 'NEW BANNER'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-800 transition-colors p-2 bg-slate-50 rounded-xl">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Banner Title</label>
                  <input 
                    type="text" required value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="E.G. SUSTAINABLE FARMING SOLUTIONS" 
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none text-slate-800 transition-all font-black text-[10px] uppercase tracking-widest"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Call to Action Text</label>
                  <textarea 
                    rows="2" required value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Brief description for the hero segment..." 
                    className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-green-500/50 outline-none text-slate-800 transition-all font-medium text-[10px] italic"
                  ></textarea>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset URL</label>
                  <input 
                    type="text" required value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none text-slate-800 transition-all font-black text-[9px] uppercase tracking-widest"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-slate-100">
                 <button 
                   type="button" onClick={() => setIsModalOpen(false)}
                   className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-[9px] py-4 rounded-xl transition-all uppercase tracking-widest"
                 >
                   Discard
                 </button>
                 <button 
                   type="submit" 
                   className="flex-[2] bg-slate-900 hover:bg-green-600 text-white font-black text-[9px] py-4 rounded-xl transition-all shadow-xl uppercase tracking-widest flex items-center justify-center gap-2"
                 >
                   {editingSlide ? 'UPDATE ASSET' : 'PUBLISH ASSET'} <Check size={16} />
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselManagement;
