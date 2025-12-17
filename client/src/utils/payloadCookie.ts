import type { Roles } from "@/enums/roles";
import Cookies from "universal-cookie";

interface PayloadCookie {
  id: string;
  token: string;
  role: Roles;
}

const cookie = new Cookies();

export const getPayload = (): PayloadCookie | null => {
  return cookie.get("payload");
};

export const setPayload = (payload: PayloadCookie | null): void => {
  cookie.set("payload", payload, {
    path: "http://localhost:5173",
  });
};

export const removeCookie = (cookieName: string): void => {
  cookie.remove(cookieName);
};
