import { create } from "zustand";

interface Filters {
  category: string;
  rating: number;
}

interface FiltersState {
  filters: {
    category: string;
    rating: number;
  };
  setFilters: (value: Filters) => void;
}

export const useFilters = create<FiltersState>((set) => ({
  filters: {
    category: "",
    rating: 0,
  },
  setFilters: (filters) => set({ filters }),
}));
