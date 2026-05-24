import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Briefcase, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Plus,
  Search,
  Bell,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  active: boolean;
  onClick: () => void;
}

function SidebarItem({ icon: Icon, label, path, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200",
        active 
          ? "text-white border-l-2 border-axon-primary -ml-8 pl-10" 
          : "text-axon-muted hover:text-white"
      )}
    >
      <span>{label}</span>
      {active && (
        <motion.div
          layoutId="active-dot"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-axon-primary shadow-[0_0_8px_rgba(88,101,242,0.6)]"
        />
      )}
    </button>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { profile, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Control Center', path: '/' },
    { icon: Briefcase, label: 'Neural Assets', path: '/projects' },
    { icon: BarChart3, label: 'Compute Nodes', path: '/analytics' },
    { icon: Settings, label: 'Traffic Mesh', path: '/settings' },
  ];

  const currentPathLabel = menuItems.find(i => i.path === location.pathname)?.label || 'System';

  return (
    <div className="flex h-screen bg-axon-bg text-axon-text font-sans overflow-hidden border-8 border-axon-border">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 0 }}
        className="relative flex flex-col h-full bg-axon-bg border-r border-axon-border overflow-hidden"
      >
        <div className="flex flex-col h-20 px-8 justify-center">
          <div className="text-[10px] tracking-[0.3em] font-black text-axon-primary uppercase">System</div>
          <div className="text-xl font-bold tracking-tighter text-white">SAMUELAI_OS</div>
        </div>

        <nav className="flex-1 px-8 space-y-6 py-12">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              {...item}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </nav>

        <div className="p-8 space-y-6">
          <div className="p-4 bg-axon-card border border-axon-border rounded-xl">
            <div className="text-[10px] uppercase tracking-widest text-axon-muted mb-2">Status</div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Production Environment</span>
            </div>
          </div>
          
          {profile && (
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 bg-gradient-to-br from-axon-primary to-purple-600 rounded-lg shrink-0" />
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-white truncate uppercase tracking-widest">{profile.displayName}</p>
                <button onClick={logout} className="text-[8px] text-axon-muted hover:text-white uppercase font-black tracking-[0.2em] transition-colors">Terminate_Session</button>
              </div>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-20 border-b border-axon-border flex items-center justify-between px-10">
          <div className="flex items-center space-x-4 text-[10px] font-mono uppercase tracking-[0.2em] text-axon-muted">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="hover:text-white transition-colors">Root</button>
            <span className="text-axon-border">/</span>
            <span className="text-white">{currentPathLabel.replace(' ', '_')}</span>
          </div>

          <div className="flex items-center space-x-6 text-[10px] font-bold uppercase tracking-tighter">
            <div className="flex flex-col items-end">
              <span className="text-axon-muted tracking-widest">Uptime</span>
              <span className="text-emerald-400">99.982%</span>
            </div>
            <div className="w-[1px] h-8 bg-axon-border"></div>
            <button 
              onClick={() => navigate('/projects')}
              className="flex items-center gap-3 bg-white text-black px-4 py-2.5 rounded-lg text-xs font-black tracking-widest hover:bg-axon-primary hover:text-white transition-all active:scale-95 shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
            >
              <Plus className="w-4 h-4" />
              NEW_NODE
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 pb-32">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </div>

        {/* Global Terminal Footer */}
        <footer className="absolute bottom-0 right-0 left-0 bg-[#0A0A0B]/80 backdrop-blur-xl border-t border-axon-border px-8 py-2.5 flex items-center justify-between z-[50]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400">System_Stable</span>
            </div>
            <div className="h-3 w-[1px] bg-axon-border" />
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-bold uppercase tracking-widest text-axon-muted">SamuelAI_Core:</span>
              <span className="text-[8px] font-mono text-white">4.8.2-delta</span>
            </div>
            <div className="h-3 w-[1px] bg-axon-border" />
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-bold uppercase tracking-widest text-axon-muted">Cluster:</span>
              <span className="text-[8px] font-mono text-white">EUROPE_WEST_1</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-[8px] font-black uppercase tracking-widest text-[#303033]">
              <span>TCP_SOCKET: OPEN</span>
              <span>SEC_HASH: VERIFIED</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-0.5 bg-white/5 rounded border border-white/5">
               <span className="text-[8px] font-black text-axon-primary">CPU:</span>
               <span className="text-[8px] font-mono text-white">12.4%</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
