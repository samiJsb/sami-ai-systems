import React from 'react';
import { Settings as SettingsIcon, User, Shield, Bell, AppWindow } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = React.useState('Profile');

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-widest text-white">System Configuration</h1>
        <p className="text-axon-muted mt-2 text-xs font-bold uppercase tracking-widest">Configure terminal parameters and neural preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <aside className="lg:col-span-1 space-y-2">
          {[
            { icon: User, label: 'Profile' },
            { icon: Shield, label: 'Security' },
            { icon: Bell, label: 'Notifications' },
            { icon: AppWindow, label: 'Integrations' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-3 w-full px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all ${
                activeTab === item.label ? 'bg-axon-primary text-white shadow-[0_4px_15px_rgba(88,101,242,0.3)]' : 'text-axon-muted hover:bg-axon-card hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </aside>

        <div className="lg:col-span-3 space-y-8">
          {activeTab === 'Profile' && (
            <div className="p-8 bg-axon-card border border-axon-border rounded-xl">
               <h3 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-white">Public_Access_Descriptor</h3>
               {/* Profile Content */}
               <div className="space-y-10">
                 <div className="flex items-center gap-8">
                   <div className="relative group">
                      <img 
                        src={profile?.photoURL || `https://ui-avatars.com/api/?name=${profile?.displayName}`} 
                        className="w-24 h-24 rounded-lg bg-axon-bg object-cover border-2 border-axon-border group-hover:border-axon-primary transition-colors" 
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
                        <SettingsIcon className="w-6 h-6 text-white" />
                      </div>
                   </div>
                   <div>
                      <button className="px-6 py-2.5 bg-axon-bg border border-axon-border text-[9px] font-black uppercase tracking-[0.2em] text-axon-muted hover:text-white hover:border-axon-primary transition-all rounded">
                        Update_Asset_Avatar
                      </button>
                      <p className="text-[9px] font-bold text-axon-muted mt-2 uppercase tracking-tighter">MAX_FILE_SIZE: 1.2MB_ALPHA</p>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                     <label className="text-[9px] font-black text-axon-muted uppercase tracking-[0.4em]">System_Name</label>
                     <input 
                      type="text" 
                      defaultValue={profile?.displayName}
                      className="w-full px-4 py-4 bg-axon-bg border border-axon-border rounded text-[11px] font-mono tracking-widest text-white focus:border-axon-primary focus:outline-none transition-all"
                     />
                   </div>
                   <div className="space-y-3">
                     <label className="text-[9px] font-black text-axon-muted uppercase tracking-[0.4em]">Auth_Sequence_Email</label>
                     <input 
                      type="email" 
                      defaultValue={profile?.email}
                      disabled
                      className="w-full px-4 py-4 bg-axon-bg border border-axon-border rounded text-[11px] font-mono tracking-widest text-axon-muted cursor-not-allowed opacity-50"
                     />
                   </div>
                 </div>
               </div>
               <div className="mt-12 pt-8 border-t border-axon-border flex justify-end">
                 <button className="px-8 py-4 bg-white text-black rounded text-[10px] font-black tracking-[0.3em] uppercase hover:bg-axon-primary hover:text-white transition-all shadow-xl shadow-black/10 active:scale-95">
                   Synchronize_Changes
                 </button>
               </div>
            </div>
          )}

          {activeTab === 'Security' && (
            <div className="p-8 bg-axon-card border border-axon-border rounded-xl space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Encryption_Protocols</h3>
              <div className="space-y-6">
                {[
                  { label: 'Multi-Factor Authentication', status: 'ACTIVE', desc: 'Secure login via neural signature verification.' },
                  { label: 'Session Management', status: 'PERSISTENT', desc: 'Manage active terminal sessions.' },
                  { label: 'Encryption Level', status: 'AES-256', desc: 'Enterprise-grade payload protection.' }
                ].map(item => (
                  <div key={item.label} className="p-6 bg-axon-bg border border-axon-border rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-[9px] font-bold text-axon-muted uppercase tracking-tighter">{item.desc}</p>
                    </div>
                    <span className="px-3 py-1 bg-axon-primary/10 text-axon-primary border border-axon-primary/20 rounded text-[8px] font-black tracking-widest">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="p-8 bg-axon-card border border-axon-border rounded-xl space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Alert_Communication_Subsystem</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['System_Health', 'Project_Updates', 'Neural_Bursts', 'Auth_Alerts'].map(name => (
                  <div key={name} className="p-6 bg-axon-bg border border-axon-border rounded-lg flex items-center justify-between">
                    <span className="text-[10px] font-black text-axon-muted uppercase tracking-widest">{name}</span>
                    <div className="w-8 h-4 bg-axon-primary rounded-full relative p-0.5">
                      <div className="w-3 h-3 bg-white rounded-full ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Integrations' && (
            <div className="p-8 bg-axon-card border border-axon-border rounded-xl space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">External_Neural_Bridges</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: 'GitHub', status: 'CONNECTED', icon: 'git-branch' },
                  { name: 'Firebase', status: 'CONNECTED', icon: 'server' },
                  { name: 'Vercel', status: 'PENDING', icon: 'triangle' },
                ].map(bridge => (
                  <div key={bridge.name} className="p-6 bg-axon-bg border border-axon-border rounded-lg flex items-center justify-between group hover:border-axon-primary transition-all">
                    <div className="flex items-center gap-4">
                      <div className="text-[10px] font-black text-white uppercase tracking-widest">{bridge.name}</div>
                    </div>
                    <button className={cn(
                      "px-4 py-2 rounded text-[8px] font-black tracking-widest transition-all",
                      bridge.status === 'CONNECTED' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-axon-muted/10 text-axon-muted border border-axon-muted/20"
                    )}>
                      {bridge.status}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-8 border border-axon-border rounded-xl bg-axon-card/50">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#A0A0A5]">Terminal_Alerts</h3>
                <div className="w-10 h-5 bg-axon-primary rounded-full relative p-1 cursor-pointer">
                   <div className="w-3 h-3 bg-white rounded-full ml-auto" />
                </div>
             </div>
             <p className="text-[10px] text-axon-muted uppercase font-bold tracking-widest">Enable high-priority neural push notifications for mission-critical project updates.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
