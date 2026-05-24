import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ArrowUpRight, 
  Trash2, 
  Edit3,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, updateDoc, doc, deleteDoc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatDate } from '../lib/utils';
import { generateProjectInsights } from '../lib/ai';

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);
  const [insights, setInsights] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'projects'),
      where('ownerId', '==', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [user]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addDoc(collection(db, 'projects'), {
        ...newProject,
        status: 'active',
        ownerId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        members: [user.uid]
      });
      setNewProject({ name: '', description: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Create Project Error:", error);
    }
  };

  const handleToggleStatus = async (projectId: string, currentStatus: string) => {
    try {
      await updateDoc(doc(db, 'projects', projectId), {
        status: currentStatus === 'active' ? 'completed' : 'active',
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Update Status Error:", error);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteDoc(doc(db, 'projects', projectId));
    } catch (error) {
      console.error("Delete Project Error:", error);
    }
  };

  const handleAnalyze = async (project: any) => {
    setIsAnalyzing(project.id);
    try {
      const insight = await generateProjectInsights(project);
      setInsights(prev => ({ ...prev, [project.id]: insight }));
    } catch (error) {
      console.error("Analysis Error:", error);
    } finally {
      setIsAnalyzing(null);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-white">Neural Assets</h1>
          <p className="text-axon-muted mt-2 text-xs font-bold uppercase tracking-widest">Lifecycle management for your AI-powered workflows.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black px-8 py-4 rounded-lg text-[10px] font-black tracking-[0.2em] hover:bg-axon-primary hover:text-white transition-all flex items-center gap-2 shadow-xl shadow-black/10 active:scale-95 uppercase"
        >
          <Plus className="w-4 h-4" />
          Initialize_Asset
        </button>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between border-b border-axon-border pb-8">
        <div className="flex gap-2 p-1 bg-axon-card border border-axon-border rounded-xl">
           <button className="px-4 py-2 bg-axon-primary text-white rounded-lg text-[9px] font-black tracking-widest uppercase">ALL</button>
           <button className="px-4 py-2 text-axon-muted hover:text-white rounded-lg text-[9px] font-black tracking-widest uppercase transition-colors">ACTIVE</button>
           <button className="px-4 py-2 text-axon-muted hover:text-white rounded-lg text-[9px] font-black tracking-widest uppercase transition-colors">COMPLETED</button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-axon-muted w-3 h-3" />
          <input 
            type="text" 
            placeholder="Search_Asset_ID..." 
            className="pl-10 pr-4 py-2.5 bg-axon-card border border-axon-border rounded-lg text-[10px] font-mono tracking-widest focus:outline-none focus:border-axon-primary transition-all w-64 text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group bg-axon-card rounded-xl border border-axon-border p-8 flex flex-col hover:border-axon-primary/50 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-axon-primary/5 blur-[40px] -mr-16 -mt-16 rounded-full" />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-axon-bg border border-axon-border rounded-lg flex items-center justify-center font-black text-xl text-axon-muted group-hover:bg-axon-primary group-hover:text-white transition-all duration-300">
                    {project.name[0]}
                  </div>
                  <div>
                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-white">{project.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                       <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", project.status === 'active' ? 'bg-emerald-500' : 'bg-axon-muted')} />
                       <p className="text-[9px] text-axon-muted font-bold uppercase tracking-widest">{project.status}</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[11px] font-medium text-[#A0A0A5] mb-10 line-clamp-3 leading-relaxed flex-1 relative z-10">
                {project.description || "System metadata not initialized for this neural asset."}
              </p>

              <div className="space-y-6 relative z-10">
                 {insights[project.id] && (
                   <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="p-4 bg-axon-primary/5 border border-axon-primary/20 rounded-lg text-[10px] text-axon-primary leading-normal font-bold uppercase tracking-widest"
                   >
                     <div className="flex items-center gap-1.5 mb-2 text-white">
                       <Sparkles className="w-3 h-3" /> INTEL_REPORT:
                     </div>
                     {insights[project.id]}
                   </motion.div>
                 )}

                <div className="pt-6 border-t border-axon-border flex items-center justify-between">
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-sm border border-axon-border bg-axon-bg" />
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    <button 
                      onClick={() => handleAnalyze(project)}
                      disabled={isAnalyzing === project.id}
                      className={cn(
                        "p-2 rounded bg-axon-bg border border-axon-border transition-all",
                        isAnalyzing === project.id ? "opacity-50" : "hover:border-axon-primary text-axon-muted hover:text-white"
                      )}
                    >
                      <Sparkles className={cn("w-3.5 h-3.5", isAnalyzing === project.id && "animate-pulse")} />
                    </button>
                    <button 
                      onClick={() => handleToggleStatus(project.id, project.status)}
                      className="p-2 bg-axon-bg border border-axon-border text-axon-muted hover:text-white rounded transition-all"
                    >
                      <CheckCircle2 className={cn("w-3.5 h-3.5", project.status === 'completed' && "text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]")} />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-2 bg-axon-bg border border-axon-border text-axon-muted hover:text-red-400 rounded transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Create Modal - Dark Themed */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg bg-axon-bg border-4 border-axon-border rounded-xl  shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="p-8 border-b border-axon-border flex justify-between items-center bg-axon-card">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white">Initialize_New_Asset</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-axon-muted hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreate} className="p-8 space-y-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-axon-muted uppercase tracking-[0.4em]">Asset_Identifier</label>
                  <input
                    required
                    type="text"
                    placeholder="ENTER_ID"
                    className="w-full px-4 py-4 bg-axon-card border border-axon-border rounded text-[11px] font-mono tracking-widest text-white focus:border-axon-primary focus:outline-none transition-all placeholder:text-axon-muted/50"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-axon-muted uppercase tracking-[0.4em]">Encrypted_Metadata</label>
                  <textarea
                    rows={4}
                    placeholder="SCOPE_DEFINITION_REQUIRED"
                    className="w-full px-4 py-4 bg-axon-card border border-axon-border rounded text-[11px] font-mono tracking-widest text-white focus:border-axon-primary focus:outline-none transition-all resize-none placeholder:text-axon-muted/50"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-white text-black rounded text-[10px] font-black uppercase tracking-[0.3em] hover:bg-axon-primary hover:text-white active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
                >
                  Commence_Neural_Asset_Deployment
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { X } from 'lucide-react';
