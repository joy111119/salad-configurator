import { create } from "zustand";
import { getPrices } from "../services/api";

export const usePriceStore = create((set) => ({
  prices: [],

  fetchPrices: async (token: string) => {
    try {
      const data = await getPrices(token);
      set({ prices: data });
    } catch (err) {
      console.error("Error fetching prices:", err);
    }
  },
}));