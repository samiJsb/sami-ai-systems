import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Target, 
  ArrowUpRight, 
  Users,
  Activity,
  Globe
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';

const COLORS = ['#5865F2', '#10B981', '#F59E0B', '#303033'];

const analyticsData = [
  { name: 'Week 1', a: 4000, b: 2400 },
  { name: 'Week 2', a: 3000, b: 1398 },
  { name: 'Week 3', a: 2000, b: 9800 },
  { name: 'Week 4', a: 2780, b: 3908 },
  { name: 'Week 5', a: 1890, b: 4800 },
  { name: 'Week 6', a: 2390, b: 3800 },
];

const pieData = [
  { name: 'LLM Processing', value: 400 },
  { name: 'Data Ingestion', value: 300 },
  { name: 'Search APIs', value: 300 },
  { name: 'Vector Storage', value: 200 },
];

export default function Analytics() {
  const [activeTab, setActiveTab] = React.useState<'live' | 'historical'>('live');
  const [focusedMetric, setFocusedMetric] = React.useState<string | null>(null);

  return (
    <div className="space-y-12 relative">
      <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#5865F2_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-white">Neural Intelligence</h1>
          <p className="text-axon-muted mt-2 text-xs font-bold uppercase tracking-widest">Real-time telemetry and pattern analysis.</p>
        </div>
        <div className="flex gap-2 p-1 bg-axon-card border border-axon-border rounded-xl">
           <button 
            onClick={() => setActiveTab('live')}
            className={cn(
              "px-4 py-2 text-[10px] font-black rounded-lg uppercase tracking-widest transition-all",
              activeTab === 'live' ? "bg-axon-primary text-white" : "text-axon-muted hover:text-white"
            )}
           >
             REAL_TIME
           </button>
           <button 
            onClick={() => setActiveTab('historical')}
            className={cn(
              "px-4 py-2 text-[10px] font-black rounded-lg uppercase tracking-widest transition-all",
              activeTab === 'historical' ? "bg-axon-primary text-white" : "text-axon-muted hover:text-white"
            )}
           >
             HISTORICAL
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Metric Cards */}
        <div className="lg:col-span-1 space-y-4">
           {[
             { label: 'Global Traffic', value: '4.2m', trend: '+18.4%', icon: Globe, color: 'text-axon-primary' },
             { label: 'Active Sessions', value: '18.5k', trend: '+12.1%', icon: Activity, color: 'text-emerald-500' },
             { label: 'Compute Cost', value: '$842.12', trend: '-2.4%', icon: Zap, color: 'text-amber-500' },
           ].map((stat, i) => (
             <motion.div
               key={stat.label}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.1 }}
               className="p-6 bg-axon-card border border-axon-border rounded-xl flex items-center justify-between group cursor-pointer hover:border-axon-primary transition-all overflow-hidden relative"
             >
               <div className="absolute top-0 right-0 p-4 opacity-[0.03] rotate-12">
                 <stat.icon className="w-16 h-16" />
               </div>
               <div className="flex items-center gap-4 relative z-10">
                 <div>
                   <p className="text-[10px] font-black text-axon-muted uppercase tracking-[0.2em]">{stat.label}</p>
                   <p className="text-2xl font-black text-white tracking-tighter mt-1">
                     {activeTab === 'historical' ? (parseFloat(stat.value.replace(/[^0-9.]/g, '')) * 0.8).toFixed(1) + (stat.value.includes('m') ? 'm' : stat.value.includes('k') ? 'k' : '') : stat.value}
                   </p>
                 </div>
               </div>
               <span className={cn(
                 "text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-widest relative z-10",
                 stat.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
               )}>
                 {stat.trend}
               </span>
             </motion.div>
           ))}

           <div className="p-8 bg-gradient-to-br from-axon-primary to-axon-primary/20 text-white rounded-2xl overflow-hidden relative border border-axon-primary/30">
              <div className="relative z-10">
                <Target className="w-8 h-8 mb-6 text-white/40" />
                <h3 className="text-xl font-black tracking-widest mb-2 uppercase">Core Capacity</h3>
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-8 leading-relaxed">System reaching 84% of defined high-performance targets.</p>
                <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '84%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]" 
                  />
                </div>
              </div>
           </div>
        </div>

        {/* Charts */}
        <div className="lg:col-span-2 space-y-8">
           <div className="p-8 bg-axon-card border border-axon-border rounded-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/grid-me.png')] pointer-events-none" />
             <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">System_Performance_Matrix</h3>
                <TrendingUp className="text-axon-muted w-4 h-4" />
             </div>
             <div className="h-[300px] w-full relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={analyticsData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A1A1E" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#606067', fontWeight: 700 }} />
                   <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#606067', fontWeight: 700 }} />
                   <Tooltip 
                    cursor={{fill: '#ffffff05'}}
                    contentStyle={{ backgroundColor: '#0A0A0B', border: '1px solid #1A1A1E', borderRadius: '4px', textTransform: 'uppercase', fontSize: '10px', fontWeight: 'bold' }}
                   />
                   <Bar dataKey="a" fill="#5865F2" radius={[2, 2, 0, 0]} />
                   <Bar dataKey="b" fill="#303033" radius={[2, 2, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 bg-axon-card border border-axon-border rounded-xl">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-white">Asset_Allocation</h3>
               <div className="h-[200px]">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={pieData}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={5}
                       dataKey="value"
                       stroke="none"
                     >
                       {pieData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                     </Pie>
                     <Tooltip />
                   </PieChart>
                 </ResponsiveContainer>
               </div>
               <div className="mt-8 grid grid-cols-2 gap-y-3">
                  {pieData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                       <span className="text-[9px] font-black text-axon-muted uppercase tracking-widest">{entry.name}</span>
                    </div>
                  ))}
               </div>
             </div>

             <div className="p-8 bg-axon-primary text-white rounded-xl relative overflow-hidden flex flex-col justify-center border border-axon-primary shadow-[0_0_40px_rgba(88,101,242,0.1)]">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/circuit-board.png')] bg-repeat" />
                <h4 className="text-4xl font-black italic tracking-tighter mb-4 opacity-30 uppercase">OPTIMIZED</h4>
                <p className="text-lg font-black leading-tight mb-8 uppercase tracking-tight">Active neural routes engaged. Cost reduction: <span className="text-black bg-white px-2 py-0.5 ml-1">22%_ALPHA</span></p>
                <button className="w-fit px-6 py-3 bg-white text-axon-primary rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-xl">
                  Scale_Internal_Cloud
                </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
