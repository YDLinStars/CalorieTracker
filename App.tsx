import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Dashboard } from './components/Dashboard';
import { CameraView } from './components/CameraView';
import { AnalysisResult } from './components/AnalysisResult';
import { Profile } from './components/Profile';
import { Navigation } from './components/Navigation';
import { AppScreen, Meal, UserStats } from './types';
import { analyzeFoodImage } from './services/geminiService';

const INITIAL_STATS: UserStats = {
  caloriesLeft: 1250,
  caloriesGoal: 2100,
  macrosConsumed: {
    carbs: 120,
    protein: 95,
    fat: 40
  },
  macrosGoal: {
    carbs: 250,
    protein: 160,
    fat: 70
  }
};

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [userStats, setUserStats] = useState<UserStats>(INITIAL_STATS);
  const [analyzedMeal, setAnalyzedMeal] = useState<Meal | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCapture = async (imageSrc: string) => {
    setScreen(AppScreen.ANALYSIS);
    setIsAnalyzing(true);
    
    // Call Gemini API (or mock)
    const result = await analyzeFoodImage(imageSrc);
    
    setAnalyzedMeal(result);
    setIsAnalyzing(false);
  };

  const handleConfirmMeal = () => {
    if (analyzedMeal) {
      // Update stats based on the meal
      setUserStats(prev => ({
        ...prev,
        caloriesLeft: prev.caloriesLeft - analyzedMeal.calories,
        macrosConsumed: {
          carbs: prev.macrosConsumed.carbs + (analyzedMeal.macros?.carbs || 0),
          protein: prev.macrosConsumed.protein + (analyzedMeal.macros?.protein || 0),
          fat: prev.macrosConsumed.fat + (analyzedMeal.macros?.fat || 0)
        }
      }));
    }
    setScreen(AppScreen.DASHBOARD);
    setAnalyzedMeal(null);
  };

  return (
    <div className="flex justify-center min-h-screen bg-stone-100 dark:bg-black">
        {/* Mobile Frame Constraint */}
        <div className="relative w-full max-w-[420px] bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden flex flex-col h-[100dvh] sm:h-[95vh] sm:my-auto sm:rounded-[3rem] border-x border-slate-200/50 dark:border-slate-800">
            
            {screen === AppScreen.SPLASH && (
                <SplashScreen onComplete={() => setScreen(AppScreen.DASHBOARD)} />
            )}

            {screen === AppScreen.DASHBOARD && (
                <>
                    <header className="flex items-center justify-between px-6 pt-14 pb-4 bg-background-light dark:bg-background-dark z-20 sticky top-0">
                        <div className="flex items-center gap-3">
                            <div className="relative group cursor-pointer" onClick={() => setScreen(AppScreen.PROFILE)}>
                                <div className="h-11 w-11 rounded-full p-0.5 border-2 border-primary/30">
                                    <img className="h-full w-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_Z-_ORnsnBjd69WqOKoUqm9WewXDqW9eJvVg2VJacpd2r4iJ8wrYzKxwt_cLsEmW5mSD7dhb5fCzSK8j1AH3saxQYr42s5OOTkKwlBOuNK98ObZTN0PNAnvREAd8PEMgsXuqeY76FSIyUdsAjOglL-LQ_eHpxM3cUoOXdvV4qVxBDZ71towLgMgkg7CRSK8_6SZ_wAzCKoltYsD3PDsjArenjpyaNoOHNBGtxF5FwM_Yzxa1qsapE1k48mXDxHpPJc1Uesj08xFqC" alt="Profile" />
                                </div>
                                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white dark:border-background-dark rounded-full"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Today</span>
                                <h2 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">Hello, Alex</h2>
                            </div>
                        </div>
                        <button className="h-11 w-11 flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-800 text-slate-800 dark:text-white hover:bg-stone-100 transition-colors shadow-sm">
                            <span className="material-symbols-outlined filled">calendar_today</span>
                        </button>
                    </header>
                    <Dashboard userStats={userStats} onOpenProfile={() => setScreen(AppScreen.PROFILE)} />
                </>
            )}

            {screen === AppScreen.CAMERA && (
                <CameraView 
                    onCapture={handleCapture} 
                    onClose={() => setScreen(AppScreen.DASHBOARD)} 
                />
            )}

            {screen === AppScreen.ANALYSIS && (
                <AnalysisResult 
                    data={analyzedMeal} 
                    loading={isAnalyzing}
                    onConfirm={handleConfirmMeal}
                    onRetake={() => setScreen(AppScreen.CAMERA)}
                />
            )}

            {screen === AppScreen.PROFILE && (
                <Profile />
            )}

            <Navigation currentScreen={screen} onNavigate={setScreen} />
        </div>
    </div>
  );
};

export default App;
