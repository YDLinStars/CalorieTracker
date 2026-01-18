import React from 'react';
import { UserStats } from '../types';

interface Props {
  userStats: UserStats;
  onOpenProfile: () => void;
}

export const Dashboard: React.FC<Props> = ({ userStats, onOpenProfile }) => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32 pt-2">
      {/* Calorie Ring */}
      <div className="flex flex-col items-center justify-center py-6 mb-2">
        <div className="relative h-72 w-72 flex items-center justify-center">
          <svg className="h-full w-full circle-chart drop-shadow-sm" viewBox="0 0 36 36">
            <path
              className="text-stone-100 dark:text-zinc-800"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <defs>
              <linearGradient id="sageGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#aabe9d', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#8da180', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path
              className="circle-progress transition-all duration-1000 ease-out"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#sageGradient)"
              strokeDasharray={`${(userStats.caloriesLeft / userStats.caloriesGoal) * 100}, 100`}
              strokeLinecap="round"
              strokeWidth="2.5"
            />
            {/* Indicator Dot (Static for visual, would need trig for dynamic pos) */}
            <circle className="origin-center rotate-[234deg]" cx="18" cy="2.0845" fill="white" r="0.8" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-primary mb-2 text-3xl opacity-80">nutrition</span>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight">
              {userStats.caloriesLeft.toLocaleString()}
            </h1>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Kcal Left</p>
          </div>
        </div>
      </div>

      {/* Macro Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="flex flex-col items-center p-4 rounded-3xl bg-secondary shadow-[0_4px_20px_-8px_rgba(255,253,208,0.8)] border border-yellow-100 dark:border-transparent group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
          <p className="text-[13px] text-slate-800/60 font-semibold mb-1">Carbs</p>
          <span className="text-xl font-bold text-slate-800">{userStats.macrosConsumed.carbs}g</span>
          <div className="w-full h-1.5 bg-yellow-200/50 rounded-full mt-3 overflow-hidden">
            <div className="h-full w-[70%] bg-yellow-400 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col items-center p-4 rounded-3xl bg-surface-light dark:bg-zinc-800 border border-stone-100 dark:border-zinc-700 shadow-sm cursor-pointer hover:-translate-y-1 transition-transform duration-300">
          <p className="text-[13px] text-slate-500 font-semibold mb-1">Protein</p>
          <span className="text-xl font-bold text-slate-800 dark:text-white">{userStats.macrosConsumed.protein}g</span>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-600 rounded-full mt-3 overflow-hidden">
            <div className="h-full w-[50%] bg-blue-400 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col items-center p-4 rounded-3xl bg-surface-light dark:bg-zinc-800 border border-stone-100 dark:border-zinc-700 shadow-sm cursor-pointer hover:-translate-y-1 transition-transform duration-300">
          <p className="text-[13px] text-slate-500 font-semibold mb-1">Fat</p>
          <span className="text-xl font-bold text-slate-800 dark:text-white">{userStats.macrosConsumed.fat}g</span>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-600 rounded-full mt-3 overflow-hidden">
            <div className="h-full w-[30%] bg-orange-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Meals Section */}
      <div className="flex items-center justify-between mb-5 px-1">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Meals</h3>
        <button className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
          <span className="material-symbols-outlined text-slate-400">more_horiz</span>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Breakfast Card */}
        <div className="relative overflow-hidden p-4 bg-white dark:bg-zinc-800 rounded-[2rem] shadow-soft border border-stone-100 dark:border-zinc-700">
          <div className="flex gap-4 items-center relative z-10">
            <div className="h-20 w-20 rounded-2xl bg-stone-100 shrink-0 overflow-hidden shadow-inner">
              <div
                className="h-full w-full bg-cover bg-center transition-transform hover:scale-110 duration-500"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATG6R5wvo4MkwyYLM7ILfiPG6mUGB-mHbsdwJ6VzaIRUDMUoj9fdKqXaosG_75KOlvCWOz3D4uMHhB87FF8MtRYdjZqUmqCNlJOool2ovj-wkYjYXADEQyogR82YVsiPrLeJu_cpzveBqPKtuTY9iq9OPaATuHeJ3Bpl4mFaDw-2wbFSyORrf3gcvPUpl9ZEbcYs0OfBoPW0H_LCfVKY5ScVXqwXgnqq8eTenCzyU-0pJuvpD0FHd3jsItw4J7fooXe7pnZqsnhY8E')" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-wide">
                  Breakfast
                </span>
                <span className="text-xs font-semibold text-slate-400">08:30</span>
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-lg truncate leading-tight mb-1">
                Oatmeal & Berries
              </h4>
              <p className="text-sm text-primary font-bold flex items-center gap-1">350 kcal</p>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl z-0 pointer-events-none" />
        </div>

        {/* Empty State Cards */}
        {['Lunch', 'Dinner'].map((type) => (
          <button key={type} className="w-full group relative overflow-hidden p-4 rounded-[2rem] border-2 border-dashed border-stone-200 dark:border-zinc-700 hover:border-primary hover:bg-green-50/50 dark:hover:bg-zinc-800/80 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-2xl bg-stone-50 dark:bg-zinc-700 flex items-center justify-center text-stone-300 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-3xl">
                    {type === 'Lunch' ? 'lunch_dining' : 'dinner_dining'}
                </span>
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-bold text-stone-400 group-hover:text-primary-dark text-lg mb-1 transition-colors">{type}</h4>
                <div className="flex items-center gap-2 text-stone-400 group-hover:text-primary transition-colors">
                  <span className="text-sm font-medium">Log your meal</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-stone-100 dark:bg-zinc-700 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all text-stone-400 shadow-sm">
                <span className="material-symbols-outlined">add</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
