import { create } from "zustand";

interface PriceRangeState {
  min: number;
  max: number;
  setMin: (value: number) => void;
  setMax: (value: number) => void;
}

export const usePriceRange = create<PriceRangeState>((set) => ({
  min: 0,
  max: 1000,
  setMin: (value) => set({ min: value }),
  setMax: (value) => set({ max: value }),
}));
