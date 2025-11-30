export interface Drink {
  id: string;
  name: string;
  category: 'beer' | 'wine' | 'spirit' | 'cocktail' | 'rtd' | 'custom';
  volumeMl: number;
  abv: number;
  brand?: string;
}

export const drinkDatabase: Drink[] = [
  // Beers
  { id: 'beer-heineken', name: 'Heineken', category: 'beer', volumeMl: 330, abv: 5.0, brand: 'Heineken' },
  { id: 'beer-corona', name: 'Corona Extra', category: 'beer', volumeMl: 330, abv: 4.5, brand: 'Corona' },
  { id: 'beer-guinness', name: 'Guinness Draught', category: 'beer', volumeMl: 440, abv: 4.2, brand: 'Guinness' },
  { id: 'beer-stella', name: 'Stella Artois', category: 'beer', volumeMl: 330, abv: 5.0, brand: 'Stella Artois' },
  { id: 'beer-budweiser', name: 'Budweiser', category: 'beer', volumeMl: 330, abv: 5.0, brand: 'Budweiser' },
  { id: 'beer-carlsberg', name: 'Carlsberg', category: 'beer', volumeMl: 330, abv: 5.0, brand: 'Carlsberg' },
  { id: 'beer-ipa', name: 'IPA (Average)', category: 'beer', volumeMl: 330, abv: 6.5 },
  { id: 'beer-lager', name: 'Lager (Average)', category: 'beer', volumeMl: 330, abv: 4.5 },
  { id: 'beer-pint', name: 'Pint of Beer (Average)', category: 'beer', volumeMl: 568, abv: 4.5 },
  
  // Wines
  { id: 'wine-red-glass', name: 'Red Wine (Glass)', category: 'wine', volumeMl: 175, abv: 13.5 },
  { id: 'wine-white-glass', name: 'White Wine (Glass)', category: 'wine', volumeMl: 175, abv: 12.5 },
  { id: 'wine-rose-glass', name: 'Rosé Wine (Glass)', category: 'wine', volumeMl: 175, abv: 12.0 },
  { id: 'wine-sparkling-glass', name: 'Sparkling Wine (Glass)', category: 'wine', volumeMl: 125, abv: 12.0 },
  { id: 'wine-champagne', name: 'Champagne (Glass)', category: 'wine', volumeMl: 125, abv: 12.5 },
  { id: 'wine-prosecco', name: 'Prosecco (Glass)', category: 'wine', volumeMl: 125, abv: 11.0 },
  { id: 'wine-red-bottle', name: 'Red Wine (Bottle)', category: 'wine', volumeMl: 750, abv: 13.5 },
  { id: 'wine-white-bottle', name: 'White Wine (Bottle)', category: 'wine', volumeMl: 750, abv: 12.5 },
  
  // Spirits (standard measures)
  { id: 'spirit-vodka', name: 'Vodka (Single)', category: 'spirit', volumeMl: 25, abv: 40.0 },
  { id: 'spirit-vodka-double', name: 'Vodka (Double)', category: 'spirit', volumeMl: 50, abv: 40.0 },
  { id: 'spirit-gin', name: 'Gin (Single)', category: 'spirit', volumeMl: 25, abv: 40.0 },
  { id: 'spirit-gin-double', name: 'Gin (Double)', category: 'spirit', volumeMl: 50, abv: 40.0 },
  { id: 'spirit-whisky', name: 'Whisky (Single)', category: 'spirit', volumeMl: 25, abv: 40.0 },
  { id: 'spirit-whisky-double', name: 'Whisky (Double)', category: 'spirit', volumeMl: 50, abv: 40.0 },
  { id: 'spirit-rum', name: 'Rum (Single)', category: 'spirit', volumeMl: 25, abv: 40.0 },
  { id: 'spirit-rum-double', name: 'Rum (Double)', category: 'spirit', volumeMl: 50, abv: 40.0 },
  { id: 'spirit-tequila', name: 'Tequila (Single)', category: 'spirit', volumeMl: 25, abv: 40.0 },
  { id: 'spirit-tequila-double', name: 'Tequila (Double)', category: 'spirit', volumeMl: 50, abv: 40.0 },
  
  // Cocktails
  { id: 'cocktail-mojito', name: 'Mojito', category: 'cocktail', volumeMl: 250, abv: 12.0 },
  { id: 'cocktail-margarita', name: 'Margarita', category: 'cocktail', volumeMl: 200, abv: 15.0 },
  { id: 'cocktail-martini', name: 'Martini', category: 'cocktail', volumeMl: 90, abv: 28.0 },
  { id: 'cocktail-cosmopolitan', name: 'Cosmopolitan', category: 'cocktail', volumeMl: 120, abv: 20.0 },
  { id: 'cocktail-longisland', name: 'Long Island Iced Tea', category: 'cocktail', volumeMl: 300, abv: 22.0 },
  { id: 'cocktail-pinacolada', name: 'Piña Colada', category: 'cocktail', volumeMl: 250, abv: 12.0 },
  { id: 'cocktail-daiquiri', name: 'Daiquiri', category: 'cocktail', volumeMl: 120, abv: 18.0 },
  { id: 'cocktail-negroni', name: 'Negroni', category: 'cocktail', volumeMl: 90, abv: 24.0 },
  { id: 'cocktail-oldFashioned', name: 'Old Fashioned', category: 'cocktail', volumeMl: 90, abv: 32.0 },
  
  // Ready-to-Drink
  { id: 'rtd-smirnoffice', name: 'Smirnoff Ice', category: 'rtd', volumeMl: 275, abv: 5.5, brand: 'Smirnoff' },
  { id: 'rtd-wkd', name: 'WKD', category: 'rtd', volumeMl: 275, abv: 5.0, brand: 'WKD' },
  { id: 'rtd-bacardi', name: 'Bacardi Breezer', category: 'rtd', volumeMl: 275, abv: 5.0, brand: 'Bacardi' },
  { id: 'rtd-cider-pint', name: 'Cider (Pint)', category: 'rtd', volumeMl: 568, abv: 4.5 },
  { id: 'rtd-cider-bottle', name: 'Cider (Bottle)', category: 'rtd', volumeMl: 500, abv: 4.5 },
  { id: 'rtd-alcopop', name: 'Alcopop (Average)', category: 'rtd', volumeMl: 275, abv: 5.0 },
];

export const calculateUnits = (volumeMl: number, abv: number): number => {
  // EU/WHO formula: units = (volume_ml × ABV% × 0.8) / 1000
  // 0.8 g/ml is the density factor for ethanol
  return (volumeMl * abv * 0.8) / 1000;
};

export const getCategoryLabel = (category: Drink['category']): string => {
  const labels = {
    beer: 'Beer',
    wine: 'Wine',
    spirit: 'Spirit',
    cocktail: 'Cocktail',
    rtd: 'Ready-to-Drink',
    custom: 'Custom',
  };
  return labels[category];
};

// Re-export from storage for convenience
export { getCustomDrinks, saveCustomDrink, deleteCustomDrink } from './storage';
