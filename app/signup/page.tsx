'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(0,225,255,0.15)] via-background to-background pointer-events-none" />
      
      <Link href="/" className="absolute top-8 left-8 font-display text-xl font-bold tracking-widest text-foreground hover:opacity-80 transition-opacity z-10">
        SUNDER
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 md:p-12 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-xl relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-medium text-foreground mb-2">Start Healing</h1>
          <p className="text-muted-foreground text-sm">Create an account to protect your data</p>
        </div>

        <button className="w-full mb-6 bg-card border border-border text-foreground py-3 rounded-xl font-medium hover:bg-muted transition-all flex justify-center items-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="h-px bg-border flex-1" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest">OR EMAIL</span>
          <div className="h-px bg-border flex-1" />
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">First Name</label>
              <input 
                type="text" 
                placeholder="Jane" 
                className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Last Name</label>
              <input 
                type="text" 
                placeholder="Doe" 
                className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Work Email</label>
            <input 
              type="email" 
              placeholder="engineer@company.com" 
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
            />
          </div>

          <button className="w-full mt-6 bg-foreground text-background py-3 rounded-xl font-medium hover:bg-foreground/90 transition-all flex justify-center items-center gap-2 group">
            Create Account
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Already have an account? <Link href="/login" className="text-foreground hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
