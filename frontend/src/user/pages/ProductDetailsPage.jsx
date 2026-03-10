import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../data/DataContext';
import { ChevronLeft, Shield, Sparkles, Sprout, Mail, Info, Leaf, ShieldAlert, Package, Calendar, MapPin, Beaker } from 'lucide-react';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, getImageUrl } = useData();
  
  const product = products.find(p => (p._id || p.id) === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8faf8] p-4 text-center">
        <h2 className="text-2xl font-black text-[#1e3932] mb-4 uppercase tracking-tighter">Product Not Found</h2>
        <button 
          onClick={() => navigate('/products')}
          className="px-6 py-2.5 bg-[#00704A] text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl"
        >
          Back to Solutions
        </button>
      </div>
    );
  }

  // Fallback / Placeholder data for professional sections
  const extraInfo = {
    shortDesc: product.description || "High-performance agricultural solution designed by Harito Crop Science to ensure optimal crop health and maximized yield potential.",
    benefits: [
      "Enhances root development and nutrient uptake efficiency",
      "Improves crop resilience against environmental stress",
      "Optimizes flowering and fruiting for higher productivity",
      "Safe for soil health and beneficial microbial activity",
      "Easy-to-use formulation for modern farming practices"
    ],
    details: [
      { label: "Category", value: product.category, icon: Leaf },
      { label: "Manufacturer", value: "Harito Crop Science", icon: Shield },
      { label: "Product Form", value: "Liquid / Granule Formulation", icon: Beaker },
      { label: "Packing Size", value: "1 Litre / 5 Litre / 25 kg Bag", icon: Package },
      { label: "Shelf Life", value: "2 Years from Manufacturing", icon: Calendar },
      { label: "Availability", value: "In Stock (Pan India)", icon: MapPin },
    ],
    usage: [
      "Mix the recommended dose in sufficient water as per crop requirement.",
      "Apply through foliar spray or fertigation system during early morning or late evening.",
      "Ensure uniform coverage on the foliage for best results.",
      "Repeat application after 15-20 days depending on crop stage."
    ],
    crops: "Wheat, Rice, Sugarcane, Vegetables (Tomato, Chilli, Onion), Fruits (Mango, Grapes, Citrus), and Pulses.",
    safety: "Keep out of reach of children. Store in a cool, dry place away from direct sunlight. Wear protective gear during application. Close the container tightly after use."
  };

  return (
    <div className="bg-[#f8faf8] min-h-screen pt-20 md:pt-26 pb-8 font-inter relative">
      <div className="max-w-5xl mx-auto px-4">
        {/* Navigation Breadcrumb */}
        <motion.div
           initial={{ opacity: 0, x: -10 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.5 }}
        >
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 text-[#00704A] font-bold text-[8px] md:text-[9px] uppercase tracking-[0.2em] mb-3 hover:-translate-x-1 transition-all relative z-[60] cursor-pointer"
          >
            <ChevronLeft size={12} strokeWidth={3} />
            Back to Catalog
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Column: Image & Quick Specs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-3"
          >
             <div className="bg-[#fcf8f1] rounded-none border border-[#eee8dc] p-4 flex justify-center items-center relative overflow-hidden group shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3932]/5 to-transparent pointer-events-none"></div>
                <img 
                   src={getImageUrl(product.image)} 
                   alt={product.name} 
                   className="w-full max-w-[170px] h-auto object-contain relative z-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-105"
                />
             </div>

             {/* Key Benefits (Compact Box) */}
             <div className="bg-[#f5f9f5] rounded-none border border-[#e2eee4] p-3 shadow-sm">
                <h3 className="flex items-center gap-2 text-[#2A3324] font-bold text-[9px] uppercase tracking-widest mb-2 font-inter">
                   <Sparkles size={11} className="text-[#00704A]" /> Key Benefits
                </h3>
                <ul className="space-y-1.5">
                   {extraInfo.benefits.map((benefit, idx) => (
                     <li key={idx} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-none bg-[#00704A] mt-1 shrink-0" />
                        <p className="text-[9px] md:text-[10px] text-slate-600 font-bold leading-tight">{benefit}</p>
                     </li>
                   ))}
                </ul>
             </div>
          </motion.div>

          {/* Right Column: Main Info & Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 space-y-3"
          >
            <div className="bg-[#fcfdfd] rounded-none border border-[#eee] p-3 md:p-4 shadow-sm">
               <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h1 className="text-lg md:text-xl font-bold text-[#2A3324] tracking-tight leading-none mb-1 font-inter">
                      {product.name}
                    </h1>
                    <p className="text-[9px] md:text-[10px] text-slate-500 font-medium leading-normal max-w-lg">
                      {extraInfo.shortDesc}
                    </p>
                  </div>
                  <div className="shrink-0 pt-0.5">
                     <Shield size={16} className="text-[#00704A]" />
                  </div>
               </div>

               {/* Product Information Grid */}
               <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-2 pt-3 border-t border-slate-50">
                  {extraInfo.details.map((detail, idx) => (
                    <div key={idx} className="space-y-1">
                       <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          <detail.icon size={12} className="text-[#00704A]/60" /> {detail.label}
                       </span>
                       <p className="text-[11px] text-[#2A3324] font-bold">{detail.value}</p>
                    </div>
                  ))}
               </div>
            </div>

             {/* Usage & Application */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
               <div className="bg-[#f8fbf9] rounded-none border border-[#e8f0e9] p-3 shadow-sm">
                  <h3 className="flex items-center gap-2 text-[#2A3324] font-bold text-[9px] uppercase tracking-widest mb-2 font-inter">
                     <Info size={11} className="text-[#00704A]" /> Application Steps
                  </h3>
                  <div className="space-y-2">
                     {extraInfo.usage.map((step, idx) => (
                       <div key={idx} className="flex gap-2">
                          <span className="text-[8px] font-bold text-[#00704A] bg-[#00704A]/5 w-3.5 h-3.5 rounded-none flex items-center justify-center shrink-0">
                             {idx + 1}
                          </span>
                          <p className="text-[9px] text-slate-500 font-bold leading-tight">{step}</p>
                       </div>
                     ))}
                  </div>
               </div>

                <div className="space-y-3">
                  {/* Suitable Crops */}
                  <div className="bg-[#f0f4f0] rounded-none p-3 border border-[#e1eee1]">
                     <h3 className="flex items-center gap-2 text-[#2A3324] font-bold text-[9px] uppercase tracking-widest mb-1.5 font-inter">
                        <Sprout size={11} className="text-[#00704A]" /> Suitable Crops
                     </h3>
                     <p className="text-[9px] text-[#2A3324] font-bold leading-tight">
                        {extraInfo.crops}
                     </p>
                  </div>

                  {/* Safety Instructions */}
                  <div className="bg-[#fff1f1] rounded-none p-3 border border-[#fee2e2]">
                     <h3 className="flex items-center gap-2 text-[#991b1b] font-bold text-[9px] uppercase tracking-widest mb-1.5 font-inter">
                        <ShieldAlert size={11} className="text-[#dc2626]" /> Safety & Storage
                     </h3>
                     <p className="text-[9px] text-[#991b1b] font-bold leading-tight">
                        {extraInfo.safety}
                     </p>
                  </div>
               </div>
            </div>

            {/* Informational Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-4 mt-auto"
            >
               <p className="text-center text-[8px] text-slate-400 font-black uppercase tracking-widest">
                  Website only for informational purpose • Harito Crop Science
               </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

