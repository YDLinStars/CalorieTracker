import React, { useEffect } from 'react';

interface Props {
  onComplete: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-between py-12 bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="absolute -top-[10%] -right-[10%] w-[80vw] h-[80vw] rounded-full bg-secondary dark:bg-primary/5 blur-[80px] opacity-80 pointer-events-none mix-blend-multiply dark:mix-blend-normal animate-pulse-slow" />
      <div className="absolute top-[40%] -left-[20%] w-[60vw] h-[60vw] rounded-full bg-secondary dark:bg-primary/5 blur-[60px] opacity-60 pointer-events-none mix-blend-multiply dark:mix-blend-normal" />

      <div className="flex-none h-16" />

      {/* Brand Container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full max-w-sm px-6">
        <div className="relative group">
          {/* Logo Circle */}
          <div className="w-32 h-32 bg-white dark:bg-background-dark rounded-[2rem] shadow-soft flex items-center justify-center relative z-10 border border-white/50 dark:border-stone-800 backdrop-blur-sm">
            <span className="material-symbols-outlined text-primary text-6xl relative z-10" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
              restaurant
            </span>
            <div className="absolute top-6 right-6 z-20 bg-primary/20 p-1 rounded-full backdrop-blur-md">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>
                eco
              </span>
            </div>
          </div>
          {/* Decorative Ring */}
          <div className="absolute inset-0 rounded-[2rem] border border-primary/20 rotate-6 scale-105 z-0 transition-transform duration-1000 group-hover:rotate-12" />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-primary dark:text-stone-100 drop-shadow-sm">
            NutriLens
          </h1>
          <p className="text-stone-500 dark:text-stone-400 font-medium text-base tracking-wide">
            AI Calorie Tracker
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full max-w-[200px] flex flex-col items-center gap-4 pb-8">
        <p className="text-stone-400/80 dark:text-stone-600 text-xs font-semibold tracking-[0.2em] uppercase">
          Snap. Track. Eat.
        </p>
        <div className="w-full h-1 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-[30%] rounded-full opacity-80 animate-[wiggle_1s_ease-in-out_infinite]" style={{ width: '100%', transition: 'width 2s ease-out', transformOrigin: 'left', animation: 'grow 2s ease-out' }} />
        </div>
      </div>
      <style>{`
        @keyframes grow { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>
  );
};
