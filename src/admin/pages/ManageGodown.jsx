import React, { useState } from 'react';
import { useData } from '../../data/DataContext';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Warehouse, 
  MapPin, 
  Box, 
  Phone, 
  X, 
  Check,
  Search,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GodownManagement = () => {
  const { godowns, setGodowns } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGodown, setEditingGodown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', location: '', capacity: '', storedProducts: '', contactDetails: '' });

  const handleOpenModal = (godown = null) => {
    if (godown) {
      setEditingGodown(godown);
      setFormData({ ...godown });
    } else {
      setEditingGodown(null);
      setFormData({ name: '', location: '', capacity: '', storedProducts: '', contactDetails: '' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this storage facility from records?')) {
      setGodowns(godowns.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingGodown) {
      setGodowns(godowns.map(item => item.id === editingGodown.id ? { ...item, ...formData } : item));
    } else {
      const newGodown = { id: Date.now(), ...formData };
      setGodowns([...godowns, newGodown]);
    }
    setIsModalOpen(false);
  };

  const filteredGodowns = godowns.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-[#1E5D57]/5 rounded-none p-3 border-none shadow-sm mb-2">
        {/* Decorative Corner Shape */}
        <div className="absolute -top-10 -right-10 w-16 h-16 rounded-full bg-[#1E5D57]/10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
          <div>
            <span className="text-[8px] font-bold text-teal-600 uppercase tracking-widest mb-0.5 block">Logistics Management</span>
            <h1 className="text-base font-bold text-slate-800 tracking-tight leading-none uppercase">Storage Facilities</h1>
          </div>
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <div className="relative group flex-1 lg:w-56 focus-within:ring-1 focus-within:ring-teal-500/20">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-teal-500 transition-all" size={12} />
              <input 
                type="text" 
                placeholder="Filter facilities..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-none rounded-none py-1.5 pl-8 pr-3 outline-none text-slate-700 transition-all font-bold text-[10px] shadow-sm uppercase tracking-widest"
              />
            </div>
            <button 
              onClick={() => handleOpenModal()}
              className="bg-slate-900 hover:bg-teal-600 text-white px-3 py-1.5 rounded-none text-[9px] font-bold transition-all shadow-lg flex items-center gap-2 active:scale-95 uppercase tracking-widest"
            >
              <Plus size={12} /> REGISTER
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredGodowns.map((site) => (
          <motion.div 
            key={site.id} 
            whileHover={{ y: -2 }}
            className="group relative overflow-hidden bg-[#1E5D57]/5 backdrop-blur-md rounded-none border border-teal-900/5 p-3 transition-all duration-300 shadow-sm"
          >
            {/* Ornament */}
            <div className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-[#1E5D57]/10 pointer-events-none transition-transform group-hover:scale-125 focus-within:scale-125" />
            
            <div className="relative z-10 flex justify-between items-start mb-3">
               <div className="h-8 w-8 rounded-none bg-white flex items-center justify-center text-teal-600 group-hover:bg-[#1E5D57] group-hover:text-white transition-all duration-500 shadow-sm border border-teal-900/5">
                  <Warehouse size={14} />
               </div>
               <div className="flex gap-1">
                 <button onClick={() => handleOpenModal(site)} className="bg-white p-1.5 rounded-none border border-teal-900/5 text-slate-400 hover:text-teal-600 transition-all shadow-sm">
                    <Edit3 size={10} />
                 </button>
                 <button onClick={() => handleDelete(site.id)} className="bg-white p-1.5 rounded-none border border-teal-900/5 text-slate-400 hover:text-red-500 transition-all shadow-sm">
                    <Trash2 size={10} />
                 </button>
               </div>
            </div>
            
            <div className="relative z-10 space-y-3">
               <div>
                  <h3 className="text-[10px] font-bold text-slate-800 tracking-widest group-hover:text-teal-600 transition-colors uppercase leading-none">{site.name}</h3>
                  <p className="text-[7.5px] font-bold text-slate-400 mt-1 flex items-center gap-1 uppercase tracking-widest"><MapPin size={8} className="text-teal-500" /> {site.location}</p>
               </div>
 
               <div className="grid grid-cols-2 gap-2 py-2 border-y border-teal-900/5">
                  <div className="space-y-0.5">
                    <p className="text-[6.5px] font-bold text-slate-400 uppercase tracking-widest">Capacity</p>
                    <div className="flex items-center gap-1">
                       <Activity size={7} className="text-green-500" />
                       <p className="text-[8px] font-bold text-slate-700 tracking-tight">{site.capacity}</p>
                    </div>
                  </div>
                  <div className="space-y-0.5 border-l border-teal-900/5 pl-2">
                    <p className="text-[6.5px] font-bold text-slate-400 uppercase tracking-widest">Inventory</p>
                    <p className="text-teal-700 text-[7.5px] font-bold truncate uppercase">{site.storedProducts}</p>
                  </div>
               </div>
 
               <div className="flex items-center justify-between pt-0.5">
                  <div className="flex items-center gap-1.5">
                     <div className="w-5 h-5 rounded-none bg-white flex items-center justify-center text-slate-400 border border-teal-900/5">
                        <Phone size={7} />
                     </div>
                     <p className="text-[7.5px] font-bold text-slate-500 tracking-widest">{site.contactDetails}</p>
                  </div>
                  <button className="text-teal-600 font-bold text-[6.5px] uppercase tracking-widest flex items-center gap-0.5 hover:underline">
                    Stats <ArrowUpRight size={8} />
                  </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Godown Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a201e]/80 backdrop-blur-md" 
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white w-full max-w-lg rounded-none shadow-2xl overflow-hidden p-6 border border-teal-900/10 no-scrollbar overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-6 pt-2">
                 <div>
                    <span className="text-[8px] font-bold text-teal-600 uppercase tracking-widest block mb-0.5">Infrastructure</span>
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight uppercase leading-none">
                     {editingGodown ? 'Update Facility' : 'New Facility'}
                   </h3>
                 </div>
                <button onClick={() => setIsModalOpen(false)} className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all bg-slate-50 rounded-none active:scale-90">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Facility Name</label>
                    <input 
                      type="text" required value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="HUB NAME" 
                      className="w-full bg-slate-50 border border-teal-900/5 rounded-none py-2 px-3 focus:ring-4 focus:ring-teal-500/5 focus:bg-white outline-none text-slate-700 transition-all font-bold text-[10px] uppercase tracking-widest"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Location</label>
                    <input 
                      type="text" required value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="CITY, STATE"
                      className="w-full bg-slate-50 border border-teal-900/5 rounded-none py-2 px-3 focus:ring-4 focus:ring-teal-500/5 focus:bg-white outline-none text-slate-700 transition-all font-bold text-[10px] uppercase tracking-widest"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Capacity</label>
                    <input 
                      type="text" required value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      placeholder="E.G. 5000 MT" 
                      className="w-full bg-slate-50 border border-teal-900/5 rounded-none py-2 px-3 focus:ring-4 focus:ring-teal-500/5 focus:bg-white outline-none text-slate-700 transition-all font-bold text-[10px] uppercase tracking-widest"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Contact</label>
                    <input 
                      type="text" required value={formData.contactDetails}
                      onChange={(e) => setFormData({...formData, contactDetails: e.target.value})}
                      placeholder="+91-XXXXXXXXXX"
                      className="w-full bg-slate-50 border border-teal-900/5 rounded-none py-2 px-3 focus:ring-4 focus:ring-teal-500/5 focus:bg-white outline-none text-slate-700 transition-all font-bold text-[10px] uppercase tracking-widest"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Resources</label>
                    <input 
                      type="text" required value={formData.storedProducts}
                      onChange={(e) => setFormData({...formData, storedProducts: e.target.value})}
                      placeholder="RESOURCES TYPES" 
                      className="w-full bg-slate-50 border border-teal-900/5 rounded-none py-2 px-3 focus:ring-4 focus:ring-teal-500/5 focus:bg-white outline-none text-slate-700 transition-all font-bold text-[10px] uppercase tracking-widest"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                   <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold text-[9px] py-2.5 rounded-none transition-all uppercase tracking-widest">Discard</button>
                   <button type="submit" className="flex-[2] bg-[#1E5D57] hover:bg-[#13423E] text-white font-bold text-[9px] py-2.5 rounded-none transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest">
                     SAVE DATA <Check size={14} />
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

export default GodownManagement;
