import { create } from "zustand";

interface searchProductsState {
  search: string;
  setSearch: (value: string) => void;
}

export const useSearchProducts = create<searchProductsState>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
}));
