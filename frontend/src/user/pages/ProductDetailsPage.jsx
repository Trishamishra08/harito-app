import React, { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useData } from '../../data/DataContext';
import {
  ChevronLeft, Shield, Sparkles, Sprout,
  Calendar, MapPin, Beaker, Package,
  CheckCircle2, AlertTriangle, Info, ChevronRight, Leaf
} from 'lucide-react';

// 3D Tilt Image Card
const Tilt3DImage = ({ src, alt }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [18, -18]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-18, 18]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex items-center justify-center min-h-[200px] cursor-pointer"
      style={{ perspective: '800px' }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <img
          src={src}
          alt={alt}
          className="max-h-[200px] w-auto object-contain drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))' }}
        />
        {/* Floating shadow */}
        <motion.div
          animate={{ scaleX: [1, 0.85, 1], opacity: [0.25, 0.15, 0.25] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/20 blur-md rounded-full"
        />
      </motion.div>
    </div>
  );
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, getImageUrl } = useData();
  const [selectedPack, setSelectedPack] = useState(0);

  const product = products.find(p => (p._id || p.id) === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8faf8] p-4 text-center">
        <h2 className="text-xl font-black text-[#1e3932] mb-3 uppercase tracking-tight">Product Not Found</h2>
        <button onClick={() => navigate('/products')} className="px-5 py-2 bg-[#1e3932] text-white font-black text-[9px] uppercase tracking-widest">
          Back to Products
        </button>
      </div>
    );
  }

  const packSizes = ['1 Litre', '5 Litre', '25 kg Bag'];

  const extraInfo = {
    shortDesc: product.description || "High-performance agricultural solution by Hirato Crop Science for optimal crop health and maximized yield potential.",
    benefits: [
      "Enhances root development and nutrient uptake efficiency",
      "Improves crop resilience against environmental stress",
      "Optimizes flowering and fruiting for higher productivity",
      "Safe for soil health and beneficial microbial activity",
      "Easy-to-use formulation for modern farming practices"
    ],
    usage: [
      "Mix the recommended dose in sufficient water as per crop requirement.",
      "Apply through foliar spray or fertigation during early morning or late evening.",
      "Ensure uniform coverage on the foliage for best results.",
      "Repeat application after 15–20 days depending on crop stage."
    ],
    crops: "Wheat, Rice, Sugarcane, Vegetables (Tomato, Chilli, Onion), Fruits (Mango, Grapes, Citrus), and Pulses.",
    safety: "Keep out of reach of children. Store in a cool, dry place away from direct sunlight. Wear protective gear during application."
  };

  return (
    <div className="bg-[#f5f7f5] min-h-screen pt-20 pb-10 font-inter">
      <div className="max-w-4xl mx-auto px-4">

        {/* Back */}
        <Link to="/products" className="inline-flex items-center gap-1 text-slate-400 hover:text-[#1e3932] font-medium text-[11px] mb-3 transition-colors">
          <ChevronLeft size={12} /> Back to Catalog
        </Link>

        {/* Main Product Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Left: Image */}
            <div className="bg-[#f8faf6] p-5 flex flex-col gap-3">
              <Tilt3DImage src={getImageUrl(product.image)} alt={product.name} />
              {/* Thumbnails */}
              <div className="flex gap-2 justify-center">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={`w-12 h-12 border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${i === 0 ? 'border-[#1e3932]' : 'border-slate-200 opacity-40 hover:opacity-70'}`}>
                    <img src={getImageUrl(product.image)} alt="" className="w-full h-full object-contain p-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Info */}
            <div className="p-5 flex flex-col gap-3">

              {/* Category + Badge */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-slate-400">{product.category || 'Agricultural'}</span>
                <span className="text-[8px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">In Stock</span>
              </div>

              {/* Name */}
              <h1 className="text-xl md:text-2xl font-black text-[#1e3932] leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                {extraInfo.shortDesc}
              </p>

              <div className="border-t border-slate-100" />

              {/* Packing Size */}
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Packing Size</p>
                <div className="flex flex-wrap gap-1.5">
                  {packSizes.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPack(idx)}
                      className={`px-3 py-1 text-[10px] font-semibold rounded-full border transition-all ${
                        selectedPack === idx
                          ? 'bg-[#1e3932] text-white border-[#1e3932]'
                          : 'bg-white text-slate-400 border-slate-200 hover:border-[#1e3932] hover:text-[#1e3932]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div className="space-y-1.5">
                {[
                  { label: 'Manufacturer', value: 'Hirato Crop Science Pvt. Ltd.' },
                  { label: 'Certification', value: 'ISO 9001:2015 · TSNUK39907' },
                  { label: 'Shelf Life', value: '2 Years from Manufacturing' },
                  { label: 'Product Form', value: 'Liquid / Granule Formulation' },
                  { label: 'Suitable For', value: 'Wheat, Rice, Vegetables, Fruits, Pulses' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-2 text-[10px]">
                    <span className="text-slate-400 font-medium w-22 shrink-0 min-w-[80px]">{item.label}</span>
                    <span className="text-[#1e3932] font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-1 mt-auto">
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-[#1e3932] text-white py-2.5 font-black text-[9px] uppercase tracking-widest hover:bg-[#2d5a4a] transition-colors rounded-lg"
                >
                  Enquire About This Product <ChevronRight size={11} />
                </Link>
                <p className="text-center text-[8px] text-slate-400 mt-1.5 font-normal">
                  For informational purpose only · Hirato Crop Science
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">

          {/* How To Use */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}
            className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-[#1e3932] px-3 py-2 flex items-center gap-1.5">
              <Info size={10} className="text-[#a4c639]" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white">How To Use</span>
            </div>
            <ul className="p-3 space-y-2">
              {extraInfo.usage.map((step, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="text-[8px] font-black text-white bg-[#1e3932] w-3.5 h-3.5 flex items-center justify-center shrink-0 rounded-sm">{idx + 1}</span>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{step}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Key Benefits */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-[#1e3932] px-3 py-2 flex items-center gap-1.5">
              <Sparkles size={10} className="text-[#a4c639]" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white">Key Benefits</span>
            </div>
            <ul className="p-3 space-y-2">
              {extraInfo.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 size={10} className="text-green-500 shrink-0 mt-0.5" />
                  <span className="text-[10px] text-slate-500 leading-snug">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Safety + Crops */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-red-700 px-3 py-2 flex items-center gap-1.5">
              <AlertTriangle size={10} className="text-red-200" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white">Safety & Storage</span>
            </div>
            <div className="p-3 space-y-2">
              <p className="text-[10px] text-red-600 leading-relaxed">{extraInfo.safety}</p>
              <div className="bg-[#1e3932]/5 p-2 rounded-lg">
                <p className="text-[8px] font-black text-[#1e3932] uppercase tracking-widest mb-1 flex items-center gap-1">
                  <Sprout size={9} /> Suitable Crops
                </p>
                <p className="text-[10px] text-slate-500 leading-relaxed">{extraInfo.crops}</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
