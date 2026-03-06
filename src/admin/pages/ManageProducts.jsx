import React, { useState } from 'react';
import { useData } from '../../data/DataContext';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Package, 
  X, 
  Check, 
  Search, 
  Layers, 
  Tag, 
  ChevronRight,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';

const ProductManagement = () => {
  const { products, setProducts, categories } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Pesticides',
    subcategory: '',
    brand: '',
    description: '',
    cropUsage: '',
    applicationMethod: '',
    image: ''
  });

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: 'Pesticides',
        subcategory: '',
        brand: '',
        description: '',
        cropUsage: '',
        applicationMethod: '',
        image: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product? This action cannot be undone.')) {
      setProducts(products.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(item => item.id === editingProduct.id ? { ...item, ...formData } : item));
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <span className="text-[9px] font-black text-green-600 uppercase tracking-[0.3em]">Resource Manager</span>
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase leading-none mt-1">Products</h1>
          <p className="text-xs text-slate-500 font-medium italic mt-2">Manage catalogue information for the Hirato portal.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <div className="relative group flex-1 min-w-[280px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="SEARCH ASSETS..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-100 rounded-xl py-3 pl-10 pr-6 focus:ring-2 focus:ring-green-500/50 outline-none text-slate-800 transition-all font-black text-[10px] uppercase tracking-widest shadow-sm"
            />
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-green-600 hover:bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
          >
            <Plus size={16} /> NEW PRODUCT
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-2">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="text-left py-4 px-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Asset Details</th>
              <th className="text-left py-4 px-6 text-[9px] font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">Brand Category</th>
              <th className="text-left py-4 px-6 text-[9px] font-black text-slate-400 uppercase tracking-widest hidden lg:table-cell">Usage Context</th>
              <th className="text-right py-4 px-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="group hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-100 group-hover:border-green-300 transition-colors shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform group-hover:scale-105" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 text-[11px] uppercase tracking-tight leading-none">{product.name}</h4>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">{product.subcategory}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 hidden md:table-cell">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-green-600 uppercase tracking-widest opacity-80">{product.category}</span>
                    <p className="font-black text-slate-400 text-[10px] flex items-center gap-1 uppercase tracking-tighter">{product.brand}</p>
                  </div>
                </td>
                <td className="py-4 px-6 hidden lg:table-cell">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-tighter italic opacity-60">
                    {product.cropUsage.split(',').slice(0, 2).join(', ')}
                  </p>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleOpenModal(product)}
                      className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="bg-white p-2.5 rounded-lg border border-slate-200 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <div className="p-16 text-center space-y-4">
            <Package className="mx-auto text-slate-100" size={48} />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">NO ASSETS FOUND</p>
          </div>
        )}
      </div>

      {/* Product Modal - Tighter */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden p-8 animate-fade-in max-h-[90vh] overflow-y-auto border-b-4 border-green-600">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase">
                {editingProduct ? 'EDIT PRODUCT' : 'NEW ENTRY'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-800 transition-colors p-2 bg-slate-50 rounded-xl">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Name</label>
                  <input 
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="E.G. ORGANIC FOLIAR" 
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none text-slate-800 transition-all font-black text-[10px] uppercase tracking-widest"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none text-slate-800 transition-all font-black text-[10px] uppercase tracking-widest h-12"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Sub-Type</label>
                  <input 
                    type="text" required value={formData.subcategory}
                    onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none text-slate-800 transition-all font-black text-[10px] uppercase"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Brand Owner</label>
                  <input 
                    type="text" required value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none text-slate-800 transition-all font-black text-[10px] uppercase"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Description</label>
                   <textarea 
                    rows="2" required value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-green-500/50 outline-none text-slate-800 transition-all font-medium text-[10px] italic"
                  ></textarea>
                </div>

                <div className="space-y-1.5">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Usable Crops</label>
                   <input 
                    type="text" required value={formData.cropUsage}
                    onChange={(e) => setFormData({...formData, cropUsage: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none text-slate-800 transition-all font-black text-[10px] uppercase"
                  />
                </div>

                <div className="space-y-1.5">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Method</label>
                   <input 
                    type="text" required value={formData.applicationMethod}
                    onChange={(e) => setFormData({...formData, applicationMethod: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500/50 outline-none text-slate-800 transition-all font-black text-[10px] uppercase"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Resource URL</label>
                  <input 
                    type="text" required value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl py-3.5 px-5 focus:ring-2 focus:ring-green-500/50 outline-none text-slate-800 transition-all font-black text-[9px] uppercase tracking-widest"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6">
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
                   SAVE DATA <Check size={16} />
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
