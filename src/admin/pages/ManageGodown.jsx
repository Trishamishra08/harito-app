import React, { useState } from 'react';
import { useData } from '../../data/DataContext';
import { Plus, Trash2, Edit3, Warehouse, MapPin, Box, Phone, X, Check } from 'lucide-react';

const GodownManagement = () => {
  const { godowns, setGodowns } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGodown, setEditingGodown] = useState(null);
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

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-[9px] font-black text-green-600 uppercase tracking-[0.3em]">Logistics Hub</span>
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase leading-none mt-1">Storage Units</h1>
          <p className="text-xs text-slate-500 font-medium italic mt-2">Manage physical inventory points for Hirato assets.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-green-600 hover:bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
        >
          <Plus size={16} /> REGISTER UNIT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {godowns.map((site) => (
          <div key={site.id} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative p-6">
            <div className="bg-slate-50 p-4 rounded-2xl mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors flex items-center justify-between border border-slate-100">
               <Warehouse size={32} className="text-green-600 group-hover:text-white" />
               <div className="flex gap-2">
                 <button onClick={() => handleOpenModal(site)} className="bg-white p-2.5 rounded-lg text-slate-400 hover:bg-green-600 hover:text-white transition-all shadow-sm">
                   <Edit3 size={16} />
                 </button>
                 <button onClick={() => handleDelete(site.id)} className="bg-white p-2.5 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                   <Trash2 size={16} />
                 </button>
               </div>
            </div>
            
            <div className="space-y-5">
               <h3 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-green-600 transition-colors uppercase">{site.name}</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Location</p>
                    <p className="text-[10px] font-black flex items-center gap-1.5 uppercase tracking-tighter"><MapPin size={12} className="text-green-500" /> {site.location}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Max Capacity</p>
                    <p className="text-[10px] font-black flex items-center gap-1.5 uppercase tracking-tighter"><Box size={12} className="text-green-500" /> {site.capacity}</p>
                  </div>
               </div>
               <div className="pt-4 border-t border-slate-50 flex flex-wrap gap-6">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Asset Group</p>
                    <p className="text-green-700 text-[10px] font-black uppercase tracking-tighter italic">"{site.storedProducts}"</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Point of Contact</p>
                    <p className="text-[10px] font-black flex items-center gap-1.5 uppercase tracking-tighter"><Phone size={12} className="text-green-500" /> {site.contactDetails}</p>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden p-8 animate-fade-in border-b-4 border-green-600">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase">
                {editingGodown ? 'EDIT FACILITY' : 'NEW UNIT'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-800 transition-colors p-2 bg-slate-50 rounded-xl">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Hub Name</label>
                  <input 
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="E.G. NORTH SECTOR 7" 
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none font-black text-[10px] uppercase tracking-widest"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Address String</label>
                  <input 
                    type="text" required value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="CITY, REGION"
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none font-black text-[10px] uppercase"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Unit Capacity</label>
                  <input 
                    type="text" required value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                    placeholder="E.G. 1500 MT" 
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none font-black text-[10px] uppercase"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Comms Detail</label>
                  <input 
                    type="text" required value={formData.contactDetails}
                    onChange={(e) => setFormData({...formData, contactDetails: e.target.value})}
                    placeholder="+XX XXXXXXXXX"
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none font-black text-[10px] uppercase"
                  />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Core Asset Types</label>
                  <input 
                    type="text" required value={formData.storedProducts}
                    onChange={(e) => setFormData({...formData, storedProducts: e.target.value})}
                    placeholder="E.G. LIQUIDS, GRAINS, HEAVY MACHINERY" 
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none font-black text-[10px] uppercase tracking-widest italic"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-6 border-t border-slate-100">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 text-slate-500 font-black text-[9px] py-4 rounded-xl uppercase tracking-widest">Discard</button>
                 <button type="submit" className="flex-[2] bg-slate-900 hover:bg-green-600 text-white font-black text-[9px] py-4 rounded-xl shadow-xl uppercase tracking-widest">Save Logistics</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GodownManagement;
