// types/salad.ts

// Base type for items with id, name, price
export interface BaseType {
  id: string | number;
  name: string;
  price?: number;
}

// Bowl type
export interface Bowl extends BaseType {
  slot_count: number;
  shape: 'round' | 'square';
  base_type_id?: number;
  volume?: number;
}

// Category type
export interface Category {
  id: string | number;
  name: string;
  base_type_id?: number;
}

// Ingredient type
export interface Ingredient extends BaseType {
  categoryId: string | number;
  diets?: string[]; // optional if API may not provide it
  weight_grams?: number;
}

// User type (optional, for later)
export interface User {
  id: number | string;
  email: string;
  name?: string;
  role: string;
}

// Recipe type (optional)
export interface Recipe {
  id: number | string;
  userId: number | string;
  name: string;
  bowlId: string | number;
  ingredientIds: (string | number)[];
  slots?: Record<string, Ingredient | null>;
  is_public?: boolean;
}