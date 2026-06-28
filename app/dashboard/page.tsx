'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Header, Footer } from '@/components/SunderSite';
import { Database, Activity, ShieldAlert, ArrowRight } from 'lucide-react';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as any } }
};

export default function DashboardPage() {
  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <section className="hero-section flex-grow" style={{ minHeight: '100vh', paddingTop: '8rem', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="ambient-glow-pink" style={{ top: '0', right: '0' }}></div>
        <div className="ambient-glow-purple" style={{ bottom: '0', left: '0' }}></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}
        >
          <motion.div variants={fadeUpVariant} className="flex items-start justify-between mb-10">
            <div>
              <h2 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Infrastructure</h2>
              <div className="glass-panel p-6 max-w-[800px] border-l-4 border-l-[var(--glow-pink)]">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <ShieldAlert size={18} className="text-[var(--glow-pink)]" />
                  What is Sunder doing?
                </h3>
                <p className="text-[var(--text-secondary)] text-[1.1rem] leading-relaxed">
                  Sunder is a real-time <strong className="text-white">Data Immune System</strong>. It acts as a reverse proxy for your API webhooks. 
                  When upstream providers (like Shopify) silently change their JSON schemas, Sunder intercepts the corrupted payload. 
                  It detects the schema drift using <strong className="text-white glow-text">AWS Aurora pgvector</strong>, and autonomously heals the data using Node VMs <em>before</em> it reaches your backend.
                </p>
              </div>
            </div>
            <div className="text-right mt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-mono">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                System Healthy
              </div>
            </div>
          </motion.div>

          {/* Metrics Row */}
          <motion.div variants={fadeUpVariant} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Total Payloads (24h)', value: '1.24M', icon: Database, color: 'var(--glow-blue)' },
              { label: 'Drifts Intercepted', value: '842', icon: ShieldAlert, color: 'var(--glow-pink)' },
              { label: 'Avg. Healing Time', value: '112ms', icon: Activity, color: 'var(--glow-purple)' }
            ].map((metric, i) => (
              <div key={i} className="glass-panel" style={{ padding: '2rem' }}>
                <div className="flex items-center gap-3 mb-4 text-[var(--text-secondary)]">
                  <metric.icon size={18} style={{ color: metric.color }} />
                  <span className="font-medium text-sm tracking-wide uppercase">{metric.label}</span>
                </div>
                <div className="text-4xl font-bold font-mono text-white glow-text">{metric.value}</div>
              </div>
            ))}
          </motion.div>
          
          <motion.h3 variants={fadeUpVariant} className="text-2xl font-bold mb-6 font-display tracking-wider">ACTIVE PIPELINES</motion.h3>

          {/* Pipelines Grid */}
          <motion.div variants={fadeUpVariant} className="grid grid-cols-1 gap-4">
            <Link href="/pipeline/shopify" className="group">
              <div className="glass-panel transition-all duration-300 hover:bg-white/5 border border-white/5 hover:border-[var(--glow-blue)]/50" style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Database size={20} className="text-[var(--glow-blue)]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Shopify Orders → Stripe</h4>
                    <p className="text-sm font-mono text-[var(--text-secondary)]">pipeline://shopify_orders/webhook</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-10">
                  <div className="hidden md:block">
                    {/* Fake mini sparkline */}
                    <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 15 Q 10 5, 20 20 T 40 10 T 60 25 T 80 5 T 100 15 T 120 10" stroke="var(--glow-blue)" strokeWidth="2" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px var(--glow-blue))' }}/>
                    </svg>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">Active</div>
                    <div className="text-xs text-[var(--text-secondary)] font-mono">142 req/s</div>
                  </div>
                  <ArrowRight className="text-[var(--text-secondary)] group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>

            <div className="glass-panel opacity-60" style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Database size={20} className="text-[var(--text-secondary)]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Segment Events → Snowflake</h4>
                  <p className="text-sm font-mono text-[var(--text-secondary)]">pipeline://segment_analytics</p>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <div className="text-right">
                  <div className="text-sm font-bold text-[var(--text-secondary)]">Idle</div>
                  <div className="text-xs text-[var(--text-secondary)]/50 font-mono">0 req/s</div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </section>
      
      <Footer />
    </div>
  );
}
