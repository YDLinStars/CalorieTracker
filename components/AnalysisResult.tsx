import React from 'react';
import { Meal } from '../types';

interface Props {
  data: Meal | null;
  onConfirm: () => void;
  onRetake: () => void;
  loading: boolean;
}

export const AnalysisResult: React.FC<Props> = ({ data, onConfirm, onRetake, loading }) => {
  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background-light dark:bg-background-dark">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-bold text-primary">Analyzing...</h2>
            <p className="text-stone-500 text-sm mt-2">Identifying food and calculating macros</p>
        </div>
    )
  }

  if (!data) return null;

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Top App Bar */}
      <div className="flex items-center justify-between p-6 z-10">
        <button onClick={onRetake} className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-surface-dark shadow-sm hover:bg-slate-50 transition-colors text-slate-900 dark:text-white">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-white opacity-90">Analysis Result</h2>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-surface-dark shadow-sm hover:bg-slate-50 transition-colors text-slate-900 dark:text-white">
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-28">
        {/* Food Image */}
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-soft group">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
            style={{ backgroundImage: `url('${data.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-green-600 text-[16px]">auto_awesome</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">AI Detected</span>
          </div>
        </div>

        {/* Title & Cals */}
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold leading-tight text-slate-900 dark:text-white">{data.name}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{data.type} • {data.time}</p>
          <div className="flex items-baseline justify-center gap-1 mt-5">
            <span className="text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">{data.calories}</span>
            <span className="text-xl font-medium text-slate-400 dark:text-slate-500">kcal</span>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-8 bg-surface-light dark:bg-surface-dark rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-white/5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-6">Macronutrients</h3>
          <div className="flex flex-col items-center">
            <div className="relative h-48 w-48">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100 dark:text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
                {/* Protein */}
                <path className="text-primary drop-shadow-sm" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="30, 100" strokeLinecap="round" strokeWidth="3.5" />
                {/* Carbs */}
                <path className="text-secondary dark:text-[#d4cfa3] drop-shadow-sm" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="45, 100" strokeDashoffset="-35" strokeLinecap="round" strokeWidth="3.5" />
                {/* Fat */}
                <path className="text-accent-fat drop-shadow-sm" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="20, 100" strokeDashoffset="-85" strokeLinecap="round" strokeWidth="3.5" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Balance</span>
                <span className="text-lg font-bold text-slate-800 dark:text-slate-200">Good</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full mt-8">
               <div className="flex flex-col items-center p-3 rounded-2xl bg-secondary/50 dark:bg-secondary-dark/10 border border-secondary dark:border-secondary/20">
                 <div className="h-2 w-2 rounded-full bg-[#e8d575] mb-2"></div>
                 <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Carbs</span>
                 <span className="text-lg font-bold text-slate-800 dark:text-slate-100">{data.macros?.carbs}g</span>
                 <span className="text-[10px] text-slate-400 mt-0.5">43%</span>
               </div>
               <div className="flex flex-col items-center p-3 rounded-2xl bg-primary/20 dark:bg-primary/10 border border-primary/30 dark:border-primary/20">
                 <div className="h-2 w-2 rounded-full bg-primary mb-2"></div>
                 <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Protein</span>
                 <span className="text-lg font-bold text-slate-800 dark:text-slate-100">{data.macros?.protein}g</span>
                 <span className="text-[10px] text-slate-400 mt-0.5">28%</span>
               </div>
               <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                 <div className="h-2 w-2 rounded-full bg-accent-fat mb-2"></div>
                 <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Fat</span>
                 <span className="text-lg font-bold text-slate-800 dark:text-slate-100">{data.macros?.fat}g</span>
                 <span className="text-[10px] text-slate-400 mt-0.5">29%</span>
               </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
          <span className="material-symbols-outlined text-blue-500 dark:text-blue-400 mt-0.5 text-[20px]">info</span>
          <div>
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-0.5">High Protein Content</p>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/70 leading-relaxed">This meal covers 30% of your daily protein goal. Great job!</p>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-12">
        <button onClick={onConfirm} className="w-full h-14 bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 text-white dark:text-slate-900 font-bold text-lg">
          <span>Confirm Meal</span>
          <span className="material-symbols-outlined">check_circle</span>
        </button>
      </div>
    </div>
  );
};
