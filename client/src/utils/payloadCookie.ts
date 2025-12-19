import type { Roles } from "@/enums/roles";
import Cookies from "universal-cookie";

export interface PayloadCookie {
  id: string;
  token: string;
  role: Roles;
}

const cookies = new Cookies();

export const getPayload = (): PayloadCookie | null => {
  return cookies.get("payload");
};

export const setPayload = (payload: PayloadCookie | null): void => {
  cookies.set("payload", payload, {
    path: "/",
  });
};

export const removeCookie = (cookieName: string): void => {
  cookies.remove(cookieName);
};
