import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const { user, loginWithGoogle, loading } = useAuth();

  if (loading) return null;
  if (user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-axon-bg flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/circuit-board.png')] opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-axon-primary blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-axon-card border-4 border-axon-border p-10 rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.4)]"
        >
          <div className="text-center mb-12">
            <div className="inline-flex flex-col items-center mb-6">
               <div className="text-[10px] tracking-[0.5em] font-black text-axon-primary mb-2 uppercase">System</div>
               <div className="text-3xl font-black tracking-tighter text-white">SAMUEL_AI</div>
            </div>
            <p className="text-[10px] font-bold text-axon-muted uppercase tracking-[0.3em] leading-relaxed">
              Neural Network Terminal Access Required.<br />
              Please provide authorization signature.
            </p>
          </div>

          <div className="space-y-8">
            <div className="p-4 bg-axon-bg border border-axon-border rounded-lg border-l-4 border-l-axon-primary">
              <div className="text-[9px] font-black uppercase tracking-widest text-axon-muted mb-1">Status</div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-white">WAITING_FOR_SIGNATURE...</span>
              </div>
            </div>

            <button
              onClick={loginWithGoogle}
              className="w-full py-5 bg-white text-axon-bg rounded-lg text-[10px] font-black uppercase tracking-[0.4em] hover:bg-axon-primary hover:text-white transition-all active:scale-[0.98] shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
            >
              EXECUTE_LOGIN_SEQUENCE
            </button>

            <div className="pt-8 border-t border-axon-border">
               <div className="flex justify-between items-center text-[8px] font-black text-axon-muted uppercase tracking-widest">
                  <span>ENC_SEC_V3.4</span>
                  <span>BUILD_ID: 88219A</span>
               </div>
            </div>
          </div>
        </motion.div>
        
        <p className="text-center mt-8 text-[9px] font-black text-axon-muted uppercase tracking-[0.3em] opacity-40">
          Unauthorized access attempts are logged and reported to secondary clusters.
        </p>
      </div>
    </div>
  );
}
