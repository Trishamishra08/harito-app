import React from 'react';
import { useData } from '../../data/DataContext';
import { 
  Package, 
  Tags, 
  Warehouse, 
  Image as ImageIcon, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  Plus,
  Activity
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-24 h-24 bg-green-50/50 -translate-y-1/2 translate-x-1/2 rounded-full -z-0 group-hover:bg-green-100/50 transition-colors"></div>
    
    <div className="relative z-10 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className={`bg-green-100 text-green-700 p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform`}>
          <Icon size={20} />
        </div>
        <div className="flex items-center gap-1">
          {trend > 0 ? (
            <span className="text-xs font-bold text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md">
              <TrendingUp size={12} /> +{trend}%
            </span>
          ) : trend < 0 ? (
            <span className="text-xs font-bold text-red-600 flex items-center gap-1 bg-red-50 px-2 py-1 rounded-md">
              <TrendingDown size={12} /> {trend}%
            </span>
          ) : (
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
              Stable
            </span>
          )}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 leading-none">{value}</h3>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { products, categories, godowns, carousel } = useData();

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-green-600 uppercase tracking-widest block mb-1">Overview</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">System Dashboard</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage your agriculture catalog and facility resources.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-white hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border border-slate-200 shadow-sm">
            Export Report
          </button>
          <button className="flex-1 md:flex-none bg-[#1b3d2c] hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2">
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Total Products" value={products.length} icon={Package} trend={12} />
        <StatCard title="Categories" value={categories.length} icon={Tags} trend={5} />
        <StatCard title="Godowns / Facilities" value={godowns.length} icon={Warehouse} trend={-2} />
        <StatCard title="Active Banners" value={carousel.length} icon={ImageIcon} trend={0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
               <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Recent Activity</h3>
            </div>
            <button className="text-green-600 hover:text-green-800 text-sm font-bold flex items-center gap-1 transition-colors">
              View All <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="space-y-3 flex-grow">
            {products.slice(0, 5).map((product, idx) => (
              <div key={product.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-green-50 transition-all border border-transparent hover:border-green-100 group cursor-pointer">
                <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm shrink-0 border border-slate-200 bg-white">
                   <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-green-700 transition-colors">{product.name}</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">{product.category}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full group-hover:bg-white group-hover:text-green-700 transition-all shadow-sm">Updated</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-[#1b3d2c] rounded-2xl p-6 md:p-8 text-white flex flex-col relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity size={80} className="text-green-400" />
          </div>
          
          <h3 className="text-sm font-black mb-8 tracking-widest uppercase text-green-300/80 border-b border-white/10 pb-3">System Health</h3>
          
          <div className="space-y-8 relative z-10 font-sans">
            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs font-bold text-green-100">Storage Usage</p>
                <p className="text-sm font-black text-white">64.8%</p>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 w-[64%] rounded-full"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs font-bold text-green-100">Server Status</p>
                <p className="text-sm font-black text-white">Optimal</p>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 w-full rounded-full"></div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <p className="text-xs font-bold text-green-300/80 uppercase tracking-widest mb-2">Quick Actions</p>
              <button className="w-full bg-white/10 hover:bg-white text-white hover:text-[#1b3d2c] font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-between px-5 group shadow-sm">
                Add New Banner <ImageIcon size={18} className="text-green-300 group-hover:text-green-600 transition-colors" />
              </button>
              <button className="w-full bg-white/10 hover:bg-white text-white hover:text-[#1b3d2c] font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-between px-5 group shadow-sm">
                Manage Godowns <Warehouse size={18} className="text-green-300 group-hover:text-green-600 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
