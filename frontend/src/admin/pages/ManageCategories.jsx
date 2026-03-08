import React, { useState } from 'react';
import { useData } from '../../data/DataContext';
import { Plus, Trash2, Edit3, Tags, X, Check, Image as ImageIcon, LayoutGrid, FlaskConical, Sprout, Leaf, HardHat, Microscope, Tractor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryManagement = () => {
  const { categories, setCategories, fetchCategories, getImageUrl } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', image: '' });

  const getCategoryIcon = (name, size = 24) => {
    const props = { size, className: "transition-colors duration-500" };
    switch (name.toLowerCase()) {
      case 'pesticides': return <FlaskConical {...props} className={`${props.className} text-teal-600 group-hover:text-teal-700`} />;
      case 'fertilizers': return <Microscope {...props} className={`${props.className} text-teal-600 group-hover:text-teal-700`} />;
      case 'seeds': return <Leaf {...props} className={`${props.className} text-teal-600 group-hover:text-teal-700`} />;
      case 'agricultural equipment': return <Tractor {...props} className={`${props.className} text-teal-600 group-hover:text-teal-700`} />;
      default: return <LayoutGrid {...props} className={`${props.className} text-teal-600 group-hover:text-teal-700`} />;
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, description: category.description, image: category.image });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', description: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category? This might leave products unassigned.')) {
      try {
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${apiBase}/categories/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchCategories(); // Refresh from data context
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const url = editingCategory 
        ? `${apiBase}/categories/${editingCategory.id || editingCategory._id}` 
        : `${apiBase}/categories`;
      
      const method = editingCategory ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchCategories(); // Refresh data context
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}${errorData.error ? ` - ${errorData.error}` : ''}`);
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category. Is the backend running?');
    }
  };


  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-[#1E5D57]/5 rounded-none p-3 border-none shadow-sm mb-2">
        {/* Decorative Corner Shape */}
        <div className="absolute -top-10 -right-10 w-16 h-16 rounded-full bg-[#1E5D57]/10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
          <div>
            <span className="text-[8px] font-bold text-teal-600 uppercase tracking-widest mb-0.5 block">Classification Manager</span>
            <h1 className="text-base font-bold text-slate-800 tracking-tight leading-none uppercase">Product Categories</h1>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-slate-900 hover:bg-teal-600 text-white px-3 py-1.5 rounded-none text-[9px] font-bold transition-all shadow-lg flex items-center gap-2 active:scale-95 uppercase tracking-widest"
          >
            <Plus size={12} /> NEW CATEGORY
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((category) => (
          <motion.div 
            key={category.id} 
            whileHover={{ y: -2 }}
            className="group relative overflow-hidden bg-[#1E5D57]/5 backdrop-blur-md rounded-none border-none p-3 transition-all duration-300 shadow-sm"
          >
            {/* Ornament for each card */}
            <div className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-[#1E5D57]/10 pointer-events-none transition-transform group-hover:scale-125 focus-within:scale-125" />
            
            <div className="relative z-10 flex items-center gap-3 mb-3">
              <div className="h-8 w-8 flex items-center justify-center text-teal-600 bg-white group-hover:bg-[#1E5D57] group-hover:text-white transition-all duration-500 shadow-sm border border-teal-900/5">
                 {getCategoryIcon(category.name, 18)}
              </div>
              <div className="flex-grow">
                 <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">{category.name}</h3>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-teal-900/5 relative z-10">
               <button 
                 onClick={() => handleOpenModal(category)}
                 className="flex-1 bg-white p-1.5 rounded-none text-slate-400 hover:text-teal-600 transition-all shadow-sm border border-teal-900/5 flex items-center justify-center gap-1.5 text-[8px] font-bold uppercase tracking-widest"
               >
                  <Edit3 size={10} /> Edit
               </button>
               <button 
                 onClick={() => handleDelete(category.id)}
                 className="flex-1 bg-white p-1.5 rounded-none text-slate-400 hover:text-red-500 transition-all shadow-sm border border-teal-900/5 flex items-center justify-center gap-1.5 text-[8px] font-bold uppercase tracking-widest"
               >
                  <Trash2 size={10} /> Delete
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Category Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a201e]/70"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden p-8 border border-white"
            >
              <div className="flex justify-between items-center mb-8 pb-4">
                <div>
                  <span className="text-[10px] font-medium text-teal-600 uppercase tracking-widest block mb-1">Configuration</span>
                  <h3 className="text-xl font-medium text-slate-800 tracking-tight uppercase leading-none">
                    {editingCategory ? 'Edit Taxonomic Group' : 'New Catalog Group'}
                  </h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-teal-600 transition-all bg-slate-50 rounded-xl active:scale-90 shadow-sm">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Group Title</label>
                    <input 
                      type="text" required value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="E.G. ORGANIC FERTILIZERS"
                      className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-700 transition-all font-bold text-xs"
                    />
                  </div>
                  <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category Image</label>
                      <div className="flex items-center gap-4">
                        {formData.image && (
                          <div className="w-16 h-16 bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                             <img src={getImageUrl(formData.image)} alt="Preview" className="h-full object-contain" />
                          </div>
                        )}
                        <div className="flex-1 relative">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              
                              const formDataToUpload = new FormData();
                              formDataToUpload.append('image', file);
                              
                              try {
                                 const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                                 const response = await fetch(`${apiBase}/upload`, {
                                   method: 'POST',
                                   body: formDataToUpload
                                 });
                                if (response.ok) {
                                  const data = await response.json();
                                  setFormData({...formData, image: data.imageUrl});
                                } else {
                                  alert('Failed to upload image');
                                }
                              } catch (err) {
                                console.error('Error uploading:', err);
                                alert('Error uploading image. Is the backend running?');
                              }
                            }}
                            className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-400 font-bold text-[10px] file:mr-4 file:py-1 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer transition-all"
                          />
                        </div>
                      </div>
                    </div>
                </div>
                <div className="flex gap-4 pt-6">
                   <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold text-xs py-3 rounded-xl transition-all">Discard</button>
                   <button type="submit" className="flex-[2] bg-[#1E5D57] hover:bg-[#13423E] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                     COMMIT GROUP <Check size={18} />
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

export default CategoryManagement;
