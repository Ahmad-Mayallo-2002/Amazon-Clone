import { type PayloadCookie } from "./payloadCookie";

export const isLogged = (payload: PayloadCookie | null) => {
  if (!payload) {
    window.location.assign("/auth/login");
    return false;
  }
  return true;
};
