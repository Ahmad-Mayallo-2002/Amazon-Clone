import { create } from "zustand";

interface CategoryState {
  category: string;
  setCategory: (value: string) => void;
}

export const useCategory = create<CategoryState>((set) => ({
  category: "",
  setCategory: (value) => set({ category: value }),
}));
