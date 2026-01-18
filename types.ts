export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  id: string;
  name: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  time: string;
  calories: number;
  image: string;
  macros?: Macros;
}

export interface UserStats {
  caloriesLeft: number;
  caloriesGoal: number;
  macrosConsumed: Macros;
  macrosGoal: Macros;
}

export enum AppScreen {
  SPLASH = 'SPLASH',
  DASHBOARD = 'DASHBOARD',
  CAMERA = 'CAMERA',
  ANALYSIS = 'ANALYSIS',
  PROFILE = 'PROFILE'
}
