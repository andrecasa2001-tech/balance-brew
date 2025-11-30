import { Drink } from './drinkDatabase';

export interface DrinkEntry {
  id: string;
  drinkId: string;
  drinkName: string;
  volumeMl: number;
  abv: number;
  units: number;
  date: string; // ISO date string
  timestamp: number;
}

export interface WaterEntry {
  id: string;
  amount: number;
  date: string; // ISO date string
  timestamp: number;
}

export interface Biometrics {
  weight: number; // kg
  height: number; // cm
  sex: 'male' | 'female' | 'other';
}

export interface Settings {
  waterPerDrinkMl: number; // default 250ml
  biometrics?: Biometrics;
}

const DRINKS_KEY = 'hydration-tracker-drinks';
const WATER_KEY = 'hydration-tracker-water';
const CUSTOM_DRINKS_KEY = 'hydration-tracker-custom-drinks';
const SETTINGS_KEY = 'hydration-tracker-settings';

// Drink entries
export const saveDrinkEntry = (entry: DrinkEntry): void => {
  const entries = getDrinkEntries();
  entries.push(entry);
  localStorage.setItem(DRINKS_KEY, JSON.stringify(entries));
};

export const getDrinkEntries = (): DrinkEntry[] => {
  const stored = localStorage.getItem(DRINKS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const deleteDrinkEntry = (id: string): void => {
  const entries = getDrinkEntries().filter(e => e.id !== id);
  localStorage.setItem(DRINKS_KEY, JSON.stringify(entries));
};

// Water entries
export const saveWaterEntry = (entry: WaterEntry): void => {
  const entries = getWaterEntries();
  entries.push(entry);
  localStorage.setItem(WATER_KEY, JSON.stringify(entries));
};

export const getWaterEntries = (): WaterEntry[] => {
  const stored = localStorage.getItem(WATER_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const deleteWaterEntry = (id: string): void => {
  const entries = getWaterEntries().filter(e => e.id !== id);
  localStorage.setItem(WATER_KEY, JSON.stringify(entries));
};

export const updateDailyWater = (date: string, totalAmount: number): void => {
  const entries = getWaterEntries();
  // Remove all entries for this date
  const filtered = entries.filter(e => e.date !== date);
  // Add new entry
  filtered.push({
    id: `water-${date}-${Date.now()}`,
    amount: totalAmount,
    date,
    timestamp: Date.now(),
  });
  localStorage.setItem(WATER_KEY, JSON.stringify(filtered));
};

// Custom drinks
export const saveCustomDrink = (drink: Drink): void => {
  const drinks = getCustomDrinks();
  drinks.push(drink);
  localStorage.setItem(CUSTOM_DRINKS_KEY, JSON.stringify(drinks));
};

export const getCustomDrinks = (): Drink[] => {
  const stored = localStorage.getItem(CUSTOM_DRINKS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const deleteCustomDrink = (id: string): void => {
  const drinks = getCustomDrinks().filter(d => d.id !== id);
  localStorage.setItem(CUSTOM_DRINKS_KEY, JSON.stringify(drinks));
};

// Settings
export const saveSettings = (settings: Settings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const getSettings = (): Settings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored ? JSON.parse(stored) : { waterPerDrinkMl: 250 };
};
