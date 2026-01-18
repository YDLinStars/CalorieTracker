import React from 'react';

export const Profile: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Header */}
        <header className="flex items-center justify-between px-6 pt-6 pb-6">
            <div className="flex items-center gap-4">
            <div className="relative">
                <div className="w-16 h-16 rounded-full bg-stone-200 bg-cover bg-center shadow-inner border-2 border-white dark:border-stone-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA25EsBoUooM-gzcseS-MDDxZfsxY0nqrRN0Cw3AzD_9n0IryJTrhZ8FDGDpSOqP2z0iGD8eXF1WisCULi5m7fr8UDt66ecT5NsW4cLf5uHKMYFFPs5a6ZeRwCwCv70CwRJzPEoBpmC_cFltej0i8HWX6e7AkAlt6dIwey73ED1v0PSSdVASTsC070agI4cPvyNo8WMDIfLc0-SQS490GEg8NFmYcQTzBgwCMcqK9V9yC24cjROfkNlD_k0v5Drau9g241x53-FHfAu')" }}></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary border-2 border-background-light dark:border-background-dark rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[10px] text-white">check</span>
                </div>
            </div>
            <div className="flex flex-col">
                <h1 className="text-xl font-bold text-stone-900 dark:text-white leading-tight">Hello, Alex</h1>
                <p className="text-stone-500 dark:text-stone-400 text-sm font-medium">Keep up the good work!</p>
            </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-white dark:bg-stone-800 shadow-card flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors">
            <span className="material-symbols-outlined text-xl">edit</span>
            </button>
        </header>

        {/* Calendar Widget */}
        <section className="px-6 mb-8">
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
                <button className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full text-stone-400 transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <h2 className="text-base font-bold text-stone-900 dark:text-white">September 2023</h2>
                <button className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full text-stone-400 transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
            
            <div className="grid grid-cols-7 mb-2">
                {['S','M','T','W','T','F','S'].map((d,i) => (
                    <div key={i} className="text-center text-xs font-bold text-stone-400 uppercase tracking-wide">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1">
                <div></div><div></div><div></div><div></div>
                {[1,2,4,5,7,8,9,11].map(d => (
                    <button key={d} className="h-10 w-full flex flex-col items-center justify-center rounded-full">
                        <span className="text-sm font-medium text-stone-600 dark:text-stone-300">{d}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1"></span>
                    </button>
                ))}
                {[3,6,10].map(d => (
                    <button key={d} className="h-10 w-full flex flex-col items-center justify-center rounded-full">
                        <span className="text-sm font-medium text-stone-600 dark:text-stone-300">{d}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1"></span>
                    </button>
                ))}
                
                {/* Today */}
                <button className="h-10 w-full flex flex-col items-center justify-center rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-md transform scale-105 transition-transform">
                    <span className="text-sm font-bold">12</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1"></span>
                </button>

                {[13,14,15,16,17,18,19,20].map(d => (
                    <button key={d} className="h-10 w-full flex flex-col items-center justify-center rounded-full">
                        <span className="text-sm font-medium text-stone-400 dark:text-stone-500">{d}</span>
                    </button>
                ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-xs font-medium text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Goal Met</span>
                </div>
                <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span>Missed</span>
                </div>
            </div>
            </div>
        </section>

        {/* Stats */}
        <section className="px-6 mb-8">
            <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-4">Daily Insights</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 shadow-soft flex flex-col justify-between h-36">
                    <div className="flex items-start justify-between">
                    <div className="p-2 bg-stone-50 dark:bg-stone-800 rounded-lg text-primary">
                        <span className="material-symbols-outlined text-xl">monitor_weight</span>
                    </div>
                    <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-[14px] mr-0.5">trending_down</span>
                        1.2kg
                    </span>
                    </div>
                    <div>
                    <p className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-0.5">Current Weight</p>
                    <p className="text-2xl font-bold text-stone-900 dark:text-white">68 <span className="text-sm font-normal text-stone-400">kg</span></p>
                    </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 shadow-soft flex flex-col justify-between h-36">
                    <div className="flex items-start justify-between">
                    <div className="p-2 bg-stone-50 dark:bg-stone-800 rounded-lg text-orange-400">
                        <span className="material-symbols-outlined text-xl">local_fire_department</span>
                    </div>
                    </div>
                    <div>
                    <p className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-0.5">Avg. Intake</p>
                    <p className="text-2xl font-bold text-stone-900 dark:text-white">1,850 <span className="text-sm font-normal text-stone-400">kcal</span></p>
                    </div>
                </div>

                <div className="col-span-2 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-5 shadow-sm border border-primary/20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm rounded-full text-amber-500 shadow-sm">
                        <span className="material-symbols-outlined">emoji_events</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-primary-content dark:text-stone-200">Goal Streak</p>
                        <p className="text-2xl font-bold text-stone-900 dark:text-white leading-none mt-1">12 <span className="text-base font-normal text-stone-500 dark:text-stone-400">Days</span></p>
                    </div>
                    </div>
                    <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-primary-content bg-white/60 dark:bg-white/10 px-2 py-1 rounded-full">+1 Day today</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Menu */}
        <section className="px-6 space-y-3">
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-soft">
                {['Settings', 'Help & Support'].map((item) => (
                    <div key={item}>
                         <button className="w-full flex items-center gap-4 p-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 group-hover:bg-white dark:group-hover:bg-stone-700 transition-colors">
                            <span className="material-symbols-outlined">{item === 'Settings' ? 'settings' : 'help'}</span>
                            </div>
                            <span className="flex-1 text-left text-base font-medium text-stone-900 dark:text-white">{item}</span>
                            <span className="material-symbols-outlined text-stone-400">chevron_right</span>
                        </button>
                        <div className="h-px bg-stone-100 dark:bg-stone-800 mx-16"></div>
                    </div>
                ))}
               
                <button className="w-full flex items-center gap-4 p-4 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 group-hover:bg-white dark:group-hover:bg-red-900/30 transition-colors">
                    <span className="material-symbols-outlined">logout</span>
                    </div>
                    <span className="flex-1 text-left text-base font-medium text-stone-900 dark:text-white">Log Out</span>
                </button>
            </div>
            <p className="text-center text-xs text-stone-400 dark:text-stone-600 pt-4">Version 2.0.4 • Build 1892</p>
        </section>
    </div>
  );
};
