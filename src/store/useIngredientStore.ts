import { create } from "zustand";
import type { Bowl, Ingredient } from "../types/index";

interface IngredientStore {
  slots: Record<string, Ingredient | null>;
  baseType: number;
  selectedBowl: Bowl | null;

  selectedBase: Ingredient | null;

  setBase: (base: Ingredient | null) => void;
  setBaseType: (id: number) => void;
  setBowl: (bowl: Bowl) => void;

  setSlots: (
    updater:
      | Record<string, Ingredient | null>
      | ((prev: Record<string, Ingredient | null>) => Record<string, Ingredient | null>)
  ) => void;

  // ⭐ NEW
  loadRecipe: (ingredients: Ingredient[]) => void;

  clearSelection: () => void;
  addIngredient: (item: Ingredient) => void;
  removeIngredient: (id: string) => void;
  clearSlot: (slotId: string) => void;
}

export const useIngredientStore = create<IngredientStore>((set) => ({

  
  slots: {
    "slot-0": null,
    "slot-1": null,
    "slot-2": null,
    "slot-3": null,
    "slot-4": null,
  },

  baseType: 1,
  selectedBowl: null,
  selectedBase: null,

  setBase: (base) => set({ selectedBase: base ?? null }),

  setBaseType: (id) => set({ baseType: id }),

  setBowl: (bowl) => set({ selectedBowl: bowl }),

  
  setSlots: (updater) =>
    set((state) => ({
      slots:
        typeof updater === "function"
          ? updater(state.slots)
          : updater,
    })),

  // 🔥 NEW: LOAD RECIPE INTO SLOTS
  loadRecipe: (ingredients) =>
    set(() => {
      const newSlots: Record<string, Ingredient | null> = {};

      ingredients.forEach((item, index) => {
        newSlots[`slot-${index}`] = item;
      });

      return {
        slots: newSlots,
      };
    }),

  clearSelection: () =>
    set({
      slots: {
        "slot-0": null,
        "slot-1": null,
        "slot-2": null,
        "slot-3": null,
        "slot-4": null,
      },
      selectedBowl: null,
      baseType: 1,
      selectedBase: null,
    }),

  addIngredient: (item) =>
    set((state) => {
      const newSlots = { ...state.slots };

      
      if (item.categoryId === 6) {
        return { selectedBase: item };
      }

      const slotCount = state.selectedBowl?.slot_count ?? 5;

      
      for (let i = 0; i < slotCount; i++) {
        const key = `slot-${i}`;
        if (!(key in newSlots)) {
          newSlots[key] = null;
        }
      }

      
      for (let i = 0; i < slotCount; i++) {
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