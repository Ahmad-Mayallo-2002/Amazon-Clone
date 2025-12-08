import { create } from "zustand";

interface CountryState {
  country: string;
  setCountry: (value: string) => void;
}

export const useCountry = create<CountryState>((set) => ({
  country: "Egypt",
  countryValue: "",
  setCountry: (value) => set({ country: value }),
}));
