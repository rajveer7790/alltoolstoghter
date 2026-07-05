import { CalcResult } from '../types';
import { num, int, safe } from '../format';

// Gram-to-volume factors for common ingredients (grams per cup)
const INGREDIENTS: Record<string, { g_per_cup: number; label: string }> = {
  flour_ap:       { g_per_cup: 125,  label: 'All-purpose flour' },
  flour_bread:    { g_per_cup: 127,  label: 'Bread flour' },
  flour_cake:     { g_per_cup: 100,  label: 'Cake flour' },
  flour_whole:    { g_per_cup: 120,  label: 'Whole-wheat flour' },
  sugar_white:    { g_per_cup: 200,  label: 'White sugar' },
  sugar_brown:    { g_per_cup: 220,  label: 'Brown sugar (packed)' },
  sugar_powder:   { g_per_cup: 120,  label: 'Powdered sugar' },
  butter:         { g_per_cup: 227,  label: 'Butter' },
  cocoa:          { g_per_cup: 85,   label: 'Cocoa powder' },
  honey:          { g_per_cup: 340,  label: 'Honey' },
  milk:           { g_per_cup: 245,  label: 'Milk' },
  water:          { g_per_cup: 237,  label: 'Water' },
  salt:           { g_per_cup: 288,  label: 'Table salt' },
  oats:           { g_per_cup: 90,   label: 'Rolled oats' },
  rice:           { g_per_cup: 185,  label: 'Uncooked white rice' },
  cornstarch:     { g_per_cup: 120,  label: 'Cornstarch' },
  olive_oil:      { g_per_cup: 216,  label: 'Olive oil' },
  vegetable_oil:  { g_per_cup: 218,  label: 'Vegetable oil' },
};

export function gramsToCups(v: Record<string, any>): CalcResult[] {
  const ingKey = String(v.ingredient || 'flour_ap');
  const ing = INGREDIENTS[ingKey] || INGREDIENTS['flour_ap'];
  const grams = safe(v.grams, 0);
  const cups = grams / ing.g_per_cup;
  const tbsp = cups * 16;
  const tsp = cups * 48;
  return [
    { label: `${ing.label} (cups)`, value: num(cups, 3), main: true },
    { label: 'Tablespoons', value: num(tbsp, 1) },
    { label: 'Teaspoons', value: num(tsp, 0) },
    { label: 'Weight basis', value: `${ing.g_per_cup} g per cup` },
  ];
}

export function recipeScaling(v: Record<string, any>): CalcResult[] {
  const orig = safe(v.original, 1), target = safe(v.target, 1), amount = safe(v.amount, 0);
  if (orig <= 0) return [{ label: 'Enter original servings', value: '—', main: true }];
  const factor = target / orig;
  const scaled = amount * factor;
  return [
    { label: 'Scale factor', value: num(factor, 4) + '×', main: true },
    { label: 'Scaled amount', value: num(scaled, 4) },
    { label: 'Original servings', value: num(orig, 0) },
    { label: 'Target servings', value: num(target, 0) },
  ];
}

export function cookingUnitConverter(v: Record<string, any>): CalcResult[] {
  const amount = safe(v.amount, 0);
  const from = String(v.from || 'cup');
  // All in millilitres
  const ML: Record<string, number> = {
    tsp: 4.92892, tbsp: 14.7868, cup: 236.588, pint: 473.176, quart: 946.353,
    gallon: 3785.41, fl_oz: 29.5735, ml: 1, liter: 1000,
  };
  const ml = amount * (ML[from] ?? 1);
  return [
    { label: 'Millilitres', value: num(ml, 2), main: true },
    { label: 'Teaspoons', value: num(ml / ML.tsp, 3) },
    { label: 'Tablespoons', value: num(ml / ML.tbsp, 3) },
    { label: 'Cups', value: num(ml / ML.cup, 4) },
    { label: 'Fluid ounces', value: num(ml / ML.fl_oz, 3) },
    { label: 'Liters', value: num(ml / 1000, 4) },
  ];
}

export function caloriesBurned(v: Record<string, any>): CalcResult[] {
  // MET values for common activities
  const METS: Record<string, number> = {
    walking_slow: 2.5, walking_brisk: 3.8, jogging: 7.0, running: 9.8, cycling_moderate: 6.8,
    cycling_vigorous: 10.0, swimming: 8.0, yoga: 2.8, weight_training: 5.0, hiit: 10.3,
    dancing: 5.0, basketball: 8.0, soccer: 10.0, tennis: 8.0, jump_rope: 11.8, hiking: 6.0,
  };
  const weight = safe(v.weight, 0); // kg
  const minutes = safe(v.minutes, 0);
  const actKey = String(v.activity || 'walking_brisk');
  const met = METS[actKey] ?? 5;
  const cals = (met * weight * minutes) / 60;
  return [
    { label: 'Calories burned', value: int(Math.round(cals)) + ' kcal', main: true },
    { label: 'Per minute', value: num(cals / (minutes || 1), 1) + ' kcal/min' },
    { label: 'MET value', value: num(met, 1) },
    { label: 'Duration', value: `${minutes} min` },
    { label: 'Note', value: 'Based on MET (Metabolic Equivalent). Actual burn varies with fitness level and intensity.' },
  ];
}
