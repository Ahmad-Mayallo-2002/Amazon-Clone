import { create } from "zustand";

interface CartCountState {
  count: number;
  increase: (value: number) => void;
  decrease: (value: number) => void;
}

export const useCartCount = create<CartCountState>((set) => ({
  count: 0,
  increase: (value: number) => set((state) => ({ count: state.count + value })),
  decrease: (value: number) => set((state) => ({ count: state.count - value })),
}));
