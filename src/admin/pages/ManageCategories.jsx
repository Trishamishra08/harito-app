import React, { useState } from 'react';
import { useData } from '../../data/DataContext';
import { Plus, Trash2, Edit3, Tags, X, Check, Image as ImageIcon } from 'lucide-react';

const CategoryManagement = () => {
  const { categories, setCategories } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', image: '' });

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ ...category });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', description: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this category? This might leave products unassigned.')) {
      setCategories(categories.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(categories.map(item => item.id === editingCategory.id ? { ...item, ...formData } : item));
    } else {
      const newCategory = { id: Date.now(), ...formData };
      setCategories([...categories, newCategory]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-[9px] font-black text-green-600 uppercase tracking-[0.3em]">Schema Manager</span>
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase leading-none mt-1">Categories</h1>
          <p className="text-xs text-slate-500 font-medium italic mt-2">Manage organizational taxons for Hirato solutions.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-green-600 hover:bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
        >
          <Plus size={16} /> NEW CATEGORY
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 p-6 flex flex-col">
            <div className="w-16 h-16 rounded-2xl overflow-hidden mb-5 border-2 border-slate-50 group-hover:border-green-100 transition-colors shrink-0">
               <img src={category.image} alt={category.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
            </div>
            <div className="flex-grow">
               <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2 group-hover:text-green-600 transition-colors">{category.name}</h3>
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-tighter leading-relaxed mb-6 opacity-60">"{category.description}"</p>
            </div>
            <div className="flex gap-2 pt-5 border-t border-slate-50">
               <button 
                 onClick={() => handleOpenModal(category)}
                 className="flex-1 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-400 font-black text-[9px] py-2.5 rounded-lg transition-all uppercase tracking-widest"
               >
                 Edit
               </button>
               <button 
                 onClick={() => handleDelete(category.id)}
                 className="flex-1 bg-slate-50 hover:bg-red-600 hover:text-white text-slate-400 font-black text-[9px] py-2.5 rounded-lg transition-all uppercase tracking-widest"
               >
                 Delete
               </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden p-8 animate-fade-in border-b-4 border-green-600">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase">
                {editingCategory ? 'EDIT CATEGORY' : 'NEW CATEGORY'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-800 transition-colors p-2 bg-slate-50 rounded-xl">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Label Name</label>
                  <input 
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="E.G. PESTICIDES"
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none font-black text-[10px] uppercase tracking-widest"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Focus Description</label>
                  <textarea 
                    rows="2" required value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-green-500/50 outline-none font-medium text-[10px] italic"
                  ></textarea>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Icon URL</label>
                    <input 
                      type="text" required value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none text-[10px] font-black uppercase tracking-widest"
                    />
                  </div>
              </div>
              <div className="flex gap-3 pt-6 border-t border-slate-100">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 text-slate-500 font-black text-[9px] py-4 rounded-xl uppercase tracking-widest">Discard</button>
                 <button type="submit" className="flex-[2] bg-slate-900 hover:bg-green-600 text-white font-black text-[9px] py-4 rounded-xl shadow-xl uppercase tracking-widest">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
