import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Package, 
  Tags, 
  Warehouse, 
  Upload, 
  Menu, 
  X,
  Bell,
  Search,
  Settings
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, children, current }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
      current ? 'bg-green-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/10 hover:text-white'
    }`}
  >
    <Icon size={18} className={current ? 'text-white' : 'text-green-400'} />
    <span>{children}</span>
  </Link>
);

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Product Added', message: 'Eco-Friendly Biopesticide has been added.', time: '2m ago', read: false },
    { id: 2, title: 'Inventory Alert', message: 'Fertilizer stock is below 10%.', time: '1h ago', read: false },
    { id: 3, title: 'Banner Updated', message: 'Homepage banner was modified.', time: '5h ago', read: true },
  ]);
  const location = useLocation();

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex min-h-screen bg-[#faf9f6] font-sans">
      {/* Sidebar - Agriculture Theme */}
      <aside 
        className={`bg-[#1b3d2c] transition-all duration-500 fixed lg:sticky top-0 z-50 h-screen shadow-2xl ${
          isOpen ? 'w-64' : 'w-0 lg:w-20 lg:px-2 -translate-x-full lg:translate-x-0'
        } overflow-hidden flex flex-col`}
      >
        <div className="p-5 flex items-center justify-between border-b border-white/10 bg-black/10">
          <Link to="/admin" className="flex items-center gap-3 group">
            <div className="h-12 w-12 flex items-center justify-center transition-all duration-300 transform group-hover:scale-105">
               <img src="/logo.png" alt="Hirato Logo" className="h-full w-full object-contain filter drop-shadow-xl p-1" />
            </div>
            {isOpen && (
              <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-300">
                <span className="font-black text-2xl text-white tracking-tighter leading-none italic">Hirato</span>
                <span className="text-[10px] font-black text-green-400 uppercase tracking-[0.2em] mt-1">Admin Panel</span>
              </div>
            )}
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-green-100 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2 flex-grow overflow-y-auto no-scrollbar">
          {isOpen && <p className="text-xs font-black text-green-500/70 uppercase tracking-widest mb-3 ml-2 pt-2">Management</p>}
          <SidebarLink to="/admin" icon={LayoutDashboard} current={location.pathname === '/admin'}>Dashboard</SidebarLink>
          <SidebarLink to="/admin/carousel" icon={ImageIcon} current={location.pathname === '/admin/carousel'}>Banners</SidebarLink>
          <SidebarLink to="/admin/products" icon={Package} current={location.pathname === '/admin/products'}>Products</SidebarLink>
          <SidebarLink to="/admin/categories" icon={Tags} current={location.pathname === '/admin/categories'}>Categories</SidebarLink>
          <SidebarLink to="/admin/godown" icon={Warehouse} current={location.pathname === '/admin/godown'}>Godowns</SidebarLink>
          
          {isOpen && <p className="text-xs font-black text-green-500/70 uppercase tracking-widest mt-6 mb-3 ml-2">System</p>}
          <SidebarLink to="/admin/media" icon={Upload} current={location.pathname === '/admin/media'}>Media</SidebarLink>
          <SidebarLink to="/admin/settings" icon={Settings} current={location.pathname === '/admin/settings'}>Settings</SidebarLink>
        </nav>

        <div className="p-4 border-t border-white/10">
           <div className={`bg-white/5 rounded-xl p-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-400"></div>
                 <p className="text-xs font-bold text-green-100">System Online</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-green-700 transition-colors hidden lg:block bg-slate-100 p-2 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-all" size={16} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 w-72 focus:ring-2 focus:ring-green-500/30 outline-none text-slate-800 transition-all font-medium text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative transition-all p-2 rounded-xl border-2 ${showNotifications ? 'bg-green-100 text-green-700 border-green-200' : 'text-slate-400 hover:text-green-600 border-transparent hover:bg-green-50'}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-bounce-slow">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)}></div>
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-black text-slate-800 uppercase tracking-wider text-xs">Notifications</h3>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead}
                          className="text-[10px] font-bold text-green-600 hover:text-green-700 hover:underline transition-all"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-[350px] overflow-y-auto no-scrollbar">
                      {notifications.length > 0 ? (
                        notifications.map((n) => (
                          <div 
                            key={n.id} 
                            className={`p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group ${!n.read ? 'bg-green-50/30' : ''}`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h4 className={`text-sm font-bold ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>{n.title}</h4>
                              <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">{n.message}</p>
                            {!n.read && (
                              <div className="mt-2 flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                <span className="text-[10px] font-bold text-green-600 uppercase">New</span>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <p className="text-sm text-slate-400 italic">No notifications yet</p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                       <button className="text-[11px] font-black text-slate-500 hover:text-green-600 uppercase tracking-widest transition-all">View all alerts</button>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-3 pl-5 border-l border-slate-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-tight group-hover:text-green-700 transition-colors">Admin User</p>
                <p className="text-xs font-semibold text-slate-500">Superadmin</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold border-2 border-white shadow-sm overflow-hidden group-hover:border-green-200 transition-all">
                 <img src="https://ui-avatars.com/api/?name=Admin+User&background=d0e6d4&color=1b3d2c" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-6 md:p-8 flex-grow">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
