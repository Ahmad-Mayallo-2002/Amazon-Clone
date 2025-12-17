import type { ILogin } from "@/interfaces/login";
import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface LoginContext {
  login: ILogin | null;
  setLogin: Dispatch<SetStateAction<ILogin | null>>;
}

export const CreateLoginContext = createContext<LoginContext>({
  login: null,
  setLogin: (value) => {},
});

export default function LoginContext({ children }: { children: ReactNode }) {
  const [login, setLogin] = useState<ILogin | null>(null);
  return (
    <CreateLoginContext.Provider value={{ login, setLogin }}>
      {children}
    </CreateLoginContext.Provider>
  );
}
