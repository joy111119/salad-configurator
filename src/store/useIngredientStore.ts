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
  
  slots: {
    "slot-1": null,
    "slot-2": null,
    "slot-3": null,
    "slot-4": null,
    "slot-5": null,
  },

  baseType: 1,
  selectedBowl: null,

  setBaseType: (id) => set({ baseType: id }),

  setBowl: (bowl) => set({ selectedBowl: bowl }),

  clearSelection: () =>
    set({
      slots: {
        "slot-1": null,
        "slot-2": null,
        "slot-3": null,
        "slot-4": null,
        "slot-5": null,
      },
      selectedBowl: null,
      baseType: 1,
    }),

  addIngredient: (item) =>
    set((state) => {
      const newSlots = { ...state.slots };

      
      if (item.categoryId === 6) {
        return { slots: { ...newSlots, base: item } };
      }

      
      const slotCount = state.selectedBowl?.slot_count ?? 5;

      // Ensure slots exist
      for (let i = 1; i <= slotCount; i++) {
        const key = `slot-${i}`;
        if (!(key in newSlots)) {
          newSlots[key] = null;
        }
      }

      
      for (let i = 1; i <= slotCount; i++) {
        const key = `slot-${i}`;
        if (!newSlots[key]) {
          newSlots[key] = item;
          return { slots: newSlots };
        }
      }

      
      return {};
    }),

  removeIngredient: (id) =>
    set((state) => {
      const newSlots = { ...state.slots };
      const key = Object.keys(newSlots).find(
        (k) => String(newSlots[k]?.id) === String(id)
      );

      if (key) newSlots[key] = null;

      return { slots: newSlots };
    }),
}));