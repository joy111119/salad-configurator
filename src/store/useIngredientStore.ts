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

  addIngredient: (item) => set((state) => {
    // Base category (id 6) goes into the 'base' slot
    if (item.categoryId === 6) {
      return { slots: { ...state.slots, base: item } };
    }

    // Otherwise find the first empty slot based on selected bowl's slot_count
    const slotCount = state.selectedBowl?.slot_count ?? 0;
    for (let i = 1; i <= slotCount; i++) {
      const key = `slot-${i}`;
      if (!state.slots[key]) {
        return { slots: { ...state.slots, [key]: item } };
      }
    }

    // No empty slots available
    return {};
  }),

  removeIngredient: (id) => set((state) => {
    const newSlots = { ...state.slots };
    const key = Object.keys(newSlots).find((k) => String(newSlots[k]?.id) === String(id));
    if (key) newSlots[key] = null;
    return { slots: newSlots };
  }),
}));
