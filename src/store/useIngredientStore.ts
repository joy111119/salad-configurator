import { create } from 'zustand';
import type { Bowl, Ingredient } from '../types/index';

interface IngredientStore {
  slots: Record<string, Ingredient | null>;
  baseType: number;
  selectedBowl: Bowl | null;

  setBaseType: (id: number) => void;
  setBowl: (bowl: Bowl) => void;
  clearSelection: () => void;
  addIngredient: (item: Ingredient) => void;
  removeIngredient: (id: string) => void;
}

export const useIngredientStore = create<IngredientStore>((set) => ({
  slots: {},
  baseType: 1,
  selectedBowl: null,

  setBaseType: (id) => set({ baseType: id }),

  setBowl: (bowl) => set({ selectedBowl: bowl }),

  clearSelection: () => set({ slots: {}, selectedBowl: null, baseType: 1 }),

  // placeholder
  addIngredient: (_item) => {},

  // placeholder
  removeIngredient: (_id) => {},
}));
