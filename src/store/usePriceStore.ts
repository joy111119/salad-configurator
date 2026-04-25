import { create } from "zustand";
import { getPrices } from "../services/api";


export type Price = {
  item_id: number;
  price: number;
};

// ✅ Define store type
type PriceStore = {
  prices: Price[];
  fetchPrices: (token: string) => Promise<void>;
};

// ✅ Apply type to Zustand
export const usePriceStore = create<PriceStore>((set) => ({
  prices: [],

  fetchPrices: async (token: string) => {
    try {
      const data: Price[] = await getPrices(token);
      set({ prices: data });
    } catch {
      
    }
  },
}));