'use client';

export function DynamicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[var(--background)]">
      {/* 
        Ambient, visually pleasing mesh background.
        It uses very slow CSS animations to move two soft light orbs around the screen.
      */}
      <div 
        className="absolute w-[80vw] h-[80vw] rounded-full mix-blend-screen opacity-20 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%)',
          animation: 'floatOrb 30s ease-in-out infinite alternate',
          top: '-20%',
          left: '-10%',
        }}
      />
      <div 
        className="absolute w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-10 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, transparent 70%)',
          animation: 'floatOrb2 40s ease-in-out infinite alternate-reverse',
          bottom: '-10%',
          right: '-10%',
        }}
      />
      
      {/* Crisp grid overlay to keep it feeling like a functional tool */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_10%,transparent_100%)]" />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10%, 5%) scale(1.1); }
          100% { transform: translate(-5%, 10%) scale(0.9); }
        }
        @keyframes floatOrb2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10%, -5%) scale(1.1); }
          100% { transform: translate(5%, -10%) scale(0.9); }
        }
      `}} />
    </div>
  );
}
