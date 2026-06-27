'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Header, Footer } from '@/components/SunderSite';

export default function ConfigPage() {
  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <section className="hero-section flex-grow" style={{ minHeight: '100vh', paddingTop: '8rem', paddingBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="ambient-glow-pink" style={{ top: '-10%', right: '10%' }}></div>
        <div className="ambient-glow-purple" style={{ bottom: '-10%', left: '10%' }}></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: '800px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10, textAlign: 'center' }}
        >
          <h2 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>AWS Configuration</h2>
          <p className="hero-subtitle" style={{ margin: '0 auto 3rem auto' }}>Manage your Aurora Serverless v2 instances and pgvector indices.</p>
          
          <div className="glass-panel" style={{ textAlign: 'left', padding: '3rem' }}>
            <h3 className="gradient-text" style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Database Status</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00e1ff', boxShadow: '0 0 10px #00e1ff' }}></div>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>sunder-aurora-cluster-1 (Available)</span>
            </div>
            
            <h3 className="gradient-text" style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>pgvector Indexing</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00e1ff', boxShadow: '0 0 10px #00e1ff' }}></div>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>HNSW Index: Active • Dimension: 1536</span>
            </div>

            <button className="cta-button" style={{ marginTop: '1rem' }}>Sync Configuration</button>
          </div>
        </motion.div>
      </section>
      
      <Footer />
    </div>
  );
}
