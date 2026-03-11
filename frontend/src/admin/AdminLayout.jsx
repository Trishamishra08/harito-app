import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
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
  Settings,
  HelpCircle,
  LogOut,
  Sun,
  Moon,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../data/DataContext';

const SidebarLink = ({ to, icon: Icon, children, current, isOpen }) => (
  <Link
    to={to}
    className={`flex items-center ${isOpen ? 'mx-4 px-4' : 'justify-center mx-2'} py-3 transition-all duration-300 relative group rounded-none ${
      current 
        ? 'bg-[#1E5D57] text-white' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon 
      size={20} 
      className={`shrink-0 transition-colors duration-300 ${isOpen ? 'mr-3' : ''} ${current ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} 
    />
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="font-medium text-[13px] tracking-wide whitespace-nowrap overflow-hidden"
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  </Link>
);

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1024);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Product Added', message: 'GLYVID-71 has been added to catalog.', time: '2m ago', read: false },
    { id: 2, title: 'Category Alert', message: 'Seeds category needs description update.', time: '1h ago', read: false },
    { id: 3, title: 'System Batch', message: 'Database backup successful.', time: '5h ago', read: true },
  ]);

  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
        if (!token) {
      navigate('/admin/login', { replace: true });
    } else {
      if (userData) {
        setAdminUser(JSON.parse(userData));
      }
      setIsCheckingAuth(false);
    }
  }, [navigate]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

   const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login', { replace: true });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

   if (isCheckingAuth) return null;

  return (
    <div className={`flex h-screen overflow-hidden bg-[#F8FAFC] text-slate-900 font-sans`}>
      {/* Sidebar Backdrop (Mobile only) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-[45] lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          x: isOpen ? 0 : (window.innerWidth < 1024 ? -260 : 0),
          width: isOpen ? 260 : (window.innerWidth < 1024 ? 260 : 88),
          opacity: 1
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`bg-[#0F172A] fixed lg:relative z-50 h-screen flex flex-col border-none overflow-hidden`}
      >
        {/* Logo Section */}
        <div className={`p-6 flex items-center gap-3 border-b border-white/5 ${!isOpen && 'justify-center'}`}>
           <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-white/10 shrink-0 p-1.5">
              <img src="/images/logo.png" alt="Hirato" className="w-full h-full object-contain" />
           </div>
           {isOpen && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <h1 className="text-xl font-black text-white tracking-tighter italic">Hirato</h1>
               <p className="text-[8px] text-teal-400 font-black uppercase tracking-[0.2em] leading-none opacity-60">Admin Portal</p>
             </motion.div>
           )}
        </div>


        {/* Navigation */}
        <nav className="flex-grow space-y-2 overflow-y-auto no-scrollbar">
          <SidebarLink to="/admin" icon={LayoutDashboard} current={location.pathname === '/admin'} isOpen={isOpen}>Dashboard</SidebarLink>
          <SidebarLink to="/admin/products" icon={Package} current={location.pathname === '/admin/products'} isOpen={isOpen}>Products</SidebarLink>
          <SidebarLink to="/admin/categories" icon={Tags} current={location.pathname === '/admin/categories'} isOpen={isOpen}>Categories</SidebarLink>
          <SidebarLink to="/admin/godown" icon={Warehouse} current={location.pathname === '/admin/godown'} isOpen={isOpen}>Storage</SidebarLink>
          <SidebarLink to="/admin/assets" icon={Upload} current={location.pathname === '/admin/assets'} isOpen={isOpen}>Assets</SidebarLink>
          <SidebarLink to="/admin/settings" icon={Settings} current={location.pathname === '/admin/settings'} isOpen={isOpen}>Settings</SidebarLink>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/5 mt-auto">
          <button 
            className={`w-full flex items-center ${isOpen ? 'px-4 justify-start' : 'justify-center'} py-3 rounded-none text-slate-400 hover:text-white hover:bg-white/5 transition-all group gap-3`}
            onClick={() => navigate('/')}
          >
            <LogOut size={20} className="rotate-180" />
            {isOpen && (
              <span className="font-medium text-[14px] tracking-wide">Back to Site</span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-[#F8FAFC]">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-white/50 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsOpen(!isOpen)}
               className="lg:hidden p-2 rounded-none bg-white shadow-sm text-slate-600"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col">
               <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">{location.pathname === '/admin' ? 'System Overview' : 'Catalog Management'}</span>
               <h2 className="text-xl font-medium text-slate-800 tracking-tight">
                 {location.pathname === '/admin' ? 'Dashboard' : location.pathname.split('/').pop().charAt(0).toUpperCase() + location.pathname.split('/').pop().slice(1)}
               </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-teal-500 transition-all" size={14} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-slate-50 border border-slate-100 rounded-none py-1.5 pl-9 pr-4 w-56 focus:ring-4 focus:ring-teal-500/5 focus:bg-white outline-none transition-all font-bold text-[10px] text-slate-600 uppercase tracking-widest"
              />
            </div>

            {/* Notification */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                 className={`relative h-11 w-11 flex items-center justify-center rounded-none transition-all bg-transparent text-slate-400 hover:text-[#1E5D57] border-none`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                   <span className="absolute top-2.5 right-2.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-black rounded-none border border-white flex items-center justify-center">
                     {unreadCount}
                   </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <motion.div 
                      key="notification-backdrop"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[60] bg-black/5" 
                      onClick={() => setShowNotifications(false)}
                    />
                    <motion.div 
                      key="notification-menu"
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-3 w-80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[70] overflow-hidden rounded-none border border-slate-100"
                    >
                      <div className="p-3 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-800">Notifications</h3>
                        <button onClick={markAllAsRead} className="text-[8px] font-bold text-teal-600 hover:underline uppercase tracking-tight">Mark all read</button>
                      </div>
                      <div className="max-h-64 overflow-y-auto no-scrollbar p-1">
                        {notifications.map(n => (
                           <div key={n.id} className="p-2.5 mb-1 rounded-none hover:bg-slate-50 transition-colors cursor-pointer last:mb-0 border-l-2 border-transparent hover:border-teal-500">
                            <div className="flex justify-between items-start mb-0.5">
                              <h4 className={`text-[10px] font-bold uppercase tracking-tight ${!n.read ? 'text-slate-900' : 'text-slate-400'}`}>{n.title}</h4>
                              <span className="text-[8px] text-slate-300 font-bold uppercase">{n.time}</span>
                            </div>
                            <p className="text-[9px] text-slate-500 leading-normal line-clamp-2">{n.message}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              onClick={handleLogout}
              className="h-9 px-4 rounded-none bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-teal-600 transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <LogOut size={14} /> <span>Exit</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
