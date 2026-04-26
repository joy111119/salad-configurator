import { create } from 'zustand';
import type { Bowl, Ingredient } from '../types/index';

interface IngredientStore {
  slots: Record<string, Ingredient | null>;
  baseType: number;
  selectedBowl: Bowl | null;

  // ✅ ADD THESE
  selectedBase: Ingredient | null;
  setBase: (base: Ingredient) => void;

  setBaseType: (id: number) => void;
  setBowl: (bowl: Bowl) => void;
  clearSelection: () => void;
  addIngredient: (item: Ingredient) => void;
  removeIngredient: (id: string) => void;
  clearSlot: (slotId: string) => void;
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

  // ✅ ADD THESE
  selectedBase: null,
  setBase: (base) => set({ selectedBase: base }),

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
      selectedBase: null, // ✅ reset
    }),

  addIngredient: (item) =>
    set((state) => {
      const newSlots = { ...state.slots };

      // Optional: sync base with selectedBase
      if (item.categoryId === 6) {
        return { selectedBase: item };
      }

      const slotCount = state.selectedBowl?.slot_count ?? 5;

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

  clearSlot: (slotId) =>
    set((state) => ({
      slots: { ...state.slots, [slotId]: null },
    })),
}));