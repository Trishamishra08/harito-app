import React, { useState, useEffect } from 'react';
import { useData } from '../../data/DataContext';
import { API_BASE_URL } from '../../api/config';
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
  Image as ImageIcon,
  ArrowUpRight,
  FlaskConical,
  Microscope,
  Leaf,
  Tractor,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const getCategoryIcon = (name, size = 14) => {
  const props = { size, className: "shrink-0" };
  switch (name?.toLowerCase()) {
    case 'pesticides': return <FlaskConical {...props} />;
    case 'fertilizers': return <Microscope {...props} />;
    case 'seeds': return <Leaf {...props} />;
    case 'agricultural equipment': return <Tractor {...props} />;
    default: return <LayoutGrid {...props} />;
  }
};

const ProductManagement = () => {
  const { 
    products, 
    setProducts, 
    categories, 
    fetchProducts, 
    fetchCategories,
    getImageUrl,
    loading 
  } = useData();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    brand: 'Hirato',
    description: '',
    image: '',
    packSizes: [],
    packagingType: 'Bottle', // New field
    formulation: 'Liquid',
    suitableCrops: '',
    usage: '',
    benefits: '',
    safety: ''
  });

  const [customSize, setCustomSize] = useState('');

  // Pre-defined ratios requested by user
  const LIQUID_RATIOS = ['250 ml', '500 ml', '1 Liter'];
  const DRY_RATIOS = ['250 gm', '500 gm', '1 kg'];

  // Ensure data is fetched if categories are missing
  useEffect(() => {
    if (categories.length === 0 && !loading) {
      fetchCategories();
    }
  }, [categories, loading]);

  const handleOpenModal = (product = null) => {
    if (product) {
      // Determine packaging type based on existing sizes
      const hasLiquid = product.packSizes?.some(s => s.toLowerCase().includes('ml') || s.toLowerCase().includes('liter'));
      
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        subcategory: product.subcategory,
        brand: product.brand,
        description: product.description,
        image: product.image,
        packSizes: product.packSizes || [],
        packagingType: hasLiquid ? 'Bottle' : 'Packet',
        formulation: product.formulation || (hasLiquid ? 'Liquid' : 'Powder/Granules'),
        suitableCrops: product.suitableCrops || '',
        usage: Array.isArray(product.usage) ? product.usage.join('\n') : product.usage || '',
        benefits: Array.isArray(product.benefits) ? product.benefits.join('\n') : product.benefits || '',
        safety: product.safety || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: categories[0]?.name || '',
        subcategory: '',
        brand: 'Hirato',
        description: '',
        image: '',
        packSizes: ['250 ml', '500 ml', '1 Liter'],
        packagingType: 'Bottle',
        formulation: 'Liquid',
        suitableCrops: 'Wheat, Rice, Vegetables, Fruits, and Pulses',
        usage: "Mix the recommended dose in sufficient water as per crop requirement.\nApply through foliar spray or fertigation during early morning or late evening.\nEnsure uniform coverage on the foliage for best results.",
        benefits: "Enhances root development and nutrient uptake efficiency\nImproves crop resilience against environmental stress\nOptimizes flowering and fruiting for higher productivity",
        safety: 'Keep out of reach of children. Store in a cool, dry place.'
      });
    }
    setCustomSize('');
    setIsModalOpen(true);
  };

  const addCustomSize = () => {
    if (customSize && customSize.trim() !== '') {
      if (!formData.packSizes.includes(customSize.trim())) {
        setFormData(prev => ({
          ...prev, 
          packSizes: [...prev.packSizes, customSize.trim()]
        }));
      }
      setCustomSize('');
    }
  };

  const togglePackSize = (size) => {
    setFormData(prev => {
      const current = prev.packSizes || [];
      const updated = current.includes(size)
        ? current.filter(s => s !== size)
        : [...current, size];
      return { ...prev, packSizes: updated };
    });
  };

  const handleDelete = async (productId) => {
    // Determine the actual ID to use (could be _id or id)
    const idToDelete = productId;
    
    if (!idToDelete) {
      alert("Error: Product ID is missing. Cannot delete.");
      return;
    }

    if (window.confirm('Delete this product? This action cannot be undone.')) {
      try {
        const url = `${API_BASE_URL}/products/${idToDelete}`;
        console.log(`Attempting to delete product at: ${url}`);
        
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          await fetchProducts();
          // Optional: alert('Product deleted successfully');
        } else {
          const errorData = await response.json();
          alert(`Failed to delete: ${errorData.message || 'Unknown server error'}`);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert(`Network Error: ${error.message}. Please ensure the backend is running.`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiBase = API_BASE_URL;
      const url = editingProduct 
        ? `${apiBase}/products/${editingProduct.id || editingProduct._id}` 
        : `${apiBase}/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      // Process multi-line strings back into arrays
      const processedData = {
        ...formData,
        usage: formData.usage.split('\n').filter(line => line.trim() !== ''),
        benefits: formData.benefits.split('\n').filter(line => line.trim() !== '')
      };
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData),
      });

      if (response.ok) {
        await fetchProducts();
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}${errorData.error ? ` - ${errorData.error}` : ''}`);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Is the backend running?');
    }
  };


  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-[#1E5D57]/5 rounded-none p-3 border-none shadow-sm mb-2">
        {/* Decorative Corner Shape */}
        <div className="absolute -top-10 -right-10 w-16 h-16 rounded-full bg-[#1E5D57]/10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
          <div>
            <span className="text-[8px] font-bold text-teal-600 uppercase tracking-widest mb-0.5 block">Catalog Manager</span>
            <h1 className="text-base font-bold text-slate-800 tracking-tight leading-none uppercase">Product Inventory</h1>
          </div>
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <div className="relative group flex-1 lg:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-teal-500 transition-all" size={12} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/80 border-none rounded-none py-1.5 pl-8 pr-3 focus:ring-4 focus:ring-teal-500/5 focus:bg-white outline-none text-slate-700 transition-all font-medium text-[10px] shadow-sm uppercase tracking-widest"
              />
            </div>
            <button 
              onClick={() => handleOpenModal()}
              className="bg-slate-900 hover:bg-teal-600 text-white px-3 py-1.5 rounded-none text-[9px] font-bold transition-all shadow-lg flex items-center gap-2 active:scale-95 uppercase tracking-widest"
            >
              <Plus size={12} /> ADD PRODUCT
            </button>
          </div>
        </div>
      </div>

      {/* Products Table Area */}
      <div className="relative overflow-hidden bg-[#1E5D57]/5 backdrop-blur-md rounded-none border-none shadow-sm">
        {/* Decorative Corner Shape */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#1E5D57]/10 pointer-events-none" />
        
        <div className="overflow-x-auto no-scrollbar relative z-10">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-teal-900/5">
                <th className="text-left py-2 px-3 text-[8px] font-bold text-slate-400 uppercase tracking-widest">Resource Details</th>
                <th className="text-left py-2 px-3 text-[8px] font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Brand & Category</th>
                <th className="text-left py-2 px-3 text-[8px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="text-right py-2 px-3 text-[8px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {filteredProducts.map((product) => (
                <tr key={product.id || product._id} className="group hover:bg-white/50 transition-all duration-200 border-b border-teal-900/5 last:border-0">
                  <td className="py-1.5 px-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white border border-teal-900/5 p-1 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                        <img src={getImageUrl(product.image)} alt={product.name} className="max-h-full max-w-full object-contain mx-auto" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-[10px] uppercase tracking-widest leading-tight whitespace-pre-line">{product.name}</h4>
                        <p className="text-[9px] font-normal text-slate-400 uppercase tracking-widest mt-0.5 opacity-70">{product.subcategory || 'Farming Aid'}</p>
                      </div>
                    </div>
                  </td>
                   <td className="py-1.5 px-3 hidden md:table-cell">
                     <div className="flex flex-col gap-0.5">
                       <div className="flex items-center gap-1.5 text-teal-600/70">
                          {getCategoryIcon(product.category, 10)}
                          <span className="text-[9px] font-bold uppercase tracking-widest leading-none">{product.category}</span>
                       </div>
                       <p className="font-medium text-slate-300 text-[8px] pl-4 uppercase tracking-widest">{product.brand || 'Hirato'}</p>
                     </div>
                   </td>
                  <td className="py-1.5 px-3">
                     <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-green-500"></div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">In Catalog</span>
                     </div>
                  </td>
                   <td className="py-1.5 px-3 text-right">
                    <div className="flex justify-end gap-1.5 text-slate-400">
                       <button onClick={() => handleOpenModal(product)} className="w-6 h-6 flex items-center justify-center rounded-none bg-transparent hover:text-teal-600 hover:bg-white transition-all border border-transparent hover:border-teal-900/5">
                         <Edit3 size={12} />
                       </button>
                       <button onClick={() => handleDelete(product.id || product._id)} className="w-6 h-6 flex items-center justify-center rounded-none bg-transparent hover:text-red-500 hover:bg-white transition-all border border-transparent hover:border-teal-900/5">
                         <Trash2 size={12} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="p-10 text-center relative z-10">
            <div className="w-10 h-10 bg-slate-50/50 rounded-none flex items-center justify-center mx-auto mb-3">
               <Package className="text-slate-200" size={18} />
            </div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">No products found</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
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
              className="relative bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto no-scrollbar border border-white"
            >
              <div className="flex justify-between items-center mb-10">
                 <div>
                    <span className="text-[10px] font-medium text-teal-600 uppercase tracking-widest block mb-1">Configuration</span>
                    <h3 className="text-xl font-medium text-slate-800 tracking-tight uppercase leading-none">
                     {editingProduct ? 'Update Product' : 'Register New Resource'}
                   </h3>
                 </div>
                <button onClick={() => setIsModalOpen(false)} className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-teal-600 transition-all bg-slate-50 rounded-xl active:scale-90">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Basic Info */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                      <input 
                        type="text" required value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="E.G. HARVEST MASTER" 
                        className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-700 transition-all font-bold text-xs"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          required
                          className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-700 transition-all font-bold text-xs h-12"
                        >
                          <option value="" disabled>Select Category</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Sub-Type</label>
                        <input 
                          type="text" required value={formData.subcategory}
                          onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                          placeholder="E.G. BIO FERTILIZER"
                          className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-700 transition-all font-bold text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Brand Name</label>
                        <input 
                          type="text" required value={formData.brand}
                          onChange={(e) => setFormData({...formData, brand: e.target.value})}
                          placeholder="E.G. HIRATO"
                          className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-700 transition-all font-bold text-xs"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Product Form</label>
                        <input 
                          type="text" required value={formData.formulation}
                          onChange={(e) => setFormData({...formData, formulation: e.target.value})}
                          placeholder="E.G. LIQUID / GRANULES"
                          className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-700 transition-all font-bold text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Product Description</label>
                      <textarea 
                        rows="4" required value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="ENTER FULL SCIENTIFIC DESCRIPTION..."
                        className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-700 transition-all font-medium text-xs leading-relaxed"
                      ></textarea>
                    </div>
                  </div>

                  {/* Right Column: Spec & Images */}
                  <div className="space-y-4">
                    <div className="space-y-4">
                      {/* Packaging Type Toggle */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Packaging Type</label>
                        <div className="flex gap-2">
                          {['Bottle', 'Packet'].map(type => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => {
                                // Default sizes when switching type
                                const defaultSizes = type === 'Bottle' ? LIQUID_RATIOS : DRY_RATIOS;
                                setFormData({...formData, packagingType: type, packSizes: defaultSizes, formulation: type === 'Bottle' ? 'Liquid' : 'Powder/Granule'});
                              }}
                              className={`flex-1 py-1.5 rounded-full text-[10px] font-bold border transition-all uppercase tracking-widest ${
                                formData.packagingType === type
                                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                                  : 'bg-white text-slate-400 border-slate-200 hover:border-teal-200'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Ratio Selection */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                          {formData.packagingType} Ratios (Default)
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {(formData.packagingType === 'Bottle' ? LIQUID_RATIOS : DRY_RATIOS).map(size => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => togglePackSize(size)}
                              className={`px-3 py-1.5 rounded-full text-[9px] font-bold border transition-all ${
                                formData.packSizes?.includes(size)
                                  ? 'bg-[#1E5D57] text-white border-[#1E5D57]'
                                  : 'bg-white text-slate-500 border-slate-200 hover:border-teal-300'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom/Other Sizes */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Manual/Other Sizes</label>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-3">
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={customSize}
                              onChange={(e) => setCustomSize(e.target.value)}
                              placeholder="E.G. 2 Liter or 5 kg"
                              className="flex-1 bg-white border-none rounded-lg py-1.5 px-3 focus:ring-2 focus:ring-teal-500/20 outline-none text-slate-700 text-[10px] font-bold"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSize())}
                            />
                            <button 
                              type="button"
                              onClick={addCustomSize}
                              className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[9px] font-bold hover:bg-teal-600 transition-all uppercase tracking-widest"
                            >
                              Add
                            </button>
                          </div>
                          
                          {/* List of currently selected sizes that are NOT in the defaults */}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.packSizes?.filter(s => 
                              !(formData.packagingType === 'Bottle' ? LIQUID_RATIOS : DRY_RATIOS).includes(s)
                            ).map(size => (
                              <div key={size} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-100 text-[9px] font-bold">
                                {size}
                                <button type="button" onClick={() => togglePackSize(size)}><X size={10} /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="text-[8px] text-slate-400 mt-1 italic leading-tight">* Select standard ratios above or add custom packaging sizes manually.</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Product Image</label>
                      <div className="flex items-center gap-4">
                        {formData.image && (
                          <div className="w-20 h-20 bg-white border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center shrink-0 shadow-sm p-1">
                            <img src={getImageUrl(formData.image)} alt="Preview" className="max-h-full max-w-full object-contain mx-auto" />
                          </div>
                        )}
                        <div className="flex-1">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              const formDataToUpload = new FormData();
                              formDataToUpload.append('image', file);
                              try {
                                const response = await fetch(`${API_BASE_URL}/upload`, { method: 'POST', body: formDataToUpload });
                                if (response.ok) {
                                  const data = await response.json();
                                  setFormData({...formData, image: data.imageUrl});
                                }
                              } catch (err) { console.error('Upload error:', err); }
                            }}
                            className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-400 font-bold text-[9px] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[9px] file:font-black file:bg-slate-900 file:text-white cursor-pointer transition-all"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Suitable Crops</label>
                      <input 
                        type="text" value={formData.suitableCrops}
                        onChange={(e) => setFormData({...formData, suitableCrops: e.target.value})}
                        placeholder="E.G. WHEAT, RICE, VEGETABLES..."
                        className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-700 transition-all font-bold text-xs"
                      />
                    </div>
                  </div>

                  {/* Wide Specs */}
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Key Benefits (One per line)</label>
                      <textarea 
                        rows="3" value={formData.benefits}
                        onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-700 font-medium text-xs"
                      ></textarea>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Usage Instructions (One per line)</label>
                      <textarea 
                        rows="3" value={formData.usage}
                        onChange={(e) => setFormData({...formData, usage: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-700 font-medium text-xs"
                      ></textarea>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Safety & Storage</label>
                        <input 
                          type="text" value={formData.safety}
                          onChange={(e) => setFormData({...formData, safety: e.target.value})}
                          placeholder="E.G. KEEP OUT OF REACH OF CHILDREN..."
                          className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-teal-500/20 focus:bg-white outline-none text-slate-700 transition-all font-bold text-xs"
                        />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 font-black text-[10px] uppercase tracking-widest py-3.5 rounded-xl transition-all">Discard Changes</button>
                    <button type="submit" className="flex-[2] bg-[#1E5D57] hover:bg-[#13423E] text-white font-black text-[10px] uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-teal-900/10">
                    {editingProduct ? 'Update Product Entry' : 'Generate Catalog Entry'} <Check size={16} />
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

export default ProductManagement;
