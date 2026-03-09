import React from 'react';
import { useData } from '../../data/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, 
  Tags, 
  Warehouse, 
  Image as ImageIcon, 
  TrendingUp, 
  TrendingDown, 
  Plus,
  ArrowUpRight,
  Zap,
  Star,
  Activity,
  FlaskConical,
  Microscope,
  Leaf,
  Tractor,
  LayoutGrid
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color, to }) => {
  const CardContent = (
    <motion.div 
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative overflow-hidden p-4 rounded-none h-full transition-all duration-300 group border-none"
      style={{ backgroundColor: `${color}10` }}
    >
      {/* Decorative Corner Shape */}
      <div 
        className="absolute -top-6 -right-6 w-16 h-16 rounded-full opacity-20 pointer-events-none"
        style={{ backgroundColor: color }}
      />
      
      <div className="relative z-10 flex flex-col gap-3">
        {/* Icon in Box */}
        <div className="w-8 h-8 rounded-md flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: color }}>
          <Icon size={16} />
        </div>
        
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{title}</p>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">{value}</h3>
            {trendValue && (
              <span className={`text-[8px] font-bold ${trend === 'up' ? 'text-green-600' : 'text-red-600'} uppercase tracking-tighter`}>
                {trend === 'up' ? '↑' : '↓'}{trendValue}%
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return to ? <Link to={to} className="h-full">{CardContent}</Link> : CardContent;
};

const getCategoryIcon = (name) => {
  const props = { size: 12, className: "shrink-0" };
  switch (name?.toLowerCase()) {
    case 'pesticides': return <FlaskConical {...props} />;
    case 'fertilizers': return <Microscope {...props} />;
    case 'seeds': return <Leaf {...props} />;
    case 'agricultural equipment': return <Tractor {...props} />;
    default: return <LayoutGrid {...props} />;
  }
};

const AdminDashboard = () => {
  const { products, categories, godowns, carousel, getImageUrl } = useData();
  const navigate = useNavigate();

  const mockSparkline = [
    { value: 30 }, { value: 45 }, { value: 35 }, { value: 50 }, { value: 40 }, { value: 60 }
  ];

  const categoryDistribution = categories.map((cat, idx) => ({
    name: cat.name,
    value: products.filter(p => p.category === cat.name).length,
    color: ['#1E5D57', '#FBBF24', '#3B82F6', '#10B981'][idx % 4]
  })).slice(0, 4);

  return (
    <div className="space-y-3 animate-in fade-in zoom-in-95 duration-700">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Products" value={products.length} icon={Package} trend="up" trendValue="12" color="#1E5D57" to="/admin/products" />
        <StatCard title="Product Types" value={categories.length} icon={Tags} trend="up" trendValue="5" color="#3B82F6" to="/admin/categories" />
        <StatCard title="Active Campaigns" value={carousel.length} icon={Zap} trend="up" trendValue="0" color="#FBBF24" to="/admin/carousel" />
        <StatCard title="Total Facilities" value={godowns.length} icon={Warehouse} trend="up" trendValue="2" color="#10B981" to="/admin/godown" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main List Section */}
        <div className="lg:col-span-2 relative overflow-hidden bg-[#1E5D57]/5 rounded-none p-3 border-none shadow-sm">
          {/* Decorative Corner Shape */}
          <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#1E5D57]/10 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-2 uppercase">
                 Recent Catalog
              </h3>
              <Link to="/admin/products" className="text-[9px] font-bold text-teal-600 hover:text-white hover:bg-teal-600 px-2 py-1 transition-all uppercase tracking-widest border border-teal-600/20">
                View All <ArrowUpRight size={10} />
              </Link>
            </div>
            
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-teal-900/5">
                    <th className="pb-2 px-2">Catalog Item</th>
                    <th className="pb-2 px-2">Category</th>
                    <th className="pb-2 text-right pr-4">Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {products.slice(0, 5).map((product) => (
                    <tr key={product.id} className="group hover:bg-white/50 transition-all duration-200 cursor-pointer border-b border-teal-900/5 last:border-0" onClick={() => navigate('/admin/products')}>
                      <td className="py-2 px-2">
                         <div className="flex items-center gap-2">
                           <div className="w-7 h-7 rounded-none bg-white border border-teal-900/5 overflow-hidden flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                              <img src={getImageUrl(product.image)} alt="" className="h-full object-contain" />
                           </div>
                           <span className="font-bold text-[11px] text-slate-700 whitespace-pre-line leading-tight uppercase tracking-widest">{product.name}</span>
                         </div>
                      </td>
                       <td className="py-2 px-2">
                          <div className="flex items-center gap-2">
                             <span className="text-teal-600/50">{getCategoryIcon(product.category, 12)}</span>
                             <span className="text-[9px] font-medium text-slate-500 uppercase tracking-widest">{product.category}</span>
                          </div>
                       </td>
                        <td className="py-1 px-2">
                           <div className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-green-500"></span>
                              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active</span>
                           </div>
                        </td>
                        <td className="py-1 text-right pr-4">
                           <button className="w-6 h-6 flex items-center justify-center text-slate-400 group-hover:text-teal-600 group-hover:bg-white transition-all border border-transparent group-hover:border-teal-900/5">
                             <ArrowUpRight size={12} />
                           </button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Info Section */}
        <div className="space-y-4">
           {/* Distribution Card */}
        <div className="relative overflow-hidden bg-[#1E5D57]/5 rounded-none p-4 border-none shadow-sm">
          {/* Ornament */}
          <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#1E5D57]/10 pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight uppercase mb-4">
              Inventory Distribution
            </h3>
   <div className="h-[150px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip cursor={{fill: 'transparent'}} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="text-lg font-medium text-slate-800 leading-none">{products.length}</p>
                  <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest mt-1">Items</p>
                </div>
             </div>
             <div className="mt-4 space-y-2">
                {categoryDistribution.map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-none" style={{ background: item.color }}></div>
                      <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">{item.name}</span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700">{item.value}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

          {/* Quick Actions Card */}
          <div className="bg-slate-900 rounded-none p-4 text-white relative overflow-hidden shadow-sm">
            <div className="absolute -right-10 -bottom-10 opacity-5 rotate-12 scale-150 text-teal-400">
               <Activity size={100} />
            </div>
            <div className="relative z-10">
              <h3 className="text-md font-medium mb-1 flex items-center gap-2 italic">
                <Zap size={16} className="text-yellow-400 fill-yellow-400" /> Metrics
              </h3>
              <p className="text-slate-400 text-[10px] mb-4 font-normal leading-relaxed">
                 Optimize inventory in one click.
              </p>
              <div className="grid grid-cols-2 gap-2">
                 <Link to="/admin/godown" className="flex items-center justify-center h-9 rounded-none bg-white text-slate-900 text-[11px] font-medium hover:bg-teal-50 transition-all shadow-sm">
                   Storage
                 </Link>
                 <Link to="/admin/carousel" className="flex items-center justify-center h-9 rounded-none bg-white/10 text-white border border-white/10 text-[11px] font-medium hover:bg-white/20 transition-all">
                   Banners
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
