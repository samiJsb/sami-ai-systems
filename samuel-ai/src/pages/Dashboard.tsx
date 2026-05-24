import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight, 
  MoreHorizontal,
  Plus,
  Sparkles,
  Briefcase
} from 'lucide-react';
import { collection, query, where, limit, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { formatDate, cn } from '../lib/utils';
import SystemTerminal from '../components/SystemTerminal';

const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1100 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    users: 124
  });

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'projects'),
      where('ownerId', '==', user.uid),
      orderBy('updatedAt', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projs);
      
      setStats(prev => ({
        ...prev,
        total: projs.length,
        active: projs.filter((p: any) => p.status === 'active').length,
        completed: projs.filter((p: any) => p.status === 'completed').length,
      }));
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="space-y-12">
      {/* Hero Metric Section */}
      <section className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 flex flex-col justify-between py-2">
          <div>
            <h1 className="text-[120px] font-black leading-[0.8] tracking-tighter text-white">
              {stats.active}<span className="text-axon-primary">.4</span>k
            </h1>
            <p className="text-sm uppercase tracking-[0.4em] font-medium text-axon-muted mt-6">Active System Requests / Pulse</p>
          </div>
          
          <div className="h-40 w-full flex items-end space-x-1 mt-12 pr-12">
            {[12, 16, 24, 20, 32, 40, 28, 32, 14, 10, 18, 22].map((h, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex-1 rounded-sm transition-all duration-500",
                  i === 5 ? "bg-axon-primary h-40 shadow-[0_0_20px_rgba(88,101,242,0.3)]" : "bg-axon-border h-" + h
                )}
                style={{ height: `${h * 4}px` }}
              />
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="p-8 bg-axon-card border border-axon-border rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 text-[60px] font-black text-axon-primary leading-none select-none pointer-events-none italic">AI</div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-axon-primary mb-4">Neural Insights</h3>
            <p className="text-sm leading-relaxed text-[#A0A0A5]">
              Project surge detected in workspace clusters. Recommended allocation increase by <span className="text-emerald-400">15%</span> for optimized output.
            </p>
            <button className="mt-8 w-full py-4 bg-axon-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-[#4752C4] transition-all">
              Deploy Patch
            </button>
          </div>

          <div className="p-8 border border-axon-border rounded-2xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-axon-muted mb-6">Compute Health</h3>
            <div className="space-y-6">
              {[
                { name: 'API_CLUSTER_01', val: 42, color: 'bg-emerald-500' },
                { name: 'GRAPH_DB_04', val: 88, color: 'bg-amber-500' }
              ].map(node => (
                <div key={node.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">{node.name}</span>
                    <span className="text-[10px] font-mono text-axon-muted">{node.val}% CPU</span>
                  </div>
                  <div className="w-full h-1 bg-axon-border rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${node.val}%` }}
                      className={cn("h-full", node.color)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Quick Grid */}
      <section className="w-full border-t border-axon-border pt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Avg Latency', val: '18ms' },
          { label: 'Health Score', val: '99.9%' },
          { label: 'Egress Value', val: '$142.4k' },
          { label: 'Active Incidents', val: '0' },
        ].map((stat, i) => (
          <div key={stat.label} className={cn("pr-8", i < 3 && "md:border-r border-axon-border")}>
            <span className="block text-3xl font-black text-white tracking-tighter">{stat.val}</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-axon-muted">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Project Feed */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white">Project_Feed_Module</h2>
          <div className="h-[1px] flex-1 bg-axon-border mx-8" />
          <button 
            onClick={() => navigate('/projects')}
            className="text-[10px] font-bold text-axon-muted hover:text-white transition-colors uppercase tracking-widest"
          >
            View_All_Assets
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.length > 0 ? projects.map((project) => (
            <div key={project.id} className="p-6 bg-axon-card border border-axon-border rounded-xl flex items-center justify-between group hover:border-axon-primary transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-axon-bg border border-axon-border rounded-lg flex items-center justify-center text-axon-muted group-hover:text-white group-hover:bg-axon-primary transition-all">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">{project.name}</h4>
                  <p className="text-[10px] text-axon-muted font-bold mt-1 uppercase tracking-tighter">Status: <span className="text-axon-primary">{project.status}</span></p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-axon-muted group-hover:text-white transition-colors" />
            </div>
          )) : (
            <div className="col-span-2 p-12 border border-dashed border-axon-border rounded-xl text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-axon-muted">No_Neural_Assets_Detected</p>
            </div>
          )}
        </div>
      </section>

      {/* System Infrastructure Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white">Base_Layer_Infrastructure</h2>
          <div className="h-[1px] flex-1 bg-axon-border mx-8" />
        </div>
        <SystemTerminal />
      </section>
    </div>
  );
}
