'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500); // Wait for the intro animation to finish
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--color-obsidian)] overflow-hidden"
          >
            {/* Liquid Chrome Split-Text Reveal */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "120%", opacity: 0, rotateX: -45 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter uppercase liquid-chrome perspective-[1000px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                Welcome, Hillaryy
              </motion.h1>
            </div>
            
            {/* Morphing chrome pool underneath */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 0], opacity: [0, 0.2, 0] }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[color:var(--color-platinum)] rounded-full blur-[80px]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Parallax Snap */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotateX: 10, y: 100 }}
        animate={showSplash ? { opacity: 0, scale: 0.95, rotateX: 10, y: 100 } : { opacity: 1, scale: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: showSplash ? 0 : 0.2 }}
        className="perspective-[2000px] transform-gpu"
      >
        {children}
      </motion.div>
    </>
  );
}
