import { Roles } from "@/enums/roles";
import type { ILogin } from "@/interfaces/login";
import { create } from "zustand";

interface LoginState {
  login: ILogin | null;
  setLogin: (value: ILogin) => void;
  setLogout: () => void;
}

export const useLoginState = create<LoginState>((set) => ({
  login: { id: "", role: Roles.USER, token: "" },
  setLogin: (value: ILogin) => set({ login: value }),
  setLogout: () => set({ login: null }),
}));
