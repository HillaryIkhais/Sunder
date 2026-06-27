'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Header, Footer } from '@/components/SunderSite';
import { ArrowLeft, Database, Sparkles, AlertTriangle, ArrowRight, CheckCircle2, Play } from 'lucide-react';

export default function PipelinePage() {
  const [phase, setPhase] = useState<'idle' | 'incoming' | 'analyzing' | 'healing' | 'healed'>('idle');

  const runSimulation = () => {
    if (phase !== 'idle' && phase !== 'healed') return;
    setPhase('incoming');
    
    setTimeout(() => setPhase('analyzing'), 1200);
    setTimeout(() => setPhase('healing'), 3000);
    setTimeout(() => setPhase('healed'), 4500);
  };

  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <section className="hero-section flex-grow" style={{ minHeight: '100vh', paddingTop: '8rem', paddingBottom: '4rem' }}>
        <div className="ambient-glow-pink" style={{ top: '20%', left: '-10%', opacity: 0.5 }}></div>
        <div className="ambient-glow-blue" style={{ bottom: '10%', right: '-10%', opacity: 0.5 }}></div>
        
        <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div className="mb-8">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors mb-4 font-mono text-sm">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="hero-title" style={{ fontSize: '3rem', marginBottom: '0.2rem' }}>Shopify → Stripe</h2>
                <p className="text-[var(--text-secondary)] font-mono mb-4">pipeline://shopify_orders/webhook</p>
                
                {/* Dynamic Narrative Explainer */}
                <div className="max-w-[700px] h-[60px]">
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={phase}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[1.1rem] leading-relaxed"
                    >
                      {phase === 'idle' && <span className="text-[var(--text-secondary)]">Awaiting incoming Shopify webhooks. Sunder is acting as a reverse proxy, standing between Shopify and your Stripe backend to protect against schema drift.</span>}
                      {phase === 'incoming' && <span className="text-white">Intercepted a corrupted payload! The <code className="bg-white/10 px-1 rounded text-[var(--glow-pink)]">order_id</code> key was silently renamed to <code className="bg-white/10 px-1 rounded text-[var(--glow-pink)]">transaction_id</code> by Shopify.</span>}
                      {phase === 'analyzing' && <span className="text-white">Generating a semantic embedding and querying <strong className="text-[var(--glow-pink)] glow-text">AWS Aurora pgvector</strong>. Drift detected based on Cosine Distance. Halting payload!</span>}
                      {phase === 'healing' && <span className="text-white">Fetching historical schema norms. Executing a Javascript Transformer in a secure Node VM to dynamically rename the key back to <code className="bg-white/10 px-1 rounded text-[var(--glow-blue)]">order_id</code>.</span>}
                      {phase === 'healed' && <span className="text-white">Payload successfully healed and forwarded to Stripe. <strong className="text-[var(--glow-blue)] glow-text">Your downstream service never saw the error. Zero downtime.</strong></span>}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              <button 
                onClick={runSimulation}
                disabled={phase !== 'idle' && phase !== 'healed'}
                className="cta-button flex items-center gap-2"
                style={{ alignSelf: 'flex-start' }}
              >
                <Play size={16} />
                {phase === 'idle' || phase === 'healed' ? 'Simulate Payload' : 'Processing...'}
              </button>
            </div>
          </div>

          {/* VISUALIZER STAGE */}
          <div className="glass-panel relative mb-8" style={{ padding: '4rem 2rem', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' }}>
            
            {/* Background Grid Lines */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Left: Incoming Payload */}
            <div className="z-10 w-1/3 relative">
              <div className="mb-4 flex items-center gap-2 text-[var(--text-secondary)] font-mono text-sm uppercase tracking-widest">
                <Database size={14} /> Source: Shopify
              </div>
              <AnimatePresence>
                {(phase !== 'idle') && (
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-black/60 border border-white/10 rounded-2xl p-4 font-mono text-xs text-white/80 shadow-2xl relative"
                  >
                    <pre>{`{
  "event": "order.created",
  "data": {
    "amount": 1000,
    "currency": "usd",`}</pre>
                    <motion.div 
                      className={`px-1 rounded -mx-1 ${phase === 'analyzing' || phase === 'healing' ? 'bg-red-500/20 text-red-400' : 'text-white/80'}`}
                    >
                      {`    "transaction_id": "ord_8842"`}
                    </motion.div>
                    <pre>{`  }
}`}</pre>
                    {(phase === 'analyzing' || phase === 'healing') && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                      >
                        <AlertTriangle size={10} /> DRIFT DETECTED
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Center: AWS Engine */}
            <div className="z-10 w-1/3 flex flex-col items-center justify-center relative">
              {/* Animated connection lines */}
              <div className="absolute top-1/2 left-[-100%] right-[100%] h-[2px] bg-gradient-to-r from-transparent via-[var(--glow-pink)] to-transparent z-[-1] opacity-50" />
              <div className="absolute top-1/2 left-[100%] right-[-100%] h-[2px] bg-gradient-to-r from-transparent via-[var(--glow-blue)] to-transparent z-[-1] opacity-50" />

              <motion.div 
                animate={{ 
                  boxShadow: phase === 'analyzing' ? '0 0 50px rgba(255,42,133,0.4)' : 
                             phase === 'healing' ? '0 0 50px rgba(139,45,250,0.6)' : 
                             '0 0 20px rgba(255,255,255,0.05)',
                  borderColor: phase === 'analyzing' ? 'rgba(255,42,133,0.5)' :
                               phase === 'healing' ? 'rgba(139,45,250,0.5)' :
                               'rgba(255,255,255,0.1)'
                }}
                className="w-32 h-32 rounded-full bg-black/80 backdrop-blur-xl border-2 flex items-center justify-center relative transition-all duration-500 z-10"
              >
                <Database size={40} className={phase === 'analyzing' ? 'text-[var(--glow-pink)]' : phase === 'healing' ? 'text-[var(--glow-purple)]' : 'text-white/20'} />
                
                <AnimatePresence>
                  {phase === 'analyzing' && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute -bottom-12 whitespace-nowrap text-center"
                    >
                      <div className="text-[10px] font-mono text-[var(--glow-pink)] uppercase tracking-widest glow-text">pgvector query</div>
                      <div className="text-xs text-white">Cosine Dist: <strong className="text-[var(--glow-pink)]">0.1588</strong></div>
                    </motion.div>
                  )}
                  {phase === 'healing' && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute -bottom-12 whitespace-nowrap text-center flex items-center gap-2"
                    >
                      <span className="spin inline-block w-3 h-3 border-2 border-[var(--glow-purple)] border-t-transparent rounded-full" />
                      <div className="text-[10px] font-mono text-[var(--glow-purple)] uppercase tracking-widest glow-text">Executing VM Transformer</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="mt-6 text-center">
                <h3 className="font-display text-xl tracking-wider">AWS Aurora Serverless</h3>
                <p className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-widest mt-1">Data Immune Engine</p>
              </div>
            </div>

            {/* Right: Healed Payload */}
            <div className="z-10 w-1/3 relative">
              <div className="mb-4 flex items-center justify-end gap-2 text-[var(--text-secondary)] font-mono text-sm uppercase tracking-widest text-right">
                Destination: Stripe <ArrowRight size={14} />
              </div>
              <AnimatePresence>
                {phase === 'healed' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-black/60 border border-[var(--glow-blue)]/30 rounded-2xl p-4 font-mono text-xs text-white/80 shadow-[0_0_30px_rgba(0,225,255,0.1)] relative"
                  >
                    <pre>{`{
  "event": "order.created",
  "data": {
    "amount": 1000,
    "currency": "usd",`}</pre>
                    <motion.div 
                      initial={{ backgroundColor: 'rgba(0,225,255,0.2)' }}
                      animate={{ backgroundColor: 'transparent' }}
                      transition={{ duration: 1.5 }}
                      className="text-[var(--glow-blue)] px-1 rounded -mx-1"
                    >
                      {`    "order_id": "ord_8842"`}
                    </motion.div>
                    <pre>{`  }
}`}</pre>
                    <div className="absolute -top-3 -right-3 bg-[var(--glow-blue)] text-black text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-[0_0_10px_var(--glow-blue)]">
                      <CheckCircle2 size={10} /> HEALED
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* LOWER SECTION: TECHNICAL DETAILS (For those who still want to see the code) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-80">
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[var(--glow-purple)]" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]">Active Transformer Script</h3>
                </div>
                <div className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded">Node.js V8 Sandbox</div>
              </div>
              <pre className="p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-[12px] text-white/70 overflow-x-auto">
{`// Fetched from AWS Aurora pgvector index mapping
export default function transform(payload) {
  if (payload.data.transaction_id) {
    // Heal schema drift automatically
    payload.data.order_id = payload.data.transaction_id;
    delete payload.data.transaction_id;
  }
  return payload;
}`}
              </pre>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div className="flex items-center gap-2 mb-6">
                <Database size={16} className="text-[var(--glow-pink)]" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]">AWS pgvector Analytics</h3>
              </div>
              <div className="space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-sm text-white/60">Semantic Embedding Model</span>
                  <span className="text-sm font-mono text-white">text-embedding-3-small</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-sm text-white/60">Historical Schema Norms</span>
                  <span className="text-sm font-mono text-white">14,892 verified payloads</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-sm text-white/60">Drift Threshold (Cosine Dist)</span>
                  <span className="text-sm font-mono text-white">0.0500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Avg Sandbox Execution Time</span>
                  <span className="text-sm font-mono text-[var(--glow-blue)] glow-text">24ms</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      
      <Footer />
    </div>
  );
}
