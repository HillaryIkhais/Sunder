'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, XCircle, Database, Sparkles, Check, AlertTriangle } from 'lucide-react';
import SunderCore3D from './SunderCore3D';

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

/* ── Drift Demo ─────────────────────────────────────────────────────── */
// The DriftDemo terminal has been removed from the landing page.
// The user flow now correctly routes users to the /dashboard and visual payload healer.

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

/* ── Components from Vite Layout ────────────────────────────────────────── */

import Link from 'next/link';
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';

export const Header = () => {
  return (
    <motion.header 
      className="header-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="logo">SUNDER</div>
      <nav className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/config">Settings</Link>
      </nav>
      <div className="flex items-center gap-6">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="hidden md:block text-[0.75rem] font-semibold tracking-widest uppercase text-white/60 hover:text-white transition-colors">
              Login
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="cta-button">Sign Up</button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8 rounded-md border border-white/20" } }} />
        </Show>
      </div>
    </motion.header>
  );
};

export const Hero = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 150]); // Very subtle background parallax

  return (
    <section className="hero-section" id="home" style={{ position: 'relative' }}>
      <motion.img 
        src="/hero-bg.png" 
        alt="Abstract Fluid Background" 
        className="hero-bg" 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ y: yBg }}
      />
      <div className="hero-overlay"></div>
      
      <div className="relative z-10 w-full max-w-[1000px] mx-auto mt-20 text-center flex flex-col items-center justify-center">
        <motion.div 
          className="hero-content mt-0 pointer-events-auto flex flex-col items-center text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2.5 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--glow-pink)] shadow-[0_0_10px_var(--glow-pink)] pulse-dot" />
            <span className="text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest">
              Data Immune System · AWS Aurora
            </span>
          </motion.div>

          <motion.h1 variants={fadeUpVariant} className="hero-title glow-text" style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            SUNDER
          </motion.h1>
          <motion.p variants={fadeUpVariant} className="hero-subtitle text-[1.2rem] max-w-[800px] mx-auto mb-10">
            Sunder intercepts incoming JSON payloads, runs real-time schema drift analysis using <strong className="text-white glow-text">AWS Aurora PostgreSQL pgvector</strong>, and auto-applies Node VM patches—before a single bad payload crashes your downstream services.
          </motion.p>
          
          <motion.div variants={fadeUpVariant}>
            <Link href="/dashboard">
              <button className="cta-button" style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: 'fit-content' }}>
                <span>Enter Dashboard</span>
                <motion.div 
                  animate={{ x: [0, 5, 0] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  →
                </motion.div>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const AboutSection = () => {
  return (
    <section className="about-section" id="about" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center w-full max-w-[1400px] mx-auto">
        
        {/* LEFT COLUMN: 3D Infrastructure Wireframe */}
        <div className="hidden lg:block relative z-20 w-full h-[600px] pointer-events-none">
          <SunderCore3D />
        </div>

        {/* RIGHT COLUMN: Infrastructure Text */}
        <motion.div 
          className="flex flex-col items-start text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUpVariant} className="hero-title" style={{ opacity: 0.1, fontSize: 'clamp(4rem, 6vw, 6rem)', textAlign: 'left', marginBottom: '1rem', wordBreak: 'break-word' }}>INFRASTRUCTURE</motion.h2>
          <motion.h4 variants={fadeUpVariant} style={{ textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: 'var(--glow-cyan)' }}>Data Immunity</motion.h4>
          <motion.p variants={fadeUpVariant} style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            Providing comprehensive real-time data interception and healing tailored to the unique needs of modern pipelines.
          </motion.p>
          <motion.p variants={fadeUpVariant} style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontWeight: 300, fontSize: '0.9rem' }}>
            Sunder acts as a reverse proxy for your webhooks. It evaluates incoming data against historical patterns in AWS Aurora Serverless v2, and heals breaking changes on the fly. Downstream services never see the drift.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export const ServicesSection = () => {
  const { scrollY } = useScroll();
  const yPinkGlow = useTransform(scrollY, [0, 2000], [0, -400]);
  const yPurpleGlow = useTransform(scrollY, [0, 2000], [0, -200]);

  const services = [
    { title: "Real-time Interception", desc: "We sit directly in the pipeline, catching corrupted payloads the millisecond they arrive." },
    { title: "Autonomous Healing", desc: "Data isn't just blocked; it's dynamically restructured into the correct schema using Node VMs." },
    { title: "AWS Native Integration", desc: "Built on AWS Aurora Serverless v2 and pgvector for infinite scaling and precision." }
  ];

  return (
    <section className="about-section" id="services" style={{ paddingTop: '4rem', position: 'relative' }}>
      <motion.div className="ambient-glow-pink" style={{ y: yPinkGlow, opacity: 0.6 }}></motion.div>
      <motion.div className="ambient-glow-purple" style={{ y: yPurpleGlow, opacity: 0.6 }}></motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto' }}
      >
        <motion.h2 variants={fadeUpVariant} className="hero-title" style={{ opacity: 0.2, fontSize: '6rem', textAlign: 'left' }}>SERVICES</motion.h2>
        
        <div className="about-grid">
          {services.map((service, idx) => (
            <motion.div key={idx} variants={fadeUpVariant} className="glass-panel about-card" whileHover={{ y: -10, transition: { duration: 0.3 } }}>
              <h3 className="gradient-text">{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export const Footer = () => {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div>© 2026 Sunder Labs, Inc. All rights reserved.</div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="#terms">Terms of Service</Link>
      </div>
    </motion.footer>
  );
};

export default function SunderPage() {
  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Header />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <Footer />
    </div>
  );
}
