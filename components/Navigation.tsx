import React from 'react';
import { AppScreen } from '../types';

interface Props {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export const Navigation: React.FC<Props> = ({ currentScreen, onNavigate }) => {
  if (currentScreen === AppScreen.CAMERA || currentScreen === AppScreen.SPLASH || currentScreen === AppScreen.ANALYSIS) {
    return null;
  }

  const isActive = (screen: AppScreen) => currentScreen === screen;

  return (
    <div className="absolute bottom-6 left-6 right-6 h-[72px] bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-between px-2 z-40">
      {/* Left Nav */}
      <div className="flex flex-1 justify-around pl-2">
        <button 
            onClick={() => onNavigate(AppScreen.DASHBOARD)}
            className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${isActive(AppScreen.DASHBOARD) ? 'text-primary' : 'text-slate-300 hover:text-slate-500'}`}
        >
          <span className={`material-symbols-outlined text-[28px] ${isActive(AppScreen.DASHBOARD) ? 'filled' : ''}`}>home</span>
        </button>
        <button className="flex flex-col items-center justify-center w-12 h-12 text-slate-300 hover:text-slate-500 transition-colors">
          <span className="material-symbols-outlined text-[28px]">book_2</span>
        </button>
      </div>

      {/* Center FAB (Floating) */}
      <div className="relative w-20 -mt-[60px] flex justify-center pointer-events-none">
        <div className="pointer-events-auto h-20 w-20 bg-background-light dark:bg-background-dark rounded-full flex items-center justify-center p-2 shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.05)] dark:shadow-none">
          <button 
            onClick={() => onNavigate(AppScreen.CAMERA)}
            className="group h-full w-full rounded-full bg-primary hover:bg-[#9cb08f] flex items-center justify-center text-white shadow-glow transition-all active:scale-90 hover:rotate-90 duration-500"
          >
            <span className="material-symbols-outlined text-[36px] group-hover:scale-110 transition-transform">photo_camera</span>
          </button>
        </div>
      </div>

      {/* Right Nav */}
      <div className="flex flex-1 justify-around pr-2">
        <button className="flex flex-col items-center justify-center w-12 h-12 text-slate-300 hover:text-slate-500 transition-colors">
          <span className="material-symbols-outlined text-[28px]">donut_large</span>
        </button>
        <button 
            onClick={() => onNavigate(AppScreen.PROFILE)}
            className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${isActive(AppScreen.PROFILE) ? 'text-primary' : 'text-slate-300 hover:text-slate-500'}`}
        >
          <span className={`material-symbols-outlined text-[28px] ${isActive(AppScreen.PROFILE) ? 'filled' : ''}`}>person</span>
        </button>
      </div>
    </div>
  );
};
