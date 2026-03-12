import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Check, 
  User,
  Shield,
  Key,
  Bell,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../data/DataContext';
import { API_BASE_URL } from '../../api/config';

const SettingSection = ({ title, description, icon: Icon, children }) => (
  <div className="rounded-none p-3 border border-teal-900/5 shadow-sm relative overflow-hidden group">
    <div className="relative z-10 flex items-center gap-3 mb-4">
      <div className="h-8 w-8 rounded-none flex items-center justify-center text-teal-600 border border-teal-900/5 transition-colors group-hover:bg-[#1E5D57] group-hover:text-white">
        <Icon size={16} />
      </div>
      <div>
        <h3 className="text-[11px] font-bold text-slate-800 tracking-widest uppercase leading-tight">{title}</h3>
        <p className="text-[9px] text-slate-500 font-medium uppercase tracking-tight mt-0.5">{description}</p>
      </div>
    </div>
    <div className="relative z-10 space-y-4">
      {children}
    </div>
  </div>
);

const SettingItem = ({ label, description, children }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-2 rounded-none hover:bg-slate-50 transition-colors border-b border-teal-900/5 last:border-0">
    <div className="space-y-0.5">
      <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">{label}</p>
      <p className="text-[9px] text-slate-400 font-medium uppercase tracking-tight italic">{description}</p>
    </div>
    <div className="flex-shrink-0">
      {children}
    </div>
  </div>
);

const Settings = () => {
  const { siteName, setSiteName, adminEmail, setAdminEmail } = useData();
  const [adminUser, setAdminUser] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('adminUser');
    if (userData) {
      setAdminUser(JSON.parse(userData));
    }
  }, []);

  const handleSave = async () => {
    try {
      const apiBase = API_BASE_URL;
      
      // 1. Update Profile (User record - Email/Password)
      const profilePayload = {
        userId: adminUser?.id || adminUser?._id,
        email: adminEmail, 
        name: adminUser?.name,
        password: adminUser?.password,
        newEmail: adminEmail 
      };

      const profileRes = await fetch(`${apiBase}/auth/update-profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profilePayload)
      });

      // 2. Update General Settings (Site name, etc)
      const settingsPayload = {
        siteName: siteName,
        adminEmail: adminEmail
      };

      const settingsRes = await fetch(`${apiBase}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsPayload)
      });

      if (profileRes.ok && settingsRes.ok) {
        const profileData = await profileRes.json();
        localStorage.setItem('adminUser', JSON.stringify(profileData.user));
        setAdminUser(profileData.user);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        alert('Some changes could not be saved. Check console.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Check console for details.');
    }
  };

  const handleUserChange = (field, value) => {
    setAdminUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-3 animate-in fade-in zoom-in-95 duration-500 pb-4">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-[#1E5D57]/5 rounded-none p-3 border-none shadow-sm mb-1">
        {/* Decorative Corner Shape */}
        <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-[#1E5D57]/10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
          <div>
            <span className="text-[8px] font-bold text-teal-600 uppercase tracking-widest mb-0.5 block">Account & Portal</span>
            <h1 className="text-base font-bold text-slate-800 tracking-tight leading-none uppercase">Portal Configuration</h1>
          </div>
          <button 
            onClick={handleSave}
            className={`${saved ? 'bg-green-600' : 'bg-slate-900 hover:bg-teal-600'} text-white px-4 py-1.5 rounded-none text-[9px] font-bold transition-all shadow-lg flex items-center gap-2 active:scale-95 uppercase tracking-widest`}
          >
            {saved ? 'SAVED ✓' : <>SAVE CHANGES <Check size={14} /></>}
          </button>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-50 border border-green-200 rounded-none p-2 flex items-center gap-2"
          >
            <Check size={14} className="text-green-600" />
            <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Settings saved successfully. Changes are now live.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* General Settings */}
        <SettingSection 
          title="General Settings" 
          description="Branding and core identification."
          icon={Globe}
        >
          <div className="space-y-3">
             <div className="space-y-1.5">
                <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest ml-1">Portal Name</label>
                <input 
                  type="text" 
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full bg-white border border-teal-900/5 rounded-none py-2 px-3 focus:ring-4 focus:ring-teal-500/5 outline-none text-slate-700 transition-all font-bold text-[10px] uppercase tracking-widest"
                />
             </div>
             <div className="space-y-1.5">
                <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest ml-1">Edit Email</label>
                <input 
                  type="email" 
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-white border border-teal-900/5 rounded-none py-2 px-3 focus:ring-4 focus:ring-teal-500/5 outline-none text-slate-700 transition-all font-bold text-[10px] lowercase tracking-wide"
                />
             </div>
          </div>
        </SettingSection>

        {/* User Account */}
        <SettingSection 
          title="Admin Profile" 
          description="Security and personal credentials."
          icon={User}
        >
          <div className="space-y-3">
             <div className="flex flex-col gap-4 p-3 rounded-none border border-teal-900/5 bg-slate-50/50">
               <div className="flex items-center gap-4">
                  <div className="relative group">
                     <div className="w-12 h-12 rounded-none overflow-hidden border border-teal-900/10 shadow-sm">
                        <img src={`https://ui-avatars.com/api/?name=${adminUser?.name || 'Admin'}&background=1E5D57&color=fff`} alt="User" className="w-full h-full object-cover" />
                     </div>
                  </div>
                  <div className="flex-1 space-y-3">
                     <div className="space-y-1">
                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Profile Name</label>
                        <input 
                           type="text" 
                           value={adminUser?.name || ''} 
                           onChange={(e) => handleUserChange('name', e.target.value.toUpperCase())}
                           className="w-full bg-white border border-teal-900/5 rounded-none py-2 px-3 focus:ring-4 focus:ring-teal-500/5 outline-none text-slate-700 transition-all font-bold text-[10px] uppercase tracking-widest italic"
                           placeholder="ADMIN NAME"
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Change Password</label>
                        <input 
                           type="password" 
                           value={adminUser?.password || ''} 
                           onChange={(e) => handleUserChange('password', e.target.value)}
                           className="w-full bg-white border border-teal-900/5 rounded-none py-2 px-3 focus:ring-4 focus:ring-teal-500/5 outline-none text-slate-700 transition-all font-bold text-[10px] tracking-widest italic"
                           placeholder="••••••••"
                        />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </SettingSection>
      </div>
    </div>
  );
};

export default Settings;
