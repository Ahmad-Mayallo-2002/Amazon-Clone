import { create } from "zustand";

interface KeyValue {
  key: string;
  value: string;
}

interface ProductSortState {
  sortBy: KeyValue;
  setKeyValue: (value: KeyValue) => void;
}

export const useProductSort = create<ProductSortState>((set) => ({
  sortBy: {
    key: "",
    value: "",
  },
  setKeyValue: (value: KeyValue) => set({ sortBy: value }),
}));
