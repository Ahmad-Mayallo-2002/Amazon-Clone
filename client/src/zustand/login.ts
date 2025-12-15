import { Roles } from "@/enums/roles";
import type { ILogin } from "@/interfaces/login";
import { create } from "zustand";

interface LoginState {
  login: ILogin;
  setLogin: (value: ILogin) => void;
}

export const useLoginState = create<LoginState>((set) => ({
  login: { id: "", role: Roles.USER, token: "" },
  setLogin: (value: ILogin) => set({ login: value }),
}));
