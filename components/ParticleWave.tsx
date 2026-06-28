'use client';

import React, { useEffect, useRef } from 'react';

export function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, baseX: number, baseY: number, size: number }[] = [];
    let mouse = { x: -1000, y: -1000 };
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      const cols = Math.floor(canvas.width / 30);
      const rows = Math.floor(canvas.height / 30);
      
      for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
          particles.push({
            x: i * 30 + 15,
            y: j * 30 + 15,
            baseX: i * 30 + 15,
            baseY: j * 30 + 15,
            size: Math.random() * 1.5 + 0.5
          });
        }
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#E2E8F0'; // Liquid Platinum
      
      particles.forEach(p => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Gravitational lens pull effect
        if (distance < 200) {
          const force = (200 - distance) / 200;
          p.x -= dx * force * 0.05;
          p.y -= dy * force * 0.05;
        } else {
          // Return to base
          p.x += (p.baseX - p.x) * 0.05;
          p.y += (p.baseY - p.y) * 0.05;
        }
        
        // Dynamic opacity based on distance from mouse
        const alpha = distance < 300 ? 0.4 : 0.1;
        ctx.globalAlpha = alpha;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  );
}
